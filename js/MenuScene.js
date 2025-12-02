class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const gameWidth = this.game.config.width;  
        const gameHeight = this.game.config.height; 

        this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'starfield');
      
        this.add.image(gameWidth / 2, 140, 'logo').setScale(0.7); 

        const highscore = localStorage.getItem('stellar_highscore') || 0;
        this.add.text(gameWidth / 2, 250, `Melhor Score: ${highscore}`, { 
            fontSize: '30px', 
            fill: '#00FFFF' 
        }).setOrigin(0.5).setShadow(1, 1, '#0000FF', 2);

        
       const createButton = (yPos, key, targetScene) => {
         let scaleFactor = 0.5; 
    
        if (key === 'btn_instructions') {
        scaleFactor = 0.11; 
    }

            const button = this.add.image(gameWidth / 2, yPos, key)
                .setInteractive()
                .setScale(scaleFactor); 

            button.on('pointerover', () => button.setScale(scaleFactor + 0.05)); 
            button.on('pointerout', () => button.setScale(scaleFactor));

            if (targetScene) {
                button.on('pointerdown', () => this.scene.start(targetScene));
            } else if (key === 'btn_exit') {
                button.on('pointerdown', () => {
                    alert('Obrigado por jogar Stellar Quest!');
                });
            }
        };

        // Criar Botões
        createButton(430, 'btn_play', 'SelectionScene'); 
        createButton(510, 'btn_instructions', 'InstructionsScene'); 
        createButton(590, 'btn_exit', null);            
    }
}