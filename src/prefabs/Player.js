class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        // add object to scene
        scene.add.existing(this);

        this.moveSpeed = 8;

        // --- Setting Up Connector
        this.arraySquareSize = 5; // needs to be an odd number
        this.arraySpacing = 50; // in pixels
        
        // create array of sprite positions
        this.posArray = [];
        this.playerBasePos = {
            x: x,
            y: y
        }
        let halfSize = Phaser.Math.CeilTo(this.arraySquareSize/2);
        for(let i = 1; i <= this.arraySquareSize; i++) {
            for(let j = 1; j <= this.arraySquareSize; j++) {
                let basePos = {
                    x: i*this.arraySpacing + x - halfSize * this.arraySpacing,
                    y: j*this.arraySpacing + y - halfSize * this.arraySpacing
                }
                let currSpritePos = scene.add.image(
                    basePos.x, basePos.y, 'testPosMarkers').setScale(.01);
                this.posArray.push({sprite: currSpritePos, basePosition: basePos});
            }
        }
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

        this.movePosArray();
    }

    movePosArray() {
        for (let i = 0; i < this.posArray.length; i++) {
            this.posArray[i].sprite.x = this.posArray[i].basePosition.x - (this.playerBasePos.x - this.x);
            this.posArray[i].sprite.y = this.posArray[i].basePosition.y - (this.playerBasePos.y - this.y);
        }
    }
}