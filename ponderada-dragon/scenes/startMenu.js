// Definindo a cena de boas-vindas usando a biblioteca Phaser
export class StartMenu extends Phaser.Scene {

    // Construtor da cena
    constructor() {
        super({ key: 'start-menu' });
    }

    // Função chamada quando a cena é criada
    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Adicione um texto centralizado na tela falando sobre o nome do jogo e como jogar
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 350, 'Aviation Adventure', {
            fontSize: '60px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 85, 'Use as setas para se mover', {
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 40, 'Pressione "Enter" para iniciar', {
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Adicionando um texto sobre como jogar

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, 'Desvie dos obstáculos e colete os boosts', {
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Agora uma área para colocar uma imagem de WASD (controles do jogo)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 280, 'Controles', {
            fontSize: '40px',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 190, 'arrows').setScale(0.5);

        // Configuração das teclas e variáveis da cena
        this.cursors = this.input.keyboard.createCursorKeys();
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);   

        // Configuração do botão de "play"
        this.playBt = this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 180, 'play')
            .setScale(0.5)        
            .setInteractive();

        // Iniciar o jogo ao pressionar a tecla "Enter"
        this.returnKey.on('down', () => {
            this.scene.start('game-scene');
        });

        // Configuração de evento para iniciar o jogo ao clicar no botão "play"
        this.playBt.on('pointerdown', function () {
            this.scene.start('game-scene');
        }, this);
    }
}
