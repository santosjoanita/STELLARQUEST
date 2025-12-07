class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }
    
    init(data) {
        this.finalScore = data.score || 0;
        this.gameCompleted = data.completed || false;
        this.defaultScale = 0.8; 
        this.hoverScale = 0.9;
    }
    
    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        this.add.image(gameWidth / 2, gameHeight / 2, 'solar') 
            .setDisplaySize(gameWidth, gameHeight);

 

        
        // --- TÍTULO E MENSAGEM ---
        let titleText = 'GAME OVER';
        let titleColor = '#FF0000';

        if (this.gameCompleted) {
            titleText = 'MISSÃO CUMPRIDA!';
            titleColor = '#00FFFF';
            this.add.text(gameWidth / 2, 100, titleText, { fontSize: '64px', fill: titleColor }).setOrigin(0.5);
            this.add.text(gameWidth / 2, 160, 'Atravessaste todo o Sistema Solar!', { fontSize: '32px', fill: '#00FF00' }).setOrigin(0.5);
            
        } else {
             this.add.text(gameWidth / 2, 100, titleText, { fontSize: '64px', fill: titleColor }).setOrigin(0.5);
        }

        // --- PONTUAÇÃO E HIGHSCORE ---
        const scoreY = this.gameCompleted ? 250 : 200;
        const highscoreY = this.gameCompleted ? 300 : 250;
        const bestScoreY = this.gameCompleted ? 350 : 300;
        
        this.add.text(gameWidth / 2, scoreY, `PONTUAÇÃO: ${this.finalScore}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);

        const highscore = localStorage.getItem('stellar_highscore') || 0;
        if (this.finalScore > parseInt(highscore)) { 
            localStorage.setItem('stellar_highscore', this.finalScore);
            this.add.text(gameWidth / 2, highscoreY, 'NOVO HIGHSCORE!', { fontSize: '28px', fill: '#00FF00' }).setOrigin(0.5);
            this.add.text(gameWidth / 2, bestScoreY, `MELHOR SCORE: ${this.finalScore}`, { fontSize: '24px', fill: '#AAA' }).setOrigin(0.5);
        } else {
             this.add.text(gameWidth / 2, bestScoreY, `MELHOR SCORE: ${Math.max(this.finalScore, highscore)}`, { fontSize: '24px', fill: '#AAA' }).setOrigin(0.5);
        }
        
        const restartButtonY = 450;
        const menuButtonY = 550;
        
        // 1. Botão REINICIAR 
        this.createButton(
            gameWidth / 2, 
            restartButtonY, 
            'btn_restart', 
            () => { 
                this.sound.play('click');
                this.scene.start('SelectionScene'); 
            }
        );

        // 2. Botão MENU 
        const MENU_SCALE_FACTOR = 0.5; 
        this.createButton(
            gameWidth / 2,
            menuButtonY, 
            'btn_menu', 
            () => { 
                this.sound.play('click');
                this.scene.start('MenuScene');
            },
            MENU_SCALE_FACTOR 
        );
    }
    
    createButton(x, y, key, callback, customScale) {
        
        const DEFAULT_FALLBACK_SCALE = 0.12; 
        
        const scale = customScale !== undefined ? customScale : DEFAULT_FALLBACK_SCALE;
        const hoverScale = scale * 1.15;
        
        const button = this.add.image(x, y, key)
             .setOrigin(0.5)
             .setInteractive({ useHandCursor: true })
             .setScale(scale); 
             
        button.on('pointerover', () => { 
            button.setScale(hoverScale);
        });
        
        button.on('pointerout', () => { 
            button.setScale(scale);
        });
        
        button.on('pointerdown', callback); 
        
        return button;
    }
}