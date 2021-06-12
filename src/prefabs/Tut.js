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
            this.moveSpeed = 250;
        } else if (this.distance >= 1){
            this.moveSpeed = 150;
        } else {
            this.moveSpeed = 0;
        }
        if (this.follow) {
            if (!this.anims.isPlaying) {
                this.play('idle');
            }
            if (targetX > this.x + 5) {
                this.setVelocityX(this.moveSpeed);
            } else if (targetX < this.x - 5) {
                this.setVelocityX(-this.moveSpeed); 
            } else {
                this.setVelocityX(0)
            }
            if (targetY > this.y + 5) {
                this.setVelocityY(this.moveSpeed);
            } else if (targetY < this.y - 5) {
                this.setVelocityY(-this.moveSpeed); 
            } else {
                this.setVelocityY(0);
            }
        }
        
    }

    inverseLerp(point, a, b) {
        if (point >= b) {
            return 1.0;
        }
        else if (point <= a) {
            return 0.0;
        }
        
        let d = b - a;
        let f = b - point;
        return (d - f) / d;
    }
}