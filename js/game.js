
const config = {
    type: Phaser.AUTO,
    width: 850,  
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false 
        }
    },
    scene: [
        BootScene, 
        MenuScene, 
        SelectionScene,
        InstructionsScene, 
        GameScene, 
        GameOverScene
    ]
};

// Inicializa o jogo
const game = new Phaser.Game(config);