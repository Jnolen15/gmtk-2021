class Tut extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to scene
        scene.add.existing(this);
        // Add physics
        scene.physics.add.existing(this);

        this.scene = scene;
        this.moveSpeed = 150;
        this.repositioning = true;
        this.dead = false;

        this.minReposDist = 9;
    }

    update(targetX, targetY) {
        // set depth accordingly
        this.setDepth(this.y);
        
        // setting speed based on distance to target
        this.distance = Phaser.Math.Distance.Between(this.x, this.y, targetX, targetY);
        this.moveSpeed = 90 * this.inverseLerp(this.distance, 0, 120) + 60;

        // setting velocity based on relative position to target
        if(!this.dead) {
            // play idle animation
            if (!this.anims.isPlaying) {
                this.play('idle');
            }
            
            if (this.repositioning) {
                // check if close enough to stop repositioning
                if (this.distance <= this.minReposDist) {
                    this.repositioning = false;
                    console.log("Stop repositioning");
                } else {
                    // add velocity until at position
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
                }
            }

            if (!this.repositioning) {
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.body.x = targetX - this.body.width/2;
                this.body.y = targetY - this.body.height/2;
            }

        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
        }

        // animation handling
        if (Math.abs(this.body.velocity.x) > 50 || Math.abs(this.body.velocity.y) > 50) {
            if (this.anims.getName() != 'walk') {
                this.play('walk');
            }
        } else {
            if (this.anims.getName() != 'idle' && this.repositioning) {
                this.play('idle');
            }
        }
        if (this.body.velocity.x > 0 && this.flipX == true) {
            this.flipX = false;
        } else if (this.body.velocity.x < 0 && this.flipX == false) {
            this.flipX = true;
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