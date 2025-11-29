class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    // Onde se carrega todos os assets (imagens, spritesheets, áudio)
    preload() {
      // Imagens dos botões (Assumindo que as salvou com estes nomes)
    this.load.image('logo', 'assets/images/logo.png'); // O seu novo Logotipo colorido
    this.load.image('btn_play', 'assets/images/btn_play.png');
    this.load.image('btn_instructions', 'assets/images/btn_instructions.png');
    this.load.image('btn_exit', 'assets/images/btn_exit.png');
    this.load.image('btn_menu', 'assets/images/btn_menu.png'); // Botão "MENU" (para GameOverScene)
        
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

        // --- Carregamento de Imagens e Assets ---
        
        // Fundo (starfield.png)
        // É importante que o caminho 'assets/images/starfield.png' esteja correto.
        this.load.image('starfield', 'assets/images/starfield.png');
        
        // TODO: Carregar outros assets essenciais para o Menu, como o logo ou fontes customizadas.
        // Exemplo: this.load.image('logo', 'assets/images/logo.png');
        
        // --- Carregamento de Sons ---
        // TODO: Carregar a música de fundo e sons do menu.
        // Exemplo: this.load.audio('menu_music', ['assets/audio/menu_music.mp3']);
    }

    // Onde se cria instâncias de objetos e se inicia a próxima cena
    create() {
        // Inicia a próxima Scene (MenuScene) após o carregamento completo
        console.log('Assets carregados. A iniciar MenuScene...');
        this.scene.start('MenuScene');
    }
}