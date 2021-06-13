class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to scene
        scene.add.existing(this);
        // Add physics
        scene.physics.add.existing(this);

        // variables
        this.scene = scene;
        this.dead = false;
        this.moveSpeed = 200;
        this.diagonalMoveSpeed = Math.round(Math.sqrt(this.moveSpeed ** 2 / 2));
        this.velocityX = 0;
        this.velocityY = 0;

        // --- Setting Up Connector
        // connector Grid patterns
        this.squareFillOrder =  [31, 41, 49, 39, 30, 32, 50, 48];
        this.lineFillOrder =    [31, 49, 22, 58, 13, 67, 4, 76];
        this.strawsFillOrder =  [31, 49, 29, 33, 38, 42, 47, 51];
        // connector Grid settings
        this.gridSize = 9; // square grid = gridSize * gridSize
        this.squareSpacing = 50;
        this.lineSpacing = 30;
        this.currRotation = 0;
        this.gridAlphaOn = 0;
        this.gridAlphaOff = 0;
        // create array to store all birds in current group
        this.birdGroup = [];
        // create array of sprite positions
        this.posArray = [];
        this.playerBasePos;
        this.setupPosArray(this.squareSpacing);
        this.changeFormation("square");
        // testing grid
        this.keyG = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        this.keyM = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyN = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        this.keyB = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    }


    update() {
        this.setDepth(this.y);
        
        if(!this.dead){
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
        }

        // TEST
        if (Phaser.Input.Keyboard.JustDown(this.keyM)) {
            if (this.currFormation == "square") {
                this.changeFormation("line");
            } else if (this.currFormation == "line") {
                this.changeFormation("straws");
            } else if (this.currFormation == "straws") {
                this.changeFormation("square");
            }
        }

        if (this.keyN.isDown) {
            this.currRotation += .00008 * 180*Math.PI;
        }
        if (this.keyB.isDown) {
            this.currRotation -= .00008 * 180*Math.PI;
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyG)) {
            console.log(this.depth);
        }

        // TEST

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

        // animation handling
        if (Math.abs(this.velocityX) > 0 || Math.abs(this.velocityY) > 0) {
            if (this.anims.getName() != 'leadwalk') {
                this.play('leadwalk');
            }
        } else {
            if (this.anims.getName() != 'leadidle') {
                this.play('leadidle');
            }
        }
        if (this.body.velocity.x > 0 && this.flipX == true) {
            this.flipX = false;
        } else if (this.body.velocity.x < 0 && this.flipX == false) {
            this.flipX = true;
        }   
        // resetting velocity
        this.velocityX = 0;
        this.velocityY = 0;

        this.movePosArray();
        this.updateTutGroup();
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
                    x: j*spacing - halfSize * spacing,
                    y: i*spacing - halfSize * spacing
                }
                let currSpritePos = this.scene.add.image(basePos.x, basePos.y, 'testPosMarkers').setScale(.01);
                currSpritePos.setAlpha(this.gridAlphaOff);
                this.posArray.push({sprite: currSpritePos, basePosition: basePos});
            }
        }
    }

    movePosArray() {
        for (let i = 0; i < this.posArray.length; i++) {
            let posVec = new Phaser.Math.Vector2(   
                this.posArray[i].basePosition.x, 
                this.posArray[i].basePosition.y
            );
            posVec.rotate(this.currRotation);

            posVec.x += this.playerBasePos.x - (this.playerBasePos.x - this.x);
            posVec.y += this.playerBasePos.y - (this.playerBasePos.y - this.y);

            this.posArray[i].sprite.x = posVec.x;
            this.posArray[i].sprite.y = posVec.y;
        }
    }

    giveTargetsToBirds() {
        for (let i = 0; i < this.birdGroup.length; i++) {
            
            let xPos; 
            let yPos;
            
            if (this.currFormation == "square") {
                xPos = this.posArray[this.squareFillOrder[i]].sprite.x;
                yPos = this.posArray[this.squareFillOrder[i]].sprite.y;
            } else if (this.currFormation == "line") {
                xPos = this.posArray[this.lineFillOrder[i]].sprite.x;
                yPos = this.posArray[this.lineFillOrder[i]].sprite.y;
            } else if (this.currFormation == "straws") {
                xPos = this.posArray[this.strawsFillOrder[i]].sprite.x;
                yPos = this.posArray[this.strawsFillOrder[i]].sprite.y;   
            } else {
                console.log("ERROR - not a formation mode");
                return 0;
            }
            
            this.birdGroup[i].update(xPos,yPos);
        }
    }

    changeFormation(name) {
        // DEBUG - clear the current alphas
        for (let i = 0; i < this.posArray.length; i++) {
            this.posArray[i].sprite.setAlpha(this.gridAlphaOff);
        }

        // check alive-ness of players Tuts
        for (let i = 0; i < this.birdGroup.length; i++) {
            if (this.birdGroup[i].dead) {
                // remove the item if it's no longer active
                this.birdGroup.splice(i, 1);
                i--;
            } else {
                this.birdGroup[i].repositioning = true;
            }
        }

        if (name == "square") {
            this.setupPosArray(this.squareSpacing);
            for (let i = 0; i < this.squareFillOrder.length; i++) {
                this.posArray[this.squareFillOrder[i]].sprite.setAlpha(this.gridAlphaOn);
            }
            this.currFormation = "square";
        } else if (name == "line") {
            this.setupPosArray(this.lineSpacing);
            for (let i = 0; i < this.lineFillOrder.length; i++) {
                this.posArray[this.lineFillOrder[i]].sprite.setAlpha(this.gridAlphaOn);
            }
            this.currFormation = "line";
        } else if (name == "straws") {
            this.setupPosArray(this.squareSpacing);
            for (let i = 0; i < this.lineFillOrder.length; i++) {
                this.posArray[this.strawsFillOrder[i]].sprite.setAlpha(this.gridAlphaOn);
            }
            this.currFormation = "straws";
        } else {
            console.log("ERROR - Unknown formation name");
        }
    }

    updateTutGroup() {
        for (let i = 0; i < this.birdGroup.length; i++) {
            let xPos = 0;
            let yPos = 0;
            
            if (this.currFormation == "square") {
                xPos =  this.posArray[this.squareFillOrder[i]].sprite.x;
                yPos =  this.posArray[this.squareFillOrder[i]].sprite.y;
            } else if (this.currFormation == "line") {
                xPos =  this.posArray[this.lineFillOrder[i]].sprite.x;
                yPos =  this.posArray[this.lineFillOrder[i]].sprite.y;
            } else if (this.currFormation == "straws") {
                xPos =  this.posArray[this.strawsFillOrder[i]].sprite.x;
                yPos =  this.posArray[this.strawsFillOrder[i]].sprite.y;
            } else {
                console.log("ERROR - Not a grid formation")
            }

            if (!this.birdGroup[i].repositioning) {
                if (this.anims.getName() == 'leadwalk' && this.birdGroup[i].anims.getName() != "walk") {
                    this.birdGroup[i].play('walk');
                } else if (this.anims.getName() == 'leadidle' && this.birdGroup[i].anims.getName() != "idle") {
                    this.birdGroup[i].play('idle');
                }
            }
            
            this.birdGroup[i].update(xPos, yPos);
        }
    }
}