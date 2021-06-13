class endScreen extends Phaser.Scene {
    constructor() {
        super("endScene");
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
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // adding in text
        this.add.text(game.config.width * 30/100, game.config.height * 85/100, (tutNumber + 1) + '/9 tuts survived the migration', textConfig).setOrigin(0.5, 0.5);
    }

    update() {
        this.restartCheck();
    }

    restartCheck() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.cameras.main.fadeOut(500, 0, 0, 0);

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                tutNumber = 0;
                level = 'level1';
                levelnum = 0;
                this.scene.play('menuScene');
            })
        }
    }
}