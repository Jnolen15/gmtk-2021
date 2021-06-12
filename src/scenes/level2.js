class level2 extends Phaser.Scene {
    constructor() {
        super("level2Scene");
    }

    preload(){
        // Load Json file
        this.load.tilemapTiledJSON('level2', './assets/tiledStuff/tm_level2Placeholder.json');
        // Tilesheets
        this.load.image('desert', './assets/tiledStuff/tm_placeholder.png');
        this.load.image('collision', './assets/tilemap/tm_collision.png');
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
        const map = this.add.tilemap('level2');

        // add a tileset to the map
        const tsDesert = map.addTilesetImage('tm_placeholder', 'desert');
        const tsCollision = map.addTilesetImage('ts_collision', 'collision');

        // create tilemap layers
        const desertLayer = map.createLayer('desertLayer', tsDesert, 0, 0);
        const CollisionLayer = map.createLayer('collisionLayer', tsCollision, 0, 0);
        //CollisionLayer.alpha = 0;

        // adding objecterinos
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'leadTut', 0).setScale(playerScale);
        this.player.setSize(this.player.width/2, this.player.height/2);
        this.player.body.setImmovable();
        this.player.play('leadidle');

        // initializing camera and boundries
        this.physics.world.bounds.setTo(0, 0, gameWidth, gameHeight);
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.startFollow(this.player);

        // Fade in Scene
        this.cameras.main.fadeIn(500, 0, 0, 0);

    }

    update(){
        // updating objects
        this.player.update();
    }
}