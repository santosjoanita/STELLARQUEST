// Define as dimensões do jogo (pode ajustar)
const config = {
    type: Phaser.AUTO,
    width: 800, 
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // Mudar para true durante o desenvolvimento
        }
    },
    scene: [
        BootScene, 
        MenuScene, 
        InstructionsScene, 
        GameScene, 
        GameOverScene
    ]
};

// Inicializa o jogo
const game = new Phaser.Game(config);