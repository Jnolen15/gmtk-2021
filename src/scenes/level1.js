class level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload(){
        // loading sprites
        this.load.image('square', './assets/testAssets/greenSquare.png');

        // Load Json files
        this.load.tilemapTiledJSON('level1', './assets/tiledStuff/tm_level1Placeholder.json');
        
        // Tilesheets
        this.load.image('desert', './assets/tiledStuff/tm_placeholder.png');
        this.load.image('collision', './assets/tiledStuff/tm_collision.png');
    }

    create(){
        // keyboard initialization
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //Create the tilemap
        const map = this.add.tilemap('level1');

        // add a tileset to the map
        const tsDesert = map.addTilesetImage('tm_placeholder', 'desert');
        const tsCollision = map.addTilesetImage('tm_collision', 'collision');

        // create tilemap layers
        this.desertLayer = map.createLayer('desertLayer', tsDesert, 0, 0);
        this.CollisionLayer = map.createLayer('collisionLayer', tsCollision, 0, 0);
        //CollisionLayer.alpha = 0;

        // adding objecterinos
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'leadTut', 0).setScale(playerScale);
        this.player.setSize(this.player.width/2, this.player.height/2);
        this.player.body.setImmovable();
        this.player.play('leadidle');

        this.tut1 = new Tut(this, game.config.width/4, game.config.height/4, 'tut', 0).setScale(playerScale).setSize(this.player.width/2, this.player.height/2);
        this.tut2 = new Tut(this, game.config.width*3/4, game.config.height/4, 'tut', 0).setScale(playerScale).setSize(this.player.width/2, this.player.height/2);
        this.tut3 = new Tut(this, game.config.width/4, game.config.height*3/4, 'tut', 0).setScale(playerScale).setSize(this.player.width/2, this.player.height/2);
        this.tut4 = new Tut(this, game.config.width*3/4, game.config.height*3/4, 'tut', 0).setScale(playerScale).setSize(this.player.width/2, this.player.height/2);
        this.tutGroup = this.physics.add.group();
        this.tutGroup.addMultiple(this.tut1, this.tut2, this.tut3, this.tut4);

        // initializing camera and boundries
        this.physics.world.bounds.setTo(0, 0, gameWidth, gameHeight);
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.startFollow(this.player);

        
        

        // Bool for scene transitions
        this.transitioning = false;

        // leave this in for finding indexes of tiles
        /*this.CollisionLayer.layer.data.forEach((row) => { // here we are iterating through each tile.
			row.forEach((Tile) => {
                console.log(Tile.index);
			})
		});*/
    }

    update(){
        // updating objects
        this.player.update();
        // this.tut1.update(this.player.x, this.player.y);
        // this.tut2.update(this.player.x, this.player.y);
        // this.tut3.update(this.player.x, this.player.y);
        // this.tut4.update(this.player.x, this.player.y);


        if(!this.transitioning) this.tile = this.CollisionLayer.getTileAtWorldXY(this.player.x, this.player.y);
        if(this.tile != null){
            //console.log("Above Pit");
        }

        // Transition to next scene if player is on right of screen
        if(!this.transitioning) {
            if(this.player.x > game.config.width - this.player.width * playerScale * 0.5){
                this.transitioning = true;
                console.log("Past");
                //this.scene.transition({ target: 'level2Scene', duration: 2000 });
                this.cameras.main.fadeOut(500, 0, 0, 0);

                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    //this.scene.start('phaser-logo')
                    this.scene.stop();
                    this.scene.transition({ target: 'level2Scene', duration: 2000 });
                })
            }
        }

        // collision handling
        this.player.body.collideWorldBounds = true;
        this.tut1.body.collideWorldBounds = true;
        this.tut2.body.collideWorldBounds = true;
        this.tut3.body.collideWorldBounds = true;
        this.tut4.body.collideWorldBounds = true;
        // this.physics.collide(this.player, this.tutGroup);
        // this.physics.collide(this.tut1, this.tut2);
        // this.physics.collide(this.tut1, this.tut3);
        // this.physics.collide(this.tut1, this.tut4);
        // this.physics.collide(this.tut2, this.tut3);
        // this.physics.collide(this.tut2, this.tut4);
        if (this.physics.overlap(this.player, this.tut1) && !this.tut1.follow) {
            this.tut1.follow = true;
            this.player.birdGroup.push(this.tut1);
        }
        if (this.physics.overlap(this.player, this.tut2) && !this.tut2.follow) {
            this.tut2.follow = true;
            this.player.birdGroup.push(this.tut2);
        }
        if (this.physics.overlap(this.player, this.tut3) && !this.tut3.follow) {
            this.tut3.follow = true;
            this.player.birdGroup.push(this.tut3);
        }
        if (this.physics.overlap(this.player, this.tut4) && !this.tut4.follow) {
            this.tut4.follow = true;
            this.player.birdGroup.push(this.tut4);
        }
    }
}