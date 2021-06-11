class level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload(){
        // Load Json file
        this.load.tilemapTiledJSON('level1', './assets/tiledStuff/tm_level1Placeholder.json');
    }

    create(){

    }
}