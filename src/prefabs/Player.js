class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to scene
        scene.add.existing(this);
        // Add physics
        scene.physics.add.existing(this);

        // variables
        this.scene = scene;
        this.moveSpeed = 400;
        this.diagonalMoveSpeed = Math.round(Math.sqrt(this.moveSpeed ** 2 / 2));
        this.velocityX = 0;
        this.velocityY = 0;

        // --- Setting Up Connector
        // create array of sprite positions
        this.posArray = [];
        this.playerBasePos;
        this.setupPosArray(5, 50);

        this.keyM = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
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

        // TEST
        if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.setupPosArray(5, 30);
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

        // applying velocity
        this.setVelocityX(this.velocityX);
        this.setVelocityY(this.velocityY);

        // resetting velocity
        this.velocityX = 0;
        this.velocityY = 0;

        // limiting movement to stage size
        if (this.x >= game.config.width - this.width * playerScale/2) {
            this.x = game.config.width - this.width * playerScale/2;
        } else if (this.x <= 0 + this.width * playerScale/2) {
            this.setVelocityX(this.velocityX);
        }
        if (this.y >= game.config.height - this.height * playerScale/2) {
            this.y = game.config.height - this.height * playerScale/2;
        } else if (this.y <= 0 + this.height * playerScale/2) {
            this.y = 0 + this.height * playerScale/2;
        }

        

        this.movePosArray();
    }

    setupPosArray(arraySquareSize, spacing) {
        // Delete the old array if it exists
        for (let i = 0; i < this.posArray.length; i++) {
            this.posArray[i].sprite.destroy();
        }
        this.posArray.splice(0, this.posArray.length);
        // Create new array
        this.playerBasePos = {
            x: this.x,
            y: this.y
        }
        let halfSize = Phaser.Math.CeilTo(arraySquareSize/2);
        for(let i = 1; i <= arraySquareSize; i++) {
            for(let j = 1; j <= arraySquareSize; j++) {
                let basePos = {
                    x: i*spacing + this.playerBasePos.x - halfSize * spacing,
                    y: j*spacing + this.playerBasePos.y - halfSize * spacing
                }
                let currSpritePos = this.scene.add.image(basePos.x, basePos.y, 'testPosMarkers').setScale(.01);
                this.posArray.push({sprite: currSpritePos, basePosition: basePos});
            }
        }
    }

    movePosArray() {
        for (let i = 0; i < this.posArray.length; i++) {
            this.posArray[i].sprite.x = this.posArray[i].basePosition.x - (this.playerBasePos.x - this.x);
            this.posArray[i].sprite.y = this.posArray[i].basePosition.y - (this.playerBasePos.y - this.y);
        }
    }
}