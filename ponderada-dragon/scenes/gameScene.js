export class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'game-scene' });
    }

    init() {
        this.backgroundImages = [];
        this.boostActive = false;
        this.intervalBetweenBoosts = 1000 * 5; // 5 segundos de intervalo entre os boosts
        this.boostTime = 1000; // 1 segundo de duração do boost
        this.lastBoostTime = 0;
        this.obstacles = [];
        this.startTime = 0;
    }

    // Criação de elementos e configurações iniciais da cena
    create() {
        var width = 1900;
        var height = 1000;

        this.background = this.add.tileSprite(0, height, width, 0, 'moon_sky').setScale(2).setScrollFactor(0, 1).setDepth(1);
        this.backgroundImages.push(this.add.tileSprite(0, height / 2, width, height, 'moon_back').setScale(2).setScrollFactor(0, 1).setDepth(1));
        this.backgroundImages.push(this.add.tileSprite(0, height / 2, width, height, 'moon_mid').setScale(2).setScrollFactor(0, 1).setDepth(1));
        this.backgroundImages.push(this.add.tileSprite(0, height / 2, width, height, 'moon_floor').setScale(2).setScrollFactor(0, 1).setDepth(1));
        this.backgroundImages.push(this.add.tileSprite(0, height, width, height, 'moon_front').setScale(2).setScrollFactor(0, 1).setDepth(4));

        this.physics.world.setBounds(0, 0, width, height);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.spaceShip = this.physics.add.sprite(width / 2, 0, 'spaceship').setScale(1).setDepth(3);

        this.anims.create({
            key: "spaceship-animation",
            frames: this.anims.generateFrameNumbers("spaceship", { start: 0, end: 6 }), // Frames 0 a 5 são da animação de idle
            frameRate: 10,
            repeat: -1 // Repetir infinitamente
        });

        this.spaceShip.anims.play("spaceship-animation");

        this.boost = this.physics.add.sprite(0, 0, 'spaceship_boost').setScale(1).setDepth(2);
        this.boost.visible = false;

        this.anims.create({
            key: "boost-animation",
            frames: this.anims.generateFrameNumbers("spaceship_boost", { start: 0, end: 1 }), // Frames 0 a 5 são da animação de idle
            frameRate: 10,
            repeat: -1 // Repetir infinitamente
        });

        this.boost.anims.play("boost-animation");

        this.startTime = this.time.now;

        this.timeText = this.add.text(10, 10, 'Tempo Vivo: 0s', {
            fontSize: '40px',
            fill: '#ffffff'
        }).setDepth(5);
    }

    // Atualização lógica do jogo a cada frame
    update() {
        const obstacleInterval = 2000; // intervalo de 2000ms entre os obstáculos

        // Criação de obstáculos, com intervalo de tempo
        // Se o número de obstáculos for menor que 3 e o tempo desde o último obstáculo criado for maior que o intervalo de tempo
        // Então, cria um novo obstáculo
        if (this.obstacles.length < 3 && (this.time.now - (this.lastObstacleSpawnTime || 0)) > obstacleInterval) {
            this.generateNewObstacle();
        }

        this.obstacles.forEach((obstacle, index) => {
            obstacle.x -= 5;

            if (obstacle.x < -100) {
                this.obstacles.splice(index, 1);
                obstacle.destroy();
            }
        });

        // Atualiza o tempo vivo do jogador
        this.timeText.setText('Tempo Vivo: ' + Math.floor((this.time.now - this.startTime) / 1000) + 's');

        this.verifyBoost();

        // Movimentação do cenário
        this.background.tilePositionX += .3;

        // Efeito parallax do cenário
        this.backgroundImages.forEach((image, index) => {
            image.tilePositionX += 5 * (index + 1); // Aumenta a velocidade de acordo com o índice
        });

        this.runSpaceshipMovement();

        if (this.boostActive) {
            this.boost.x = this.spaceShip.x - 157;
            this.boost.y = this.spaceShip.y;
        }
    }

    // Função para gerar um novo obstáculo
    generateNewObstacle() {
        const obstacle = this.physics.add.sprite(1900, Math.random() * 1000, 'bomb').setScale(1).setDepth(3);

        this.obstacles.push(obstacle);
        this.lastObstacleSpawnTime = this.time.now;

        this.physics.add.overlap(this.spaceShip, obstacle, () => {
            // Caso a nave colida com um obstáculo, encerra o jogo, e exibe a tela de game over passando o tempo vivo
            this.scene.start('game-over-scene', { secondsAlive: Math.floor((this.time.now - this.startTime) / 1000) });
        });
    }

    // Função para movimentar a nave
    runSpaceshipMovement() {
        // Processamento de movimentação da nave
        if (this.cursors.left.isDown) {
            this.spaceShip.setVelocityX(-200); // Movimenta a nave para a esquerda
        } else if (this.cursors.right.isDown) {
            // Se boost estiver ativo, dobra a velocidade para a direita
            const speed = this.boostActive ? 400 : 200;
            this.spaceShip.setVelocityX(speed);
        } else {
            this.spaceShip.setVelocityX(this.boostActive ? 200 : 0); // Para a nave no eixo X
        }

        if (this.cursors.up.isDown) {
            this.spaceShip.setVelocityY(-200); // Movimenta a nave para cima
        } else if (this.cursors.down.isDown) {
            this.spaceShip.setVelocityY(200); // Movimenta a nave para baixo
        } else {
            this.spaceShip.setVelocityY(0); // Para a nave no eixo Y
        }
    }

    // Função para verificar se o boost está ativo
    verifyBoost() {
        // Se o boost estiver ativo e o tempo de duração do boost já passou, desativa o boost
        if (this.boostActive && (this.time.now - this.lastBoostTime) > this.boostTime) {
            this.boostActive = false;
            this.boost.visible = false;
            this.spaceShip.setVelocityX(0);
            this.spaceShip.setVelocityY(0);
        }

        // Se o boost não estiver ativo e o tempo de intervalo entre os boosts já passou, ativa o boost
        if (!this.boostActive && (this.time.now - this.lastBoostTime) > this.intervalBetweenBoosts) {
            this.boostActive = true;
            this.boost.visible = true;
            this.lastBoostTime = this.time.now;
        }
    }
}
