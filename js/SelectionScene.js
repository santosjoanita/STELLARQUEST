class SelectionScene extends Phaser.Scene {
    constructor() {
        super('SelectionScene');
        this.selectedShipKey = 'ship_blue';
    }

    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'starfield');

        this.add.text(gameWidth / 2, 70, 'ESCOLHA O SEU AVATAR', { 
            fontSize: '40px', 
            fill: '#FFD700' 
        }).setOrigin(0.5).setShadow(1, 1, '#FF4500', 2);

        this.selectionText = this.add.text(gameWidth / 2, gameHeight - 170, '', {
            fontSize: '24px', 
            fill: '#FFF' 
        }).setOrigin(0.5);

        const scaleFactor = 0.15; 
        const hoverScale = scaleFactor + 0.02; 

      this.confirmButton = this.add.image(gameWidth / 2, gameHeight - 100, 'btn_iniciar_viagem')
             .setInteractive()
             .setScale(scaleFactor)
             .on('pointerover', () => { 
              
                 this.confirmButton.setScale(hoverScale);

             })
             .on('pointerout', () => { 
               
                 this.confirmButton.setScale(scaleFactor);
             })
             .on('pointerdown', this.startGame, this);

        
        
        // --- 2. Criação dos Seletores da Nave ---
        
        const yPos = gameHeight / 2 - 50;
        const scale = 3;
        const frameStart = 0; 
        const frameEnd = 1; 
        const animationRate = 12;

        const xPos_Blue = gameWidth * 0.20; 
        const xPos_Green = gameWidth * 0.45; 
        const xPos_Red = gameWidth * 0.70; 
        
     
        const text_y_offset = 120; 

        const createShipSelector = (xPos, key, color) => {
            const ship = this.add.sprite(xPos, yPos, key).setScale(scale).setInteractive();
            
            

        
            this.add.text(xPos, yPos + text_y_offset, key.split('_')[1].toUpperCase(), { fontSize: '24px', fill: color }).setOrigin(0.5);

            // Efeito Hover
            ship.on('pointerover', () => {
                ship.setScale(scale * 1.1); 
         
            });
            
            ship.on('pointerout', () => {
                ship.setScale(scale);      
               
            });
            
            ship.on('pointerdown', () => {
                this.selectShip(key, color);
            });
            
            return ship;
        };
        
        // Criar as três naves (seletores) com as novas posições X
        createShipSelector(xPos_Blue, 'ship_blue', '#00FFFF');
        createShipSelector(xPos_Green, 'ship_green', '#00FF00');
        createShipSelector(xPos_Red, 'ship_red', '#FF0000');
        
        this.selectShip('ship_blue', '#00FFFF');
    }
    
    selectShip(key, color) {
        this.selectedShipKey = key;
        this.selectionText.setText(`Nave ${key.split('_')[1].toUpperCase()} selecionada!`); 
        this.selectionText.setFill(color); 
        this.confirmButton.setAlpha(1);
    }

    startGame() {
        this.scene.start('GameScene', { shipKey: this.selectedShipKey });
    }
}