class load extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload(){
        
    }

    create(){

        // Start scene
        this.scene.start('level1Scene');
    }
}