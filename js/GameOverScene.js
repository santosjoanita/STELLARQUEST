class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    init(data) {
        this.finalScore = data.score;
    }
    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'starfield');
        
        this.add.text(this.game.config.width / 2, 100, 'GAME OVER', { fontSize: '64px', fill: '#FF0000' }).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, 200, `PONTUAÇÃO: ${this.finalScore}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        // Lógica de Highscore (usando localStorage como no protótipo original)
        const highscore = localStorage.getItem('stellar_highscore') || 0;
        if (this.finalScore > highscore) {
            localStorage.setItem('stellar_highscore', this.finalScore);
            this.add.text(this.game.config.width / 2, 250, 'NOVO HIGHSCORE!', { fontSize: '28px', fill: '#00FF00' }).setOrigin(0.5);
        }
        this.add.text(this.game.config.width / 2, 300, `MELHOR SCORE: ${Math.max(this.finalScore, highscore)}`, { fontSize: '24px', fill: '#AAA' }).setOrigin(0.5);

        // Botão REINICIAR
        const restartButton = this.add.text(this.game.config.width / 2 - 100, 450, 'REINICIAR', { fontSize: '32px', fill: '#00FFFF' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => this.scene.start('GameScene'));
        
        // Botão MENU
        const menuButton = this.add.text(this.game.config.width / 2 + 100, 450, 'MENU', { fontSize: '32px', fill: '#00FFFF' })
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => this.scene.start('MenuScene'));
    }
}