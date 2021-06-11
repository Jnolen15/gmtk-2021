class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to scene
        scene.add.existing(this);

        this.moveSpeed = 8;
        this.diagonalMoveSpeed = Math.round(Math.sqrt(this.moveSpeed ** 2 / 2));
        this.velocityX = 0;
        this.velocityY = 0;
    }


    update() {
        if (keyRIGHT.isDown) {
            this.velocityX += this.moveSpeed;
        }
        if (keyLEFT.isDown) {
            this.velocityX -= this.moveSpeed;
        }
        if (keyDOWN.isDown) {
            this.velocityY += this.moveSpeed;
        }
        if (keyUP.isDown) {
            this.velocityY -= this.moveSpeed;
        }
        
        // adjusting for diagonal movement
        if (Math.abs(this.velocityX) > 0 && Math.abs(this.velocityY) > 0) {
            if (this.velocityX > 0) {
                this.velocityX = this.diagonalMoveSpeed;
            } else {
                this.velocityX = this.diagonalMoveSpeed * -1;
            }
            if (this.velocityY > 0) {
                this.velocityY = this.diagonalMoveSpeed;
            } else {
                this.velocityY = this.diagonalMoveSpeed * -1;
            }
        }
        

        // applying velocity to position
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

        // resetting velocity
        this.velocityX = 0;
        this.velocityY = 0;


    }
}