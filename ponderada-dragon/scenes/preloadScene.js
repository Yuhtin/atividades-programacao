// Cena exclusiva antes de qualquer outra para carregar os recursos do jogo, fazendo não ter delay para iniciar cenas durante o jogo
export class PreloadScene extends Phaser.Scene {

    constructor() {
        super({ key: 'preload-scene' });
    }

    preload() {
        this.add.text(20, 20, "Carregando jogo...", { fill: "white" }); // Adicionando texto de carregamento, para não parecer que o jogo travou

        // Carregando todas as imagens que serão usadas no jogo
        this.load.image("play", "assets/startButton.png"); // Carregando a imagem do botão "play"

        this.load.image("moon_back", "assets/parallax/moon_back.png"); // Carregando a imagem do fundo da lua
        this.load.image("moon_floor", "assets/parallax/moon_floor.png"); // Carregando a imagem do chão da lua
        this.load.image("moon_front", "assets/parallax/moon_front.png"); // Carregando a imagem do chão da lua
        this.load.image("moon_mid", "assets/parallax/moon_mid.png"); // Carregando a imagem do chão da lua
        this.load.image("moon_sky", "assets/parallax/moon_sky.png"); // Carregando a imagem do chão da lua

        this.load.image("arrows", "assets/arrows.png"); // Carregando a imagem das setas

        this.load.image("background", "assets/background.png"); // Carregando a imagem do fundo

        this.load.image("explosion", "assets/explosion.png"); // Carregando a imagem da explosão
        this.load.image("bomb", "assets/bomb.png"); // Carregando a imagem do obstáculo

        this.load.spritesheet(
            "spaceship_boost",
            `assets/spaceship_boost.png`,
            { frameWidth: 64, frameHeight: 32 }
        );

        this.load.spritesheet(
            "spaceship",
            `assets/spaceship.png`,
            { frameWidth: 350, frameHeight: 150 }
        );
    }

    create() {
        this.scene.start('start-menu');
    }

    update() {

    }

}