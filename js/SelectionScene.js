class SelectionScene extends Phaser.Scene {
    constructor() {
        super('SelectionScene');
        this.selectedShipKey = 'ship_rocket1'; 
    }

    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        
        this.add.image(gameWidth / 2, gameHeight / 2, 'solar') 
            .setDisplaySize(gameWidth, gameHeight);

        this.add.text(gameWidth / 2, 70, 'ESCOLHA O SEU AVATAR', { 
            fontSize: '40px', 
            fill: '#FFD700' 
        }).setOrigin(0.5).setShadow(1, 1, '#FF4500', 2);

        this.selectionText = this.add.text(gameWidth / 2, gameHeight - 170, '', {
            fontSize: '24px', 
            fill: '#FFF' 
        }).setOrigin(0.5);

        const scaleFactor = 0.15; 
        const hoverScale = scaleFactor + 0.03; 
        
        // Botão INICIAR VIAGEM
        this.confirmButton = this.add.image(gameWidth / 2, gameHeight - 100, 'btn_iniciar_viagem')
             .setInteractive()
             .setScale(scaleFactor)
             .on('pointerover', () => { this.confirmButton.setScale(hoverScale); })
             .on('pointerout', () => { this.confirmButton.setScale(scaleFactor); })
             .on('pointerdown', this.startGame, this);

        
        // --- 2. Criação dos Seletores da Nave ---
        
        const yPos = gameHeight / 2 - 50;
        const scale = 3; 
        
        const xPos_R1 = gameWidth * 0.33; 
        const xPos_R2 = gameWidth * 0.66; 
        const text_y_offset = 120; 

       
        const createShipSelector = (xPos, key, displayName, color) => {
           
            const ship = this.add.sprite(xPos, yPos, key, 0).setScale(scale).setInteractive(); 

            this.add.text(xPos, yPos + text_y_offset, displayName, { fontSize: '24px', fill: color }).setOrigin(0.5);

            // Efeito Hover
            ship.on('pointerover', () => { ship.setScale(scale * 1.1); });
            ship.on('pointerout', () => { ship.setScale(scale); });
            
            ship.on('pointerdown', () => {
                this.selectShip(key, color, displayName); 
            });
            
            return ship;
        };
        
        // Criar as duas novas naves
        createShipSelector(xPos_R1, 'ship_rocket1', 'FOGUETE CLÁSSICO', '#00FFFF');
        createShipSelector(xPos_R2, 'ship_rocket2', 'FOGUETE DE CAÇA', '#FF0000');
        
  
        this.selectShip('ship_rocket1', '#00FFFF', 'FOGUETE CLÁSSICO');
    }
    
    selectShip(key, color, displayName) {
        this.selectedShipKey = key;
        // Usa o displayName para o texto
        this.selectionText.setText(`${displayName} selecionado!`); 
        this.selectionText.setFill(color); 
        this.confirmButton.setAlpha(1);
    }

    startGame() {
        this.scene.start('GameScene', { shipKey: this.selectedShipKey });
    }
}