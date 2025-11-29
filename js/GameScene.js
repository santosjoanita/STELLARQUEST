class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.score = 0;
    }
    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'starfield');
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '24px', fill: '#FFF' }).setScrollFactor(0);
        this.tempText = this.add.text(10, this.game.config.height - 40, 'Temperatura: Mercúrio (ALTA)', { fontSize: '24px', fill: '#FF4500' }).setScrollFactor(0);
        
     
    }
    update(time, delta) {
       
    }

    
    playerHit() {
        this.physics.pause();
        this.scene.start('GameOverScene', { score: this.score });
    }
}