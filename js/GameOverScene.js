class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    
    init(data) {
        this.finalScore = data.score || 0;
        this.gameCompleted = data.completed || false;
        this.defaultScale = 0.13; 
        this.hoverScale = 0.15;
    }
    
    create() {
         const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'starfield');

        
        // --- TÍTULO E MENSAGEM ---
        let titleText = 'GAME OVER';
        let titleColor = '#FF0000';

        if (this.gameCompleted) {
            titleText = 'MISSÃO CUMPRIDA!';
            titleColor = '#00FFFF';
            this.add.text(this.game.config.width / 2, 100, titleText, { fontSize: '64px', fill: titleColor }).setOrigin(0.5);
            this.add.text(this.game.config.width / 2, 160, 'Atravessaste todo o Sistema Solar!', { fontSize: '32px', fill: '#00FF00' }).setOrigin(0.5);
            
        } else {
             this.add.text(this.game.config.width / 2, 100, titleText, { fontSize: '64px', fill: titleColor }).setOrigin(0.5);
        }

        // --- PONTUAÇÃO ---
        const scoreY = this.gameCompleted ? 250 : 200;
        const highscoreY = this.gameCompleted ? 300 : 250;
        const bestScoreY = this.gameCompleted ? 350 : 300;
        
        this.add.text(this.game.config.width / 2, scoreY, `PONTUAÇÃO: ${this.finalScore}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        // --- Lógica de Highscore ---
        const highscore = localStorage.getItem('stellar_highscore') || 0;
        if (this.finalScore > parseInt(highscore)) { 
            localStorage.setItem('stellar_highscore', this.finalScore);
            this.add.text(this.game.config.width / 2, highscoreY, 'NOVO HIGHSCORE!', { fontSize: '28px', fill: '#00FF00' }).setOrigin(0.5);
            this.add.text(this.game.config.width / 2, bestScoreY, `MELHOR SCORE: ${this.finalScore}`, { fontSize: '24px', fill: '#AAA' }).setOrigin(0.5);
        } else {
             this.add.text(this.game.config.width / 2, bestScoreY, `MELHOR SCORE: ${Math.max(this.finalScore, highscore)}`, { fontSize: '24px', fill: '#AAA' }).setOrigin(0.5);
        }
        
        // --- BOTÕES ---
        const restartButtonY = 450;
        const menuButtonY = 550;
        
        // 1. Botão REINICIAR 
        this.createButton(
            this.game.config.width / 2, 
            restartButtonY, 
            'btn_restart', 
            'RECOMEÇAR VIAGEM', 
            () => { this.scene.start('GameScene'); }
        );

         this.createButton(
            this.game.config.width / 2,
            menuButtonY, 
            'btn_menu', 
            'MENU PRINCIPAL', 
            () => { this.scene.start('MenuScene'); }
        );
        
     
    }
    

    createButton(x, y, key, text, callback) {
        const button = this.add.image(x, y, key)
             .setOrigin(0.5)
             .setInteractive({ useHandCursor: true })
             .setScale(this.defaultScale);

    
   
             
       
        button.on('pointerover', () => { 
            button.setScale(this.hoverScale);
        });
        
        button.on('pointerout', () => { 
            button.setScale(this.defaultScale);
        });
        
        button.on('pointerdown', callback);
        
        return button;
    }
}