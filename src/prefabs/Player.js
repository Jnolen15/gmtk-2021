class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to scene
        scene.add.existing(this);

        this.moveSpeed = 8;
        this.velocityX = 0;
        this.velocityY = 0;
    }


    update() {
        if (keyRIGHT.isDown) {
            this.velocityX = this.moveSpeed;
        }
        if (keyLEFT.isDown) {
            this.velocityX = this.moveSpeed* -1 ;
        }
        if (keyDOWN.isDown) {
            this.velocityY = this.moveSpeed;
        }
        if (keyUP.isDown) {
            this.velocityY = this.moveSpeed * -1;
        }
        

        this.x += this.velocityX;
        this.y += this.velocityY;

        // limiting movement to stage size
        if (this.x > game.config.width - this.width * playerScale/2) {
            this.x = game.config.width - this.width * playerScale/2;
        } else if (this.x < 0 + this.width * playerScale/2) {
            this.x = 0 + this.width * playerScale/2;
        }

        if (this.y > game.config.height - this.height * playerScale/2) {
            this.y = game.config.height - this.height * playerScale/2;
        } else if (this.y < 0 + this.height * playerScale/2) {
            this.y = 0 + this.height * playerScale/2;
        }

        // reseting velocity
        this.velocityX = 0;
        this.velocityY = 0;


    }
}