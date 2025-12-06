class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
     

        const BASE_PATH = 'assets/img/'; 
        const BUTTON_PATH = BASE_PATH + 'botões/';
        const SHIP_PATH = BASE_PATH + 'Spaceship/';
        const PLANET_PATH = BASE_PATH + 'planetas/';
        const frameConfig = { frameWidth: 48, frameHeight: 48 }; 
        const AUDIO_PATH = 'assets/audio/';
        
        this.load.audio('music', AUDIO_PATH + 'music.mp3'); 
        this.load.audio('victory', AUDIO_PATH + 'victory.mp3');
        this.load.audio('click', AUDIO_PATH + 'click.wav');
        this.load.audio('lose', AUDIO_PATH + 'lose.wav');
        this.load.audio('star', AUDIO_PATH + 'star.wav');
        this.load.audio('whoosh', AUDIO_PATH + 'whoosh.wav');
        
        // --- SPRITESHEETS DAS NAVES ---
      this.load.spritesheet('ship_rocket1', SHIP_PATH + 'rocket1.png', { frameWidth: 64, frameHeight: 64 }); 
    this.load.spritesheet('ship_rocket2', SHIP_PATH + 'rocket2.png', { frameWidth: 64, frameHeight: 64 });
    
        this.load.image('solar', BASE_PATH + 'solar.jpg');
        this.load.image('starfield', BASE_PATH + 'starfield.png');
        this.load.image('logo', BASE_PATH + 'logo.png');
        this.load.image('btn_play', BUTTON_PATH + 'btn_play.png');
        this.load.image('btn_instructions', BUTTON_PATH + 'btn_instructions.png');
        this.load.image('btn_menu', BUTTON_PATH + 'btn_menu.png');
        this.load.image('btn_exit', BUTTON_PATH + 'btn_sair.png'); 
        this.load.image('btn_iniciar_viagem', BUTTON_PATH + 'iniciarviagem.png');
        this.load.image('btn_restart', BUTTON_PATH + 'btn_restart.png');
        this.load.image('meteor', BASE_PATH + 'meteor.png');
        this.load.image('moon', BASE_PATH + 'moon.png');
        this.load.image('star', BASE_PATH + 'star.png');

        // CARREGAMENTO DOS PLANETAS 
        this.load.image('mercurio', PLANET_PATH + 'mercurio.png');
        this.load.image('venus', PLANET_PATH + 'vénus.png'); 
        this.load.spritesheet('terra', PLANET_PATH + 'terra.png', { frameWidth: 256, frameHeight: 256 });
        this.load.image('marte', PLANET_PATH + 'marte.png');
        this.load.image('jupiter', PLANET_PATH + 'júpiter.png'); 
        this.load.image('saturno', PLANET_PATH + 'saturno.png');
        this.load.image('urano', PLANET_PATH + 'urano.png');
        this.load.image('neptuno', PLANET_PATH + 'neptuno.png'); 
    }

    create() {
        this.scene.start('MenuScene');
    }
}