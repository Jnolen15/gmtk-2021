class Tut extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        // Add physics
        scene.physics.add.existing(this);

        this.moveSpeed = 60;
        this.follow = false;
    }


    update(playerX, playerY) {
        this.distance = Phaser.Math.Distance.Between(this.x, this.y, playerX, playerY);
        if (this.distance >= 100) {
            this.moveSpeed = 100;
        } else if (this.distance >= 50){
            this.moveSpeed = 30;
        } else {
            this.moveSpeed = 0;
        }
        if (this.follow) {
            if (!this.anims.isPlaying) {
                this.play('idle');
            }
            if (playerX > this.x + 10) {
                this.setVelocityX(this.moveSpeed);
            } else if (playerX < this.x - 10) {
                this.setVelocityX(-this.moveSpeed); 
            } else {
                this.setVelocityX(0)
            }
            if (playerY > this.y + 10) {
                this.setVelocityY(this.moveSpeed);
            } else if (playerY < this.y - 10) {
                this.setVelocityY(-this.moveSpeed); 
            } else {
                this.setVelocityY(0);
            }
        }
        
    }
}