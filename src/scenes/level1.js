class level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload(){
        // Load Json file
        this.load.tilemapTiledJSON('level1', './assets/tiledStuff/tm_level1Placeholder.json');
        // Tilesheets
        this.load.image('desert', './assets/tiledStuff/tm_placeholder.png');
    }

    create(){
        //Create the tilemap
        const map = this.add.tilemap('level1');

        // add a tileset to the map
        const tsDesert = map.addTilesetImage('tm_placeholder', 'desert');

        // create tilemap layers
        const desertLayer = map.createLayer('desertLayer', tsDesert, 0, 0);

        // Scene Transition
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keyF)){
            console.log("Pressed W");
            //this.scene.transition({ target: 'level2Scene', duration: 2000 });
            this.cameras.main.fadeOut(500, 0, 0, 0)

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                //this.scene.start('phaser-logo')
                this.scene.transition({ target: 'level2Scene', duration: 2000 });
            })
        }
    }
}