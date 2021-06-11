class level2 extends Phaser.Scene {
    constructor() {
        super("level2Scene");
    }

    preload(){
        // Load Json file
        this.load.tilemapTiledJSON('level2', './assets/tiledStuff/tm_level2Placeholder.json');
        // Tilesheets
        this.load.image('desert', './assets/tiledStuff/tm_placeholder.png');
    }

    create(){
        //Create the tilemap
        const map = this.add.tilemap('level2');

        // add a tileset to the map
        const tsDesert = map.addTilesetImage('tm_placeholder', 'desert');

        // create tilemap layers
        const desertLayer = map.createLayer('desertLayer', tsDesert, 0, 0);

        // Fade in Scene
        this.cameras.main.fadeIn(500, 0, 0, 0);

    }
}