// HELPER FUNCTIONS
function add_Spikes() {
    let spike_spawns = tiles.getTilesByType(assets.tile`spike block`)
    spike_spawns.forEach((spawn) => {
        let spikeSprite = sprites.create(assets.image`spike`, SpriteKind.Enemy)
        spikeSprite.setPosition(spawn.x, spawn.y)
    })
}
function setupPlayer() {
    player_sprite = sprites.create(assets.image`player`, SpriteKind.Player)
    player_sprite.vx = 80
    player_sprite.vy = -150
    player_sprite.x = 2
    player_sprite.y = 108
    scene.cameraFollowSprite(player_sprite)
}
function jump(sprite3: Sprite) {
    grav = 400
    jump_const = -150
    sprite3.ay = jump_const
    sprite3.vy = jump_const
    while (sprite3.ay < grav) {
        sprite3.ay += Math.abs(sprite3.vy)
    }
    sprite3.ay = grav
}
function setupLevel() {
    tiles.setCurrentTilemap(tilemap`level1`)
    add_Spikes()
    //music.play(music.createSong(hex`00780004080100`), music.PlaybackMode.UntilDone)
}

// ON EVENT (BUTTON PRESSES)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    jump(player_sprite)
})

// ON OVERLAP
scene.onOverlapTile(SpriteKind.Player, assets.tile`kill block`, function (sprite, location) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`flag block`, function (sprite, location) {
    game.gameOver(true)
})

// ON UPDATE
game.onUpdate(function () {
    player_sprite.vx = 80
})

// GLOBAL VARIABLES
let jump_const = 0
let grav = 0
let player_sprite: Sprite = null

// setup and start game
setupPlayer()
setupLevel()
