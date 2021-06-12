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
        // connector Grid patterns
        this.squareFillOrder =  [31, 41, 49, 39, 30, 32, 50, 48];
        this.lineFillOrder =    [31, 49, 22, 58, 13, 67, 4, 76];
        // connector Grid settings
        this.gridSize = 9; // square grid = gridSize * gridSize
        this.squareSpacing = 50;
        this.lineSpacing = 15;
        // create array of sprite positions
        this.posArray = [];
        this.playerBasePos;
        this.setupPosArray(this.squareSpacing);
        this.changeFormation("square");
        // create array to store
        // testing grid
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
            if (this.currFormation == "square") {
                this.changeFormation("line");
            } else if (this.currFormation == "line") {
                this.changeFormation("square");
            }
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

        this.movePosArray();
    }

    setupPosArray(spacing) {
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
        let halfSize = Phaser.Math.CeilTo(this.gridSize/2);
        for(let i = 1; i <= this.gridSize; i++) {
            for(let j = 1; j <= this.gridSize; j++) {
                let basePos = {
                    x: j*spacing + this.playerBasePos.x - halfSize * spacing,
                    y: i*spacing + this.playerBasePos.y - halfSize * spacing
                }
                let currSpritePos = this.scene.add.image(basePos.x, basePos.y, 'testPosMarkers').setScale(.01);
                currSpritePos.setAlpha(0); // DEBUG
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

    changeFormation(name) {
        // DEBUG - clear the current alphas
        for (let i = 0; i < this.posArray.length; i++) {
            this.posArray[i].sprite.setAlpha(0);
        }

        if (name == "square") {
            this.setupPosArray(this.squareSpacing);
            for (let i = 0; i < this.squareFillOrder.length; i++) {
                this.posArray[this.squareFillOrder[i]].sprite.setAlpha(1);
            }
            this.currFormation = "square";
        } else if (name == "line") {
            this.setupPosArray(this.lineSpacing);
            for (let i = 0; i < this.lineFillOrder.length; i++) {
                this.posArray[this.lineFillOrder[i]].sprite.setAlpha(1);
            }
            this.currFormation = "line";
        } else {
            console.log("ERROR - Unknown formation name");
        }
    }
}