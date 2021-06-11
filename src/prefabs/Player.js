class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        this.moveSpeed = 10;
    }


    update() {
        if (keyRIGHT.isDown) {
            this.x += this.moveSpeed;
        }
        if (keyLEFT.isDown) {
            this.x -= this.moveSpeed;
        }
        if (keyDOWN.isDown) {
            this.y += this.moveSpeed;
        }
        if (keyUP.isDown) {
            this.y -= this.moveSpeed;
        }

    }
}