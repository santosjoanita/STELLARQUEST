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

        
        // Função para criar um botão com escala e efeitos
        const createButton = (yPos, key, targetScene) => {
                        const scaleFactor = 0.5; 
            
            const button = this.add.image(gameWidth / 2, yPos, key)
                .setInteractive()
                .setScale(scaleFactor); 

            // Efeito Hover:
            button.on('pointerover', () => button.setScale(scaleFactor + 0.05)); 
            button.on('pointerout', () => button.setScale(scaleFactor));

            // Ação ao clicar
            if (targetScene) {
                button.on('pointerdown', () => this.scene.start(targetScene));
            } else if (key === 'btn_exit') {
                button.on('pointerdown', () => {
                    // Implementação básica de 'sair' para web
                    alert('Obrigado por jogar Stellar Quest!');
                });
            }
        };

        // Criar Botões (Posições Y ajustadas para a escala 0.5)
        createButton(430, 'btn_play', 'GameScene');       
        createButton(510, 'btn_instructions', 'InstructionsScene'); 
        createButton(590, 'btn_exit', null);            
    }
}