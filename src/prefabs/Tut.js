class Tut extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        // Add physics
        scene.physics.add.existing(this);

        this.moveSpeed = 100;
        this.follow = false;
    }


    update(playerX, playerY) {
        if (this.follow) {
            if (this.x < playerX) {
                this.setVelocityX(this.moveSpeed);
            } else {
                this.setVelocityX(-this.moveSpeed); 
            }
            if (this.y < playerY) {
                this.setVelocityY(this.moveSpeed);
            } else {
                this.setVelocityY(-this.moveSpeed); 
            }
        }
        
    }
}