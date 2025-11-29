class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Carregando Stellar Quest...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

       
        this.load.image('starfield', 'assets/img/starfield.png');

       
        this.load.image('logo', 'assets/img/logo.png');

        
        this.load.image('btn_play', 'assets/img/btn_play.png');
        this.load.image('btn_instructions', 'assets/img/btn_instructions.png');
        this.load.image('btn_menu', 'assets/img/btn_menu.png');
      
        this.load.image('btn_exit', 'assets/img/btn_sair.png'); 

      
        this.load.image('meteor', 'assets/img/meteor.png');
        this.load.image('moon', 'assets/img/moon.png');
        this.load.image('star', 'assets/img/star.png');
        
    }

    create() {
        console.log('Assets carregados. A iniciar MenuScene...');
        this.scene.start('MenuScene');
    }
}