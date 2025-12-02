class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    
    init(data) {
        this.finalScore = data.score;

        this.gameCompleted = data.completed || false;
    }
    
    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'starfield');
        
        let titleText = 'GAME OVER';
        let titleColor = '#FF0000';

        // LÓGICA DE FIM DE JOGO (VITÓRIA)
        if (this.gameCompleted) {
            titleText = 'MISSÃO CUMPRIDA! (NEPTUNO)';
            titleColor = '#00FFFF';
            // Mensagem extra para a vitória
            this.add.text(this.game.config.width / 2, 100, titleText, { fontSize: '64px', fill: titleColor }).setOrigin(0.5);
            this.add.text(this.game.config.width / 2, 150, 'Atravessaste todo o Sistema Solar!', { fontSize: '32px', fill: '#00FF00' }).setOrigin(0.5);
            
        } else {
             this.add.text(this.game.config.width / 2, 100, titleText, { fontSize: '64px', fill: titleColor }).setOrigin(0.5);
        }

        // Posições dos textos ajustadas para a mensagem de vitória
        const scoreY = this.gameCompleted ? 250 : 200;
        const highscoreY = this.gameCompleted ? 300 : 250;
        const bestScoreY = this.gameCompleted ? 350 : 300;
        const restartButtonY = 450;
        
        this.add.text(this.game.config.width / 2, scoreY, `PONTUAÇÃO: ${this.finalScore}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        // Lógica de Highscore
        const highscore = localStorage.getItem('stellar_highscore') || 0;
        if (this.finalScore > highscore) {
            localStorage.setItem('stellar_highscore', this.finalScore);
            this.add.text(this.game.config.width / 2, highscoreY, 'NOVO HIGHSCORE!', { fontSize: '28px', fill: '#00FF00' }).setOrigin(0.5);
        }
        this.add.text(this.game.config.width / 2, bestScoreY, `MELHOR SCORE: ${Math.max(this.finalScore, highscore)}`, { fontSize: '24px', fill: '#AAA' }).setOrigin(0.5);

        // Botão REINICIAR
        const restartButton = this.add.text(this.game.config.width / 2, restartButtonY, 'REINICIAR', { 
            fontSize: '40px', 
            fill: '#FFFF00',
            backgroundColor: '#333'
        }).setOrigin(0.5)
          .setPadding(10)
          .setInteractive({ useHandCursor: true });


        restartButton.on('pointerover', () => restartButton.setFill('#FF00FF'));
        restartButton.on('pointerout', () => restartButton.setFill('#FFFF00'));
        restartButton.on('pointerdown', () => {

            this.scene.start('MenuScene'); 
        });
        
     
        const menuButton = this.add.text(this.game.config.width / 2, restartButtonY + 70, 'MENU PRINCIPAL', { 
            fontSize: '24px', 
            fill: '#AAA' 
        }).setOrigin(0.5)
          .setInteractive({ useHandCursor: true });
          
        menuButton.on('pointerover', () => menuButton.setFill('#FFF'));
        menuButton.on('pointerout', () => menuButton.setFill('#AAA'));
        menuButton.on('pointerdown', () => {
            this.scene.start('MenuScene'); 
        });
    }
}