class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to scene
        scene.add.existing(this);

        this.moveSpeed = 8;
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