class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        this.load.image('backgroundMenu', 'assets/background_menu.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundMenu');
        this.add.text(250, 100, "Jogo do Labirinto", { fontSize: "48px", fill: "#fff" });
        let startButton = this.add.image(400, 400, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
        this.score = 0;
        this.hasKey = false;
    }

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.image('door', 'assets/door.png');
        this.load.tilemapTiledJSON('map', 'assets/map.json');
        this.load.image('tiles', 'assets/tileset.png');
        this.load.image('backgroundGame', 'assets/background_game.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGame');
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tileset", "tiles");
        map.createLayer("Ground", tileset, 0, 0);

        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);

        this.spawnKey();
        this.door = this.physics.add.sprite(500, 200, 'door');
        this.physics.add.overlap(this.player, this.door, this.enterDoor, null, this);

        this.enemy = this.physics.add.sprite(400, 200, 'enemy');
        this.enemy.setVelocity(100, 100);
        this.enemy.setBounce(1, 1);
        this.enemy.setCollideWorldBounds(true);

        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });

        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.physics.add.overlap(this.player, this.enemy, () => {
            this.scene.start('GameOverScene');
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }

    spawnKey() {
        if (this.keyItem) {
            this.keyItem.destroy();
        }

        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        
        this.keyItem = this.physics.add.sprite(x, y, 'key');
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.hasKey = false;
    }

    collectKey(player, key) {
        this.score += 10;
        this.scoreText.setText('Placar: ' + this.score);
        key.destroy();
        this.hasKey = true;
    }

    enterDoor(player, door) {
        if (this.hasKey) {
            this.scene.start('GameScene2');
        }
    }
}

class GameScene2 extends Phaser.Scene {
    constructor() {
        super("GameScene2");
    }

    preload() {
        // Reutiliza os mesmos assets já usados na GameScene
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/enemy.png');
        this.load.tilemapTiledJSON('map2', 'assets/map2.json');
        this.load.image('tiles', 'assets/tileset.png');
        this.load.image('backgroundGame2', 'assets/background_game2.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGame2');
        const map = this.make.tilemap({ key: "map2" });
        const tileset = map.addTilesetImage("tileset", "tiles");
        map.createLayer("Ground", tileset, 0, 0);

        // Adiciona o jogador
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2);

        // Cria um grupo para 10 inimigos
        this.hardEnemies = this.physics.add.group();

        for (let i = 0; i < 10; i++) {
            // Gera posições aleatórias dentro dos limites do jogo
            let x = Phaser.Math.Between(300, 700);
            let y = Phaser.Math.Between(0, 500);

            let enemy = this.hardEnemies.create(x, y, 'enemy');

            enemy.setVelocity(Phaser.Math.Between(-200, 400), Phaser.Math.Between(-200, 400));
            enemy.setBounce(1);
            enemy.setCollideWorldBounds(true);
        }

        this.scoreText = this.add.text(16, 16, 'Placar: 0', { fontSize: '32px', fill: '#fff' });

        // Se o jogador colide com qualquer inimigo, aciona GameOverScene
        this.physics.add.overlap(this.player, this.hardEnemies, () => {
            this.scene.start('GameOverScene');
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.keys = []
        for (let i = 0; i < 3; i++) {
            this.spawnKey();
        }

        this.door = this.physics.add.sprite(500, 200, 'door');
        this.physics.add.overlap(this.player, this.door, this.enterDoor, null, this);
    }

    collectKey(player, key) {
        this.score += 10;
        this.scoreText.setText('Placar: ' + this.score);
        key.destroy();
        
        this.keys = this.keys.filter(k => k !== key);
    }


    spawnKey() {
        let x = Phaser.Math.Between(50, 750);
        let y = Phaser.Math.Between(50, 550);
        
        this.keyItem = this.physics.add.sprite(x, y, 'key');
        this.physics.add.overlap(this.player, this.keyItem, this.collectKey, null, this);
        this.keys.push(this.keyItem);
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }

    enterDoor(player, door) {
        if (this.keys.length === 0) {
            this.scene.start('WinScene');
        }
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    preload() {
        this.load.image('backgroundGameOver', 'assets/background_gameover.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundGameOver');
        this.add.text(300, 100, "Game Over", { fontSize: "48px", fill: "#f00" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene");
    }

    preload() {
        this.load.image('backgroundWin', 'assets/background_win.png');
    }

    create() {
        this.add.image(400, 300, 'backgroundWin');
        this.add.text(300, 100, "Você Ganhou!", { fontSize: "48px", fill: "#0f0" });
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade', arcade: { debug: false } },
    scene: [MenuScene, GameScene, GameScene2, GameOverScene, WinScene]
};

const game = new Phaser.Game(config);