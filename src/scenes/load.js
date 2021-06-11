class load extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload(){
        this.load.image('testPlayer', './assets/testAssets/greenSquare.png');
        this.load.image('testPosMarkers', './assets/testAssets/blueSquare.png');
    }

    create(){
        // Start scene
        this.scene.start('level1Scene');
    }
}