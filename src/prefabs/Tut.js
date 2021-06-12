class Tut extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        // Add physics
        scene.physics.add.existing(this);

        this.moveSpeed = 200;
        this.follow = false;
        this.dead = false;
    }

    update(targetX, targetY) {
        // setting speed based on distance to target
        this.distance = Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY);
        this.moveSpeed = 200 * this.inverseLerp(this.distance, 1, 100);

        // setting velocity based on relative position to target
        if(!this.dead){
            if (this.follow) {
                if (!this.anims.isPlaying) {
                    this.play('idle');
                }
                if (targetX > this.x + 5) {
                    this.setVelocityX(this.moveSpeed);
                } else if (targetX < this.x - 5) {
                    this.setVelocityX(-this.moveSpeed); 
                } else {
                    this.setVelocityX(0);
                }
                if (targetY > this.y + 5) {
                    this.setVelocityY(this.moveSpeed);
                } else if (targetY < this.y - 5) {
                    this.setVelocityY(-this.moveSpeed); 
                } else {
                    this.setVelocityY(0);
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
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
        }

        if (Math.abs(this.body.velocity.x) > 50 || Math.abs(this.body.velocity.y) > 50) {
            if (this.anims.getName() != 'walk') {
                this.play('walk');
            }
        } else {
            if (this.anims.getName() != 'idle') {
                this.play('idle');
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