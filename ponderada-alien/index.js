// Largura e Altura da tela do jogo
let width = 1152;
let height = 624;

let clouds = []
let coins = []
let ufo;
let keyboard;
let obstacles = []
let lastTimeSpawned;
let gameEnd = false;
let score = 0;
let scoreTextOnScreen;

// Configurações do jogo
const config = {
    type: Phaser.AUTO,
    width: width,
    height: height,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },

    pixelArt: true,

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Inicializa o jogo
let game = new Phaser.Game(config);

// Carrega os assets do jogo (imagens, sons, etc)
function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('cloud1', 'assets/cloud1.png');
    this.load.image('cloud2', 'assets/cloud2.png');
    this.load.image('cloud3', 'assets/cloud3.png');
    this.load.image('cloud4', 'assets/cloud4.png');
    this.load.image('cloud5', 'assets/cloud5.png');

    this.load.image('ufo', 'assets/ufo.png'); // Imagem da nave espacial
    this.load.image('turbo', 'assets/fire.png'); // Imagem do turbo
    this.load.image('coin', 'assets/coin.png'); // Imagem da moeda
    this.load.image('bomb', 'assets/bomb.png'); // Imagem da bomba
    this.load.image('surprise', 'assets/surprise.png'); // Imagem da surpresa
}

// Cria os elementos do jogo
function create() {
    keyboard = this.input.keyboard.createCursorKeys();

    ufo = this.physics.add.sprite(width / 2, 0, 'ufo').setScale(0.25).setDepth(1);
    ufo.body.setSize(270, 270, true);
    ufo.setCollideWorldBounds(true);

    this.background = this.add.tileSprite(0,
        height - 624,
        width,
        624,
        'background'
    ).setScale(2).setScrollFactor(0, 1);

    clouds.push(this.cloud1 = this.add.tileSprite(0,
        height - 624,
        width,
        624,
        'cloud1'
    ).setScale(2).setScrollFactor(0, 1));

    clouds.push(this.cloud2 = this.add.tileSprite(0,
        height - 624,
        width,
        624,
        'cloud2'
    ).setScale(2).setScrollFactor(0, 1));

    clouds.push(this.cloud3 = this.add.tileSprite(0,
        height - 624,
        width,
        624,
        'cloud3'
    ).setScale(2).setScrollFactor(0, 1));

    clouds.push(this.cloud4 = this.add.tileSprite(0,
        height - 624,
        width,
        624,
        'cloud4'
    ).setScale(2).setScrollFactor(0, 1));

    clouds.push(this.cloud5 = this.add.tileSprite(0,
        height - 624,
        width,
        624,
        'cloud5'
    ).setScale(2).setScrollFactor(0, 1));

    turbo = this.add.sprite(0, 0, 'turbo').setScale(0.1);
    turbo.setVisible(false);

    scoreTextOnScreen = this.add.text(16, 16, 'Moedas: ' + score, { fontSize: '32px', fill: '#fff' }).setDepth(2);

    // Aguardar interacao de reiniciar o jogo
    this.input.on('pointerdown', () => {
        if (!gameEnd) return;

        this.scene.restart();
        this.physics.resume();
        ufo.clearTint();
        lastTimeSpawned = 0;
        score = 0;
        obstacles = []
        coins = []
        gameEnd = false
    });
}

