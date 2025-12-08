class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        const gameWidth = this.game.config.width;  
        const gameHeight = this.game.config.height; 

        this.add.image(gameWidth / 2, gameHeight / 2, 'solar') 
            .setDisplaySize(gameWidth, gameHeight);
      
        this.add.image(gameWidth / 2, 140, 'logo').setScale(1.0); 

        const highscore = localStorage.getItem('stellar_highscore') || 0;
        this.add.text(gameWidth / 2, 250, `Melhor Score: ${highscore}`, { 
            fontSize: '30px', 
            fill: '#00FFFF' 
        }).setOrigin(0.5).setShadow(1, 1, '#ba0b0bff', 2);

        
       const createButton = (yPos, key, targetScene) => {
         let scaleFactor = 0.5; 
    
         // Ajustar escala para botões específicos
        if (key === 'btn_instructions') {
        scaleFactor = 0.11; 
    }

            const button = this.add.image(gameWidth / 2, yPos, key)
                .setInteractive()
                .setScale(scaleFactor); 

            button.on('pointerover', () => button.setScale(scaleFactor + 0.02)); 
            button.on('pointerout', () => button.setScale(scaleFactor));

            if (targetScene) {
        button.on('pointerdown', () => {
            this.sound.play('click'); 
            this.scene.start(targetScene);
        });
         }  else if (key === 'btn_exit') {
        button.on('pointerdown', () => {
            this.sound.play('click'); 
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