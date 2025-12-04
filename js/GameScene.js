class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.score = 0;
        this.currentLevel = 0; 
        this.playerSpeed = 400; 
        this.PLANET_SPAWN_INTERVAL = 15000; 
        this.gameTime = 0; 
        
        this.planetData = [
            { name: 'Mercúrio', key: 'mercurio', color: '#FF4500', temp: 'MUITO ALTA' },
            { name: 'Vénus', key: 'venus', color: '#FF8C00', temp: 'ALTA' },
            { name: 'Terra', key: 'terra', color: '#00BFFF', temp: 'MODERADA' },
            { name: 'Marte', key: 'marte', color: '#FF0000', temp: 'FRIO' },
            { name: 'Júpiter', key: 'jupiter', color: '#BDB76B', temp: 'GELADO' },
            { name: 'Saturno', key: 'saturno', color: '#D2B48C', temp: 'MUITÍSSIMO GELADO' },
            { name: 'Urano', key: 'urano', color: '#AFEEEE', temp: 'EXTREMO' },
            { name: 'Neptuno', key: 'neptuno', color: '#1E90FF', temp: 'MORTAL' }
        ];
        
        this.markerX = 0; 
        this.markerY_Base = 0;
        this.markerSpacing = 0;
    }

    init(data) {
        this.playerAssetKey = data.shipKey || 'ship_blue'; 
    }

    create() {
        const gameWidth = this.game.config.width;
        const gameHeight = this.game.config.height;

        this.starfield = this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'starfield');

   
        this.currentPlanetImage = this.add.image(gameWidth / 2, gameHeight + 10, 'mercurio').setScale(1.5); 
        
  
        // --- 2. Player ---
        this.player = this.physics.add.sprite(gameWidth / 2, gameHeight - 150, this.playerAssetKey);
        this.player.setCollideWorldBounds(true);
        
        
        this.player.setScale(1.5); 
        this.player.setFrame(0); 
        this.player.body.setSize(30, 30).setOffset(17, 17);
   
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A), right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
        this.anims.create({
            key: 'terra_spin',
            frames: this.anims.generateFrameNumbers('terra', { start: 0, end: 3 }), 
            frameRate: 8, 
            repeat: -1 
        });
     

        this.timerText = this.add.text(10, 10, 'TEMPO: 00:00', { fontSize: '30px', fill: '#00FF00' }).setScrollFactor(0);

        this.scoreText = this.add.text(10, 50, 'SCORE: 0', { fontSize: '30px', fill: '#FFF' }).setScrollFactor(0);
        this.tempText = this.add.text(10, gameHeight - 40, 'Temperatura:', { fontSize: '24px', fill: '#FF4500' }).setScrollFactor(0);
        
        this.createMiniMap(gameWidth, gameHeight);
        this.updateHUD(); 


        this.starGroup = this.physics.add.group();
        this.obstacleGroup = this.physics.add.group();
        this.planetGroup = this.physics.add.group();
        
        // Spawners e Timers
        this.time.addEvent({ delay: 1500, callback: this.spawnStar, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 2000, callback: this.spawnObstacle, callbackScope: this, loop: true });
        
        // Timer de Progressão 
        this.time.addEvent({ 
            delay: this.PLANET_SPAWN_INTERVAL, 
            callback: this.spawnLevelPlanet, 
            callbackScope: this, 
            loop: true 
        });
        
    
        this.time.delayedCall(5000, this.removeInitialPlanet, [], this); 


        this.time.addEvent({ 
            delay: 1000, 
            callback: this.updateGameTime, 
            callbackScope: this, 
            loop: true 
        });

        // Colisões
        this.physics.add.overlap(this.player, this.starGroup, this.collectStar, null, this);
        this.physics.add.collider(this.player, this.obstacleGroup, this.playerHit, null, this);
        this.physics.add.overlap(this.player, this.planetGroup, this.levelAdvanceHit, null, this);
    }
    

    
    update(time, delta) {
        this.starfield.tilePositionY -= 2; 
        this.handlePlayerMovement();
    }
    
    updateGameTime() {
        this.gameTime++;
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = this.gameTime % 60;
        

        const timeString = `TEMPO: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        this.timerText.setText(timeString);
    }
    
    handlePlayerMovement() {
        this.player.setVelocity(0); 
        const speed = this.playerSpeed;
        
        if (this.cursors.up.isDown || this.wasd.up.isDown) { 
            this.player.setVelocityY(-speed); 
        } 
        else if (this.cursors.down.isDown || this.wasd.down.isDown) { 
            this.player.setVelocityY(speed); 
        }

        if (this.cursors.left.isDown || this.wasd.left.isDown) { 
            this.player.setVelocityX(-speed); 
            this.player.setFrame(1);
        } 
        else if (this.cursors.right.isDown || this.wasd.right.isDown) { 
            this.player.setVelocityX(speed); 
            this.player.setFrame(2); 
        }
        else {
            this.player.setFrame(0);
        }
        
        this.player.body.velocity.normalize().scale(speed);
    }
    
    removeInitialPlanet() {
        if (this.currentPlanetImage) {
            this.tweens.add({
                targets: this.currentPlanetImage,
                alpha: 0,
                duration: 1500,
                onComplete: () => {
                    this.currentPlanetImage.destroy();
                    this.currentPlanetImage = null;
                }
            });
        }
    }
    

    spawnLevelPlanet() {
        const nextLevel = this.currentLevel + 1;
        const gameWidth = this.game.config.width;

        if (nextLevel >= this.planetData.length) {
            return;
        }

        const planetData = this.planetData[nextLevel];
        
        const planet = this.planetGroup.create(gameWidth / 2, -100, planetData.key);
        
        if (planetData.key === 'terra') {
            planet.play('terra_spin');
        }
        
        planet.setScale(0.8); 
        planet.setImmovable(true); 

        this.physics.moveTo(planet, gameWidth / 2, this.game.config.height + 100, 100); 

        planet.checkWorldBounds = true;
        planet.onWorldBounds = (body) => {
             if (body.y > this.game.config.height) {
                planet.destroy();
            }
        };
    }
    
   // GameScene.js

    levelAdvanceHit(player, planet) {
        if (!player || !planet || !planet.body) {
            return;
        }
         this.isInvulnerable = true; 
        planet.disableBody(true, true);
        
        this.advanceLevel(); 
        
        this.cameras.main.shake(300, 0.02); 
        this.cameras.main.flash(300, 255, 255, 255); 
        
        this.time.delayedCall(500, () => {
            this.isInvulnerable = false;
        }, [], this); 
    }
    


   advanceLevel() {
        const finalPlanetIndex = this.planetData.length - 1;

        if (this.currentLevel < finalPlanetIndex) {
            this.currentLevel++;
        } else {
            return; 
        }
        
        this.updateHUD(); 

 
        if (this.currentLevel === finalPlanetIndex) { 
            
            this.scene.start('GameOverScene', { score: this.score, completed: true });
            return; 
        }
        
        this.playerSpeed += 50; 
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 20;
        this.updateHUD();
    }

    playerHit() {
        this.physics.pause();
        this.scene.start('GameOverScene', { score: this.score });
    }
    

    spawnStar() {
        const gameWidth = this.game.config.width;
        const x = Phaser.Math.Between(50, gameWidth - 50);
        const y = -30; 
        const star = this.starGroup.create(x, y, 'star');
        star.setScale(0.3); 
        star.setBodySize(200, 200); 
        star.setVelocityY(200);
        star.setRotation(Phaser.Math.DegToRad(Phaser.Math.Between(0, 360)));
        star.setAngularVelocity(200);
    }
    
    spawnObstacle() {
        const gameWidth = this.game.config.width;
        const x = Phaser.Math.Between(50, gameWidth - 50);
        const y = -30;
        
        const isMoon = Phaser.Math.Between(0, 1);
        const assetKey = isMoon ? 'moon' : 'meteor';
        
        const obstacle = this.obstacleGroup.create(x, y, assetKey);
        obstacle.setScale(0.3); 
        obstacle.setBodySize(300, 300); 
        
        obstacle.setVelocityY(150 + (this.currentLevel * 50)); 
        obstacle.setAngularVelocity(Phaser.Math.Between(-100, 100));
        
    }
    
    
    // ===================================
    // MÉTODOS DO MINI MAPA E HUD
    // ===================================
    
    createMiniMap(gameWidth, gameHeight) {
        const MAP_WIDTH = 130;
        const MAP_HEIGHT = 190;
        const PADDING = 15;
        
        const mapContainerX = gameWidth - PADDING - MAP_WIDTH; 
        const mapContainerY = gameHeight - PADDING - MAP_HEIGHT; 

        this.miniMapGraphics = this.add.graphics().setScrollFactor(0);
        this.miniMapGraphics.fillStyle(0x000000, 0.7); 
        this.miniMapGraphics.fillRect(mapContainerX, mapContainerY, MAP_WIDTH, MAP_HEIGHT);
        this.miniMapGraphics.lineStyle(2, 0x00FFFF, 1); 
        this.miniMapGraphics.strokeRect(mapContainerX, mapContainerY, MAP_WIDTH, MAP_HEIGHT);

        this.add.text(mapContainerX + MAP_WIDTH / 2, mapContainerY + 5, 'SISTEMA SOLAR', { 
            fontSize: '14px', 
            fill: '#00FFFF' 
        }).setOrigin(0.5, 0).setScrollFactor(0);

        this.planetIcons = [];
        const totalPlanets = this.planetData.length;
        
        const startYOffset = 25; 
        const spacing = (MAP_HEIGHT - startYOffset - 5) / totalPlanets; 

        for (let i = 0; i < totalPlanets; i++) {
            const data = this.planetData[i];
            
            const planetIconX = mapContainerX + MAP_WIDTH * 0.75; 
            const planetTextX = mapContainerX + MAP_WIDTH * 0.25; 
            const planetY = mapContainerY + startYOffset + (i * spacing) + spacing / 2; 
            
            const planetIcon = this.add.image(planetIconX, planetY, data.key)
                .setScale(0.08)
                .setScrollFactor(0);
            this.planetIcons.push(planetIcon);
            
            this.add.text(planetTextX, planetY, data.name.toUpperCase(), { 
                fontSize: '10px', 
                fill: '#FFF' 
            }).setOrigin(0.5).setScrollFactor(0);
        }
        
        this.playerMarker = this.add.graphics().setScrollFactor(0);
        this.markerX = mapContainerX + MAP_WIDTH * 0.75; 
        this.markerY_Base = mapContainerY + startYOffset + spacing / 2;
        this.markerSpacing = spacing;
        
        this.playerMarker.fillStyle(0xFF0000, 1).fillCircle(this.markerX, this.markerY_Base, 4);
    }
    
    updateHUD() {
        this.scoreText.setText(`SCORE: ${this.score}`);
        
        const currentPlanet = this.planetData[this.currentLevel];
        this.tempText.setText(`TEMPERATURA: ${currentPlanet.name} (${currentPlanet.temp})`);
        this.tempText.setFill(currentPlanet.color);
        
        const targetMarkerY = this.markerY_Base + (this.currentLevel * this.markerSpacing);
        
        this.playerMarker.clear();
        this.playerMarker.fillStyle(0xFF0000, 1);
        this.playerMarker.fillCircle(this.markerX, targetMarkerY, 4); 
    }
}