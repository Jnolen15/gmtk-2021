class load extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload(){
        // Tilesheets
        this.load.image('desert', './assets/tiledStuff/tm_placeholder.png');
    }

    create(){

        // Start scene
        this.scene.start('level1Scene');
    }
}