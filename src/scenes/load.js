class load extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    preload(){
        // loading normal sprites
        this.load.image('testPlayer', './assets/testAssets/greenSquare.png');
        this.load.image('testPosMarkers', './assets/testAssets/blueSquare.png');
        this.load.image('testTut', './assets/testAssets/redSquare.png');
        this.load.image('cameraUICover', './assets/UI/CameraUICover.png');
        this.load.image('clouds', './assets/Clouds.png');
        // loading sprite atlasses
        this.load.atlas('tut', './assets/animations/anim_idle.png', './assets/animations/anim_idle.json');
        this.load.atlas('tutWalk', './assets/animations/anim_tutwalk.png', './assets/animations/anim_tutwalk.json');
        this.load.atlas('leadTut', './assets/animations/anim_lead_idle.png', './assets/animations/anim_lead_idle.json');
        this.load.atlas('leadTutWalk', './assets/animations/anim_lead_walk.png', './assets/animations/anim_lead_walk.json');
        // loading audio
        this.load.audio('Conclusion', './assets/Narration/Conclusion.wav');
        this.load.audio('HereIsALeader', './assets/Narration/HereIsALeader.wav');
        this.load.audio('Intro', './assets/Narration/Intro.wav');
        this.load.audio('LifeSpan', './assets/Narration/LifeSpan.wav');
        this.load.audio('ThereGoesAnotherOne', './assets/Narration/ThereGoesAnotherOne.wav');
        this.load.audio('TutsAreCarniverous', './assets/Narration/TutsAreCarniverous.wav');
        this.load.audio('WhenUnderground', './assets/Narration/WhenUnderground.wav');
        this.load.audio('Wind', './assets/Narration/Intro.wav');
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
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('tutWalk', {
              start: 1,
              end: 5,
              zeroPad: 1,
              prefix: 'hop',
              suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'leadidle',
            frames: this.anims.generateFrameNames('leadTut', {
              start: 1,
              end: 3,
              zeroPad: 1,
              prefix: 'leadidle',
              suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'leadwalk',
            frames: this.anims.generateFrameNames('leadTutWalk', {
              start: 1,
              end: 5,
              zeroPad: 1,
              prefix: 'leadhop',
              suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });

        // Start scene
        this.scene.start('menuScene');

    }
}