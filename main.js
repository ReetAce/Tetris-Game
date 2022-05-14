var grid = document.querySelector(".grid");
var squares = Array.from(document.querySelectorAll('.grid div'))
var score = document.getElementById('score')
var startBtn = document.getElementById("start-button")
var btnImg = document.getElementById("btnImg")
var count = 0
var width = 10

//arrow buttons
var leftBtn = document.getElementById("left")
var rightBtn = document.getElementById("right")
var downBtn = document.getElementById("down")
var rotateBtn = document.getElementById("rotate")


//rough code
// for (i = 0; i < 200; i++) {
//     squares[i].textContent = count
//     count++
// }

//total 20 shapes are needed
//5 ota shape lai rotate garera 20 shapes banaune



//colors
var color = [
    '#FF3353',
    '#A03EFF',
    '#33FFD1',
    '#FFE833',
    '#15e915'
]


//shapes
var lshape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
]

var zshape = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
]

var tshape = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
]
var oshape = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
]


var ishape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
]


var theShapes = [lshape, zshape, tshape, oshape, ishape]

var currentPosition = 3
var currentRotation = 0

var random = Math.floor(Math.random() * theShapes.length) //gives number between 0-4
var currentShape = theShapes[random][currentRotation]


//drawing the random shapes
function draw() {
    currentShape.forEach(function(index) {
        return squares[currentPosition + index].style.background = color[random]
    })

}
draw()

//erasing the shape
function erase() {
    currentShape.forEach(function(index) {
        return squares[currentPosition + index].style.background = ''
    })
}

function moveDown() {
    erase()
    currentPosition += width
    draw()
    stop()
}

var timer = setInterval(moveDown, 1000)


//stopping the shapes after reaching bottom
function stop() {
    if (currentShape.some(function(index) {
            return squares[currentPosition + index + width].classList.contains('freeze')
        })) {
        currentShape.forEach(function(index) {
            return squares[currentPosition + index].classList.add('freeze')
        })
        random = Math.floor(Math.random() * theShapes.length)
        currentRotation = 0
        currentShape = theShapes[random][currentRotation]
        currentPosition = 4

        draw()
        gameOver()
        addScore()
    }
}
//control the game
function control(e) {
    if (e.keyCode === 37) {
        moveleft()
    } else if (e.keyCode === 39) {
        moveRight()
    } else if (e.keyCode === 40) {
        moveDown()
    } else if (e.keyCode === 32) {
        rotate()
    }
}

window.addEventListener("keyup", control)

//controling shapes in phone
leftBtn.addEventListener("click", moveLeft)
rightBtn.addEventListener("click", moveRight)
downBtn.addEventListener("click", moveDown)
rotateBtn.addEventListener("click", rotate)


//moveleft function
function moveLeft() {
    erase()

    var leftBlockage = currentShape.some(function(index) {
        return (currentPosition + index) % width === 0
    })
    var Blockage = currentShape.some(function(index) {
        return squares[currentPosition + index - 1].classList.contains('freeze')
    })

    if (!leftBlockage && !Blockage) {
        currentPosition--
    }
    draw()


}


//moveRight function
function moveRight() {
    erase()

    var RightBlockage = currentShape.some(function(index) {
        return (currentPosition + index) % width === width - 1
    })
    var Blockage = currentShape.some(function(index) {
        return squares[currentPosition + index + 1].classList.contains('freeze')
    })

    if (!RightBlockage && !Blockage) {
        currentPosition++
    }
    draw()


}


//Rotate function
function rotate() {
    erase()
    currentRotation++
    if (currentRotation === 4) {
        currentRotation = 0

    }


    currentShape = theShapes[random][currentRotation]

    draw()
}


//add functionality to pause button
function pause() {
    if (timer) {
        clearInterval(timer)
        timer = null
        btnImg.src = "play.png"

    } else {
        draw()
        timer = setInterval(moveDown, 1000)
        btnImg.src = "pause.png"
    }
}

startBtn.addEventListener("click", pause)


//game over function
function gameOver() {
    if (currentShape.some(function(index) {
            return squares[currentPosition + index].classList.contains('freeze')
        })) {
        score.innerHTML = "Game Over"
        clearInterval(timer)
    }
}

//add score
function addScore() {
    for (var i = 0; i < 199; i += width) {
        var row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

        if (row.every(function(index) {
                return squares[index].classList.contains("freeze")
            })) {
            count += 10
            score.textContent = `score:${count}`
            row.forEach(function(index) {
                return squares[index].classList.remove("freeze"), squares[index].style.background = ''

            })
            var squareRemoved = squares.splice(i, width)
            squares = squareRemoved.concat(squares)
            squares.forEach(function(square) {
                return grid.appendChild(square)
            })
        }
    }
}