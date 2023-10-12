namespace SpriteKind {
    export const ball = SpriteKind.create()
}
function initalize () {
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    count = 0
    for (let x = 0; x <= 9; x++) {
        for (let index = 0; index <= 4; index++) {
            mySprite = sprites.create(list[index], SpriteKind.Enemy)
            mySprite.setPosition(8 + x * 16, 20 + index * 8)
            count += 1
        }
    }
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.ball, function (sprite, otherSprite) {
    distance = otherSprite.x - sprite.x
    if (distance < -8 || distance > 8) {
        otherSprite.vx = 0 - otherSprite.vx
        otherSprite.vy = Math.abs(otherSprite.vy)
    } else {
        otherSprite.vy = 0 - otherSprite.vy
    }
    sprites.destroy(sprite)
    info.changeScoreBy(1)
    count += -1
    if (count <= 0) {
        initalize()
    }
    console.logValue("count", count)
    music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    otherSprite.vy = 0 - otherSprite.vy
    distance = otherSprite.x - sprite.x
    console.logValue("distA", distance)
    if (distance < -6 || distance > 6) {
        otherSprite.vx = 0 - Math.abs(otherSprite.vx)
    }
    otherSprite.vx = otherSprite.vx + sprite.vx / 2
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
let distance = 0
let mySprite: Sprite = null
let count = 0
let list: Image[] = []
let Bar = sprites.create(img`
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 4 4 4 4 4 4 4 4 4 4 4 4 4 1 
    1 4 2 2 2 2 2 2 2 2 2 2 2 4 1 
    1 4 4 4 4 4 4 4 4 4 4 4 4 4 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    `, SpriteKind.Player)
Bar.setPosition(80, 104)
controller.moveSprite(Bar, 100, 0)
Bar.setStayInScreen(true)
let Ball = sprites.create(img`
    . 1 1 . 
    1 1 1 1 
    1 1 1 1 
    . 1 1 . 
    `, SpriteKind.ball)
Ball.setVelocity(50, 50)
Ball.setBounceOnWall(false)
list.push(img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    7 1 1 1 1 1 1 1 1 1 1 1 1 1 7 
    7 1 1 1 1 1 1 1 1 1 1 1 1 1 7 
    7 1 1 1 1 1 1 1 1 1 1 1 1 1 7 
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
    `)
list.push(img`
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    5 1 1 1 1 1 1 1 1 1 1 1 1 1 5 
    5 1 1 1 1 1 1 1 1 1 1 1 1 1 5 
    5 1 1 1 1 1 1 1 1 1 1 1 1 1 5 
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
    `)
list.push(img`
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    9 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
    9 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
    9 1 1 1 1 1 1 1 1 1 1 1 1 1 9 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
    `)
list.push(img`
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    3 1 1 1 1 1 1 1 1 1 1 1 1 1 3 
    3 1 1 1 1 1 1 1 1 1 1 1 1 1 3 
    3 1 1 1 1 1 1 1 1 1 1 1 1 1 3 
    3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
    `)
list.push(img`
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 1 1 1 1 1 1 1 1 1 1 1 1 1 4 
    4 1 1 1 1 1 1 1 1 1 1 1 1 1 4 
    4 1 1 1 1 1 1 1 1 1 1 1 1 1 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    `)
initalize()
forever(function () {
    if (Ball.x <= 0) {
        Ball.vx = Math.abs(Ball.vx) * 0.9
    } else if (Ball.x >= 160) {
        Ball.vx = 0 - Math.abs(Ball.vx) * 0.9
    }
    if (Ball.y <= 0) {
        Ball.vy = Math.abs(Ball.vy)
    } else if (Ball.y >= 120) {
        Ball.vy = 0 - Math.abs(Ball.vy)
        info.changeScoreBy(-3)
    }
})
