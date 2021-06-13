class level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload(){
        // Load Json files
        this.load.tilemapTiledJSON(level, './assets/tiledStuff/tm_' + level + '.json');
        
        // Tilesheets
        this.load.image('desert', './assets/tiledStuff/ts_desert.png');
        this.load.image('decor', './assets/tiledStuff/ts_decor.png');
        this.load.image('collision', './assets/tiledStuff/tm_collision.png');
    }

    create(){
        // KEYBOARD INITILIZATION ==========================================
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        // TILEMAP CREATION ==========================================
        const map = this.add.tilemap(level);

        // add a tileset to the map
        const tsDesert = map.addTilesetImage('ts_desert', 'desert');
        const tsdecor = map.addTilesetImage('ts_decor', 'decor');
        const tsCollision = map.addTilesetImage('tm_collision', 'collision');

        // create tilemap layers
        this.desertLayer = map.createLayer('desertLayer', tsDesert, 0, 0);
        this.desertLayer = map.createLayer('decorLayer', tsdecor, 0, 0);
        this.CollisionLayer = map.createLayer('collisionLayer', tsCollision, 0, 0);
        this.CollisionLayer.alpha = 0;
        this.objectsLayer = map.getObjectLayer('objectsLayer')['objects'];

        // ADDING PLAYER ==========================================
        this.player = new Player(this, game.config.width/8, game.config.height/2, 'leadTut', 0).setScale(playerScale);
        this.player.setSize(this.player.width/2, this.player.height/2);
        this.player.body.setImmovable();
        this.player.body.collideWorldBounds = true;
        this.player.play('leadidle');

        // SPAWN TUTS BASED ON TILEMAP ==========================================
        this.tuts = [];
        this.tutGroup = this.physics.add.group();
        this.objectsLayer.forEach(object => { // here we are iterating through each object.
			switch(object.name) {
                case 'tut':
                    // Spawn a tut
                    this.createTut(object.x, object.y);
                    break;
                    default: break;
                }
            });

        // carying over tuts from previous level
        this.spawnPreviousTuts();

        // INITIALIZE CAMERA AND BOUNDS ==========================================
        this.physics.world.bounds.setTo(0, 0, gameWidth, gameHeight);
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // ADD UI ASSETS ==========================================
        this.cameraUICover = this.add.image(0,0,'cameraUICover').setOrigin(0,0).setDepth(game.config.height + 2); 

        // ADD SCROLLING CLOUDS ==========================================
        this.clouds = this.add.tileSprite(0,0, game.config.width, game.config.height,'clouds').setOrigin(0,0).setDepth(game.config.height + 1); 

        // Bool for scene transitions
        transitioning = false;
    }

    update(){
        // updating objects
        this.player.update();

        // check for player death if over a pit
        this.playerDeathCheck();

        // check for tut death if over a pit
        this.tutDeathCheck();

        // scrolling clouds
        this.clouds.tilePositionX += .5;

        // collision handling
        this.manageTuts();

        // Check for level transition
        this.levelTransition();

        this.restartCheck();
    }

    createTut(xPos, yPos) {
        let newTut = new Tut(this, xPos, yPos, 'tut', 0).setScale(playerScale).setSize(this.player.width/2, this.player.height/2);
        newTut.body.collideWorldBounds = true;
        this.tutGroup.add(newTut);
        this.tuts.push(newTut);
        newTut.play('idle');
    }

    manageTuts() {
        // check if any tuts overlap with player 
        for (let i = 0; i < this.tuts.length; i++) {
            if(this.physics.overlap(this.player, this.tuts[i]) && !this.tuts[i].follow) {
                this.tuts[i].follow = true;
                this.player.birdGroup.push(this.tuts[i]);
                tutNumber += 1;
            }
        }
    }

    playerDeathCheck(){
        // Player death if over a pit
        if(!transitioning && !this.player.dead) this.tile = this.CollisionLayer.getTileAtWorldXY(this.player.x, this.player.y+20);
        if(this.tile != null && !this.player.dead){
            console.log("Above Pit");
            console.log("Tile X: " + this.tile.x*25 + " Tile Y: " + this.tile.y*25);
            this.player.dead = true;
            this.player.x = this.tile.x * 25; this.player.y = this.tile.y * 25;
            this.tweens.add({ 
                targets: this.player, 
                scale: 0,
                rotation: 8,
                ease: 'Sine.easeOut', 
                duration: 600,
            });
            this.time.delayedCall(650, ()=>{
                this.scene.restart();
            });
        }
    }

    tutDeathCheck(){
        // Tut death if over a pit
        for(let i = 0; i < this.player.birdGroup.length; i++) {
            if(!transitioning && !this.player.birdGroup[i].dead) this.tile = this.CollisionLayer.getTileAtWorldXY(this.player.birdGroup[i].x, this.player.birdGroup[i].y+20);
            if(this.tile != null && !this.player.birdGroup[i].dead) {
                console.log("Tut " + i + " fell into a pit!");
                this.player.birdGroup[i].dead = true;
                this.player.birdGroup[i].moveSpeed = 0;
                this.player.birdGroup[i].x = this.tile.x * 25; this.player.birdGroup[i].y = this.tile.y * 25;
                this.tweens.add({ 
                    targets: this.player.birdGroup[i], 
                    scale: 0,
                    rotation: 8,
                    ease: 'Sine.easeOut', 
                    duration: 600,
                });
            tutNumber -= 1;
            }
        }
    }

    levelTransition(){
        // Transition to next scene if player is on right of screen
        if(!transitioning) {
            if(this.player.x > game.config.width - this.player.width * playerScale * 0.5){
                transitioning = true;
                console.log("Past");
                //this.scene.transition({ target: 'level2Scene', duration: 2000 });
                this.cameras.main.fadeOut(500, 0, 0, 0);

                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    level = 'level2';
                    this.scene.restart();        
                })
            }
        }

        // collision handling
        this.manageTuts();
    }

    createTut(xPos, yPos) {
        let newTut = new Tut(this, xPos, yPos, 'tut', 0).setScale(playerScale).setSize(this.player.width/2, this.player.height/2);
        newTut.setOrigin(.5,.5);
        newTut.body.collideWorldBounds = true;
        this.tutGroup.add(newTut);
        this.tuts.push(newTut);
        newTut.play('idle');
    }

    spawnPreviousTuts() {
        for (var i = 0; i < tutNumber; i++) {
            this.createTut(this.player.x, this.player.y);
        }
        tutNumber = 0;
    }

    restartCheck() {
        if (Phaser.Input.Keyboard.JustDown(keyR) && !transitioning) {
            this.cameras.main.fadeOut(500, 0, 0, 0);

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                tutNumber = 0;
                level = 'level1';
                this.scene.restart();
            })
        }
    }
}