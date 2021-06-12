class load extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload(){
        // loading sprites
        this.load.image('testPlayer', './assets/testAssets/greenSquare.png');
        this.load.image('testPosMarkers', './assets/testAssets/blueSquare.png');
        this.load.image('testTut', './assets/testAssets/redSquare.png');
        this.load.atlas('tut', './assets/animations/anim_idle.png', './assets/animations/anim_idle.json');
    }

    create(){
        
        // creating animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('tut', {
              start: 1,
              end: 3,
              zeroPad: 1,
              prefix: 'idletut',
              suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });

        // Start scene
        this.scene.start('level1Scene');

    }
}