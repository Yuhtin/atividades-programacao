import { PreloadScene } from "./scenes/preloadScene.js";
import { StartMenu } from "./scenes/startMenu.js";
import { GameScene } from "./scenes/gameScene.js";
import { GameOverScene } from "./scenes/gameOverScene.js";

const config = {
    type: Phaser.AUTO,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    
    width: 1920, // largura da tela do jogo
    height: 1080, // altura da tela do jogo

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 10 },
            debug: false
        }
    },

    parent: "game",
    dom: {
        createContainer: true,
    },

    scene: [PreloadScene, StartMenu, GameScene, GameOverScene]
};

export const game = new Phaser.Game(config);