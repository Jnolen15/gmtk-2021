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
G

    update(targetX, targetY) {
        this.distance = Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY);
        if (this.distance >= 100) {
            this.moveSpeed = 150;
        } else if (this.distance >= 1){
            this.moveSpeed = 100;
        } else {
            this.moveSpeed = 0;
        }
        if (this.follow) {
            if (!this.anims.isPlaying) {
                this.play('idle');
            }
            if (targetX > this.x + 1) {
                this.setVelocityX(this.moveSpeed);
            } else if (targetX < this.x - 10) {
                this.setVelocityX(-this.moveSpeed); 
            } else {
                this.setVelocityX(0)
            }
            if (targetY > this.y + 1) {
                this.setVelocityY(this.moveSpeed);
            } else if (targetY < this.y - 10) {
                this.setVelocityY(-this.moveSpeed); 
            } else {
                this.setVelocityY(0);
            }
        }
        
    }
}