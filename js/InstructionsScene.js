class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
    }
    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'starfield');

        this.add.text(this.game.config.width / 2, 50, 'Instruções', { fontSize: '40px', fill: '#FFD700' }).setOrigin(0.5);
        
        // Baseado no Relatório:
        this.add.text(50, 120, '* Objetivo: Chegar a Neptuno!', { fontSize: '24px', fill: '#FFF' });
        this.add.text(50, 160, '* Níveis: Começa em Mercúrio e avança pelos planetas.', { fontSize: '24px', fill: '#FFF' });
        this.add.text(50, 200, '* Controles: Teclado ou Rato para mover o foguete.', { fontSize: '24px', fill: '#FFF' });
        this.add.text(50, 240, '* Obstáculos: Evite Meteoritos e Luas.', { fontSize: '24px', fill: '#FFF' });
        this.add.text(50, 280, '* Pontuação: Recolha Estrelas (+20 pontos cada)[cite: 18].', { fontSize: '24px', fill: '#FFF' });
        this.add.text(50, 320, '* Dificuldade: Aumenta a velocidade após Marte [cite: 34] e Luas/Meteoritos ganham movimento após Urano[cite: 16].', { fontSize: '24px', fill: '#FFF', wordWrap: { width: 700 } });

        // Botão Voltar ao Menu
        const backButton = this.add.text(this.game.config.width / 2, 550, 'VOLTAR AO MENU', { fontSize: '32px', fill: '#00FFFF' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}