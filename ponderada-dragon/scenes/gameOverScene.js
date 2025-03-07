export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'game-over-scene' });
    }

    init(data) {
        this.secondsAlive = data.secondsAlive;
    }

    create() {
        const centerX = 1900 / 2;
        const centerY = 1000 / 2;

        this.add.text(centerX, centerY - 40, "Game Over", { fill: "white", fontSize: "40px" }).setOrigin(0.5);
        this.add.text(centerX, centerY - 10, `Você sobreviveu por ${this.secondsAlive} segundos`, { fill: "white", fontSize: "20px" }).setOrigin(0.5);

        this.playButton = this.add.image(centerX, centerY + 100, "play").setInteractive().setScale(0.5).setOrigin(0.5);
        this.playButton.on("pointerdown", () => {
            this.scene.start('game-scene');
        });
    }
}