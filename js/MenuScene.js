class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    create() {
        // Adicionar o fundo que foi carregado na BootScene
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'starfield');

        // Adicionar título e botões
        this.add.text(this.game.config.width / 2, 100, 'STELLAR QUEST', { fontSize: '48px', fill: '#FFD700' }).setOrigin(0.5);

        // Botão JOGAR
        const playButton = this.add.text(this.game.config.width / 2, 250, 'JOGAR', { fontSize: '32px', fill: '#00FFFF' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => this.scene.start('GameScene')); // Inicia a GameScene

        // Botão INSTRUÇÕES
        const instructionsButton = this.add.text(this.game.config.width / 2, 320, 'INSTRUÇÕES', { fontSize: '32px', fill: '#00FFFF' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => this.scene.start('InstructionsScene')); // Inicia a InstructionsScene
        
        // Botão SAIR (para simulação ou feature futura)
        const exitButton = this.add.text(this.game.config.width / 2, 390, 'SAIR', { fontSize: '32px', fill: '#00FFFF' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => { /* Lógica para sair ou fechar */ });
    }
}