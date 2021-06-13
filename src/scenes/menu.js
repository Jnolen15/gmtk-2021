class menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload(){
        // loading sprites
        this.load.image('menu', './assets/MenuPage.png');
        
    }

    create(){
        // load keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N); 

        // Start scene
        this.menuImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu').setOrigin(0, 0);
    }

    update() {
        if((Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyDOWN))&& !transitioning) {
            transitioning = true;
            this.cameras.main.fadeOut(500, 0, 0, 0);

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                //this.scene.start('phaser-logo')
                this.scene.stop();
                this.scene.start('level1Scene');
                // this.scene.transition({ target: 'level1Scene', duration: 2000 });
            })
        }
    }
}