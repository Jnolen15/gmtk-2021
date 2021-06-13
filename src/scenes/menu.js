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
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);  

        // Start scene
        this.menuImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'menu').setOrigin(0, 0);
   
        // adding in text
        this.add.text(game.config.width * 30/100, game.config.height * 85/100, 'Press any arrow key to start.\n Best experienced with audio on.', textConfig).setOrigin(0.5, 0.5);
    
        // fade in (for game restart)
        this.cameras.main.fadeIn(500, 0, 0, 0);
        transitioning = false;
    }

    update() {
        if((Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyUP) || Phaser.Input.Keyboard.JustDown(keyDOWN))&& !transitioning) {
            transitioning = true;
            this.cameras.main.fadeOut(500, 0, 0, 0);

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                //this.scene.start('phaser-logo')
                this.scene.stop();
                this.scene.start('level1Scene');
                // this.scene.start('endScene');
            })
        }
    }
}