// Função para atualizar as coisas na tela (60 vezes por segundo se tiver 60 FPS)
function update() {
    if (coins.length < 1) {
        let randomY = Phaser.Math.Between(0, height); // Gera um número aleatório entre 0 e a altura da tela
        let coin = this.physics.add.sprite(width, randomY, 'coin').setScale(0.25).setDepth(1); // Cria um obstáculo

        this.physics.add.overlap(ufo, coin, () => {
            // Remover a moeda
            coin.destroy();
            coins = [];

            // Adicionar turbo
            turbo.setVisible(true);

            setTimeout(() => {
                // Remover o turbo depois de 5 segundos
                turbo.setVisible(false);
            }, 5000);

            // Adicionar o score ao pegar a moeda
            score += 1;

            if (scoreTextOnScreen) {
                scoreTextOnScreen.setText('Moedas: ' + score);
            } else {
                scoreTextOnScreen = this.add.text(16, 16, 'Moedas: ' + score, { fontSize: '32px', fill: '#fff' }).setDepth(2);
            }
        });

        // Desativar a gravidade do obstáculo
        coin.body.allowGravity = false;

        // Adicionar velocidade ao obstáculo
        coin.setVelocity(-350, 0);

        // Adicionar o obstáculo ao array de obstáculos
        coins.push(coin);
    }

    if (obstacles.length < 3) { // Não deixa criar mais de 3 obstáculos
        if (this.time.now - lastTimeSpawned < 1000) { // Não deixa criar obstáculos muito rápido
            return;
        }

        let randomY = Phaser.Math.Between(0, height); // Gera um número aleatório entre 0 e a altura da tela
        let obstacle = this.physics.add.sprite(width, randomY, 'bomb').setScale(0.25).setDepth(1); // Cria um obstáculo

        // Verificar se o ufo colidiu com o obstáculo
        this.physics.add.overlap(ufo, obstacle, () => {
            gameEnd = true;

            // aparecer gameover escrito na tela e parar o jogo todo
            this.physics.pause(); // Pausa o jogo
            ufo.setTint(0xff0000); // Deixa a nave vermelha

            // Adicionar texto de Game Over
            let gameOver = this.add.text(width / 2, height / 2, 'Game Over', { fontSize: '64px', fill: '#fff' }).setDepth(2);
            gameOver.setOrigin(0.5);

            // Texto de clique para reiniciar
            this.add.text(width / 2, height / 2 + 100, 'Clique para reiniciar', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5).setDepth(2);
        });

        // Desativar a gravidade do obstáculo
        obstacle.body.allowGravity = false;

        // Adicionar velocidade ao obstáculo
        obstacle.setVelocity(-200, 0);

        // Adicionar o obstáculo ao array de obstáculos
        obstacles.push(obstacle);

        // Atualizar o tempo do último obstáculo criado
        lastTimeSpawned = this.time.now;
    }

    // verificar se o obstáculo saiu da tela e remover
    for (let i = 0; i < obstacles.length; i++) {
        if (obstacles[i].x < 0) {
            obstacles[i].destroy();
            obstacles.splice(i, 1);
        }
    }

    // verificar se a moeda saiu da tela e remover
    for (let i = 0; i < coins.length; i++) {
        if (coins[i].x < 0) {
            coins[i].destroy();
            coins.splice(i, 1);
        }
    }

    // efeito parallax do background
    this.background.tilePositionX += 0.5;

    // efeito parallax das nuvens
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].tilePositionX += 0.5 * (i + 1);
    }

    // Movimentação do ufo
    let velocityX = -150;
    if (keyboard.left.isDown) {
        velocityX = -300;
    } else if (keyboard.right.isDown) {
        velocityX = 150;
    }

    let velocityY = 0;

    if (keyboard.up.isDown) {
        velocityY = -150;
    } else if (keyboard.down.isDown) {
        velocityY = 150;
    }

    ufo.setVelocity(velocityX, velocityY);

    if (turbo.visible) {
        if (velocityX < 0) {
            ufo.setVelocityX(velocityX * 0.5);
        } else {
            ufo.setVelocity(300, velocityY * 2);
        }

        turbo.x = ufo.x - 50;
        turbo.y = ufo.y + 20;
    }

    // Caso o ufo bata na esquerda da tela o jogo acaba
    if (ufo.x == 33.75) {
        gameEnd = true;

        // aparecer gameover escrito na tela e parar o jogo todo
        this.physics.pause(); // Pausa o jogo
        ufo.setTint(0xff0000); // Deixa a nave vermelha

        // Adicionar texto de Game Over
        let gameOver = this.add.text(width / 2, height / 2, 'Game Over', { fontSize: '64px', fill: '#fff' }).setDepth(2);
        gameOver.setOrigin(0.5);

        // Texto de clique para reiniciar
        this.add.text(width / 2, height / 2 + 100, 'Clique para reiniciar', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5).setDepth(2);
    }
}