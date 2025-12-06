class InstructionsScene extends Phaser.Scene {
    constructor() {
        super('InstructionsScene');
    }

    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;
        
        this.add.image(gameWidth / 2, gameHeight / 2, 'solar') 
            .setDisplaySize(gameWidth, gameHeight);

        const titleStyle = { fontSize: '40px', fill: '#FFD700', fontFamily: 'monospace' };
        const headerStyle = { fontSize: '24px', fill: '#00FFFF', fontFamily: 'monospace' };
        const bodyStyle = { fontSize: '18px', fill: '#FFF', wordWrap: { width: 250 }, fontFamily: 'monospace' };
        
        this.add.text(gameWidth / 2, 40, 'INSTRUÇÕES DE JOGO', titleStyle).setOrigin(0.5).setShadow(1, 1, '#FF4500', 2);
        
        const scaleIcons = 0.4;
        const col1_x = gameWidth * 0.2;
        const col2_x = gameWidth * 0.5;
        const col3_x = gameWidth * 0.8;
        const icon_y = 180;
        const text_y_header = 300;
        const text_y_body = 340;

        const playerAssetKey = this.textures.exists('player_ship') ? 'player_ship' : 'star'; 
        this.add.image(col1_x, icon_y, playerAssetKey).setScale(scaleIcons);

        this.add.text(col1_x, text_y_header, 'FOGUETE (PLAYER)', headerStyle).setOrigin(0.5);
        this.add.text(col1_x, text_y_body, 'Controle sua nave de Mercúrio até Neptuno. Evite colisões.', bodyStyle).setOrigin(0.5, 0);

        this.add.image(col2_x, icon_y - 40, 'meteor').setScale(scaleIcons);
        this.add.image(col2_x, icon_y + 60, 'moon').setScale(scaleIcons);

        this.add.text(col2_x, text_y_header, 'METEOROS E LUAS', headerStyle).setOrigin(0.5);
        this.add.text(col2_x, text_y_body, 'Se colidir, é Game Over! A dificuldade aumenta após Urano.', bodyStyle).setOrigin(0.5, 0);

        this.add.image(col3_x, icon_y, 'star').setScale(scaleIcons);

        this.add.text(col3_x, text_y_header, 'ESTRELAS', headerStyle).setOrigin(0.5);
        this.add.text(col3_x, text_y_body, 'Cada estrela vale 20 pontos. Recolha o máximo que conseguir.', bodyStyle).setOrigin(0.5, 0);
        
        this.add.text(gameWidth / 2, 500, 'CONTROLOS: Setas / WASD para Mover.', { fontSize: '24px', fill: '#FFF' }).setOrigin(0.5);
      
        
        const backButton = this.add.image(gameWidth / 2, gameHeight - 70, 'btn_menu')
            .setInteractive()
            .setScale(0.5); 
        
        backButton.on('pointerover', () =>backButton.setScale(0.55));
        backButton.on('pointerout', () => backButton.setScale(0.5));
        
        backButton.on('pointerdown', () => {
             this.sound.play('click');
            this.scene.start('MenuScene')}
        );
    }
}