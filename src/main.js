let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [load, level1, level2],
}

//define game
let game = new Phaser.Game(config);