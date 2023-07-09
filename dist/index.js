const SnakePath = document.querySelector('.path')
const score = document.getElementById('score')
const startGame = document.getElementById('start')

let squares = []

let OurCurrentSnake = [1, 0]

let direction = 1
let width = 10
let appleIndex = 0
let ScoreCount = 0

let intervalTime = 900
let timerID = 0

function creatingGrid() {
    for (let i = 0; i < 100; ++i) {

        // Creating "square" element
        const square = document.createElement('div')

        // Add styling to the "sqaure" element
        square.classList.add('square')

        // In this whole square, "square" div
        // is distributed
        SnakePath.appendChild(square)

        // Pushing square elemet to a "squares" array
        squares.push(square)
    }
}
creatingGrid()

// 1. square[index] access the index of "squares" array at the 
// corresponding indexes.

// 2. Here OurCurrentSnake[i] refers to the element at index i.

// 3. squares[OurCurrentSnake[i]] access the element in the squares array at the index specified by snake[i]

// 4. classList adds the styling to that element.
function addingSnakeColor() {
    for (let i = 0; i < OurCurrentSnake.length; ++i) {
        squares[OurCurrentSnake[i]].classList.add('snake')
    }
}
addingSnakeColor()

OurCurrentSnake.forEach(index => squares[index].classList.add('snake'))

function move() {

    // Logic for "Game quit" when snake hits the wall
    if (
        // if snake hits top
        (OurCurrentSnake[0] - width < 0 && direction === -width) ||

        // if snake hits bottom
        (OurCurrentSnake[0] + width >= 100 && direction === width) ||

        // if snake hits left wall
        (OurCurrentSnake[0] % width === 0 && direction === -1) ||

        // if snake hits right wall
        (OurCurrentSnake[0] % width === 9 && direction === 1) ||

        // if snake overlaps itself
        // This logic is done by .classList.contains, it usually checks 
        // whether accessed elements ('snake') has CSS class or not, if 
        // CSS class applied it means, it collide to itself, if not then let go.
        (squares[OurCurrentSnake[0] + direction].classList.contains('snake'))

    )
        return clearInterval(timerID), alert('Chala ja BSDK')


    // Popping out last element of snake or it's tail
    const tail = OurCurrentSnake.pop()

    // Removing style from last element of snake
    squares[tail].classList.remove('snake')

    // Moving snake towards it's head, by adding it's first element and direction(1)
    // Let's say after it's first element is "2" and adding "1"(direction) 
    // it automatically increases to 3 and thus the process is going on
    OurCurrentSnake.unshift(OurCurrentSnake[0] + direction)

    // Adding color to the forehead of snake
    squares[OurCurrentSnake[0]].classList.add('snake')


    // Function after apple eat
    if (squares[OurCurrentSnake[0]].classList.contains('apple')) {

        // When snake eats an apple, apple gets vanished from it's index
        squares[appleIndex].classList.remove('apple')

        // Grow snake by adding class to it
        squares[tail].classList.add('snake')

        // grow our snake array
        OurCurrentSnake.push(tail)
        console.log(OurCurrentSnake)

        // Generate apple after eating
        generateApples()

        // Displays  score on the score board
        ScoreCount++;
        score.textContent = ScoreCount

        clearInterval(timerID)
        intervalTime *= 0.9
        timerID = setInterval(move, intervalTime)
    }

}
// const time = setInterval(move, 500)

document.addEventListener('keydown', function (e) {

    if (e.key === 'ArrowLeft') {
        direction = -1
    }
    else if (e.key === 'ArrowRight') {
        direction = 1
    }
    else if (e.key === 'ArrowUp') {
        // here width value = 10 or -10, because there are
        // total 100 squares and each row have 10 squares.
        direction = -width
    }
    else if (e.key === 'ArrowDown') {
        direction = width
    }

})

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * 100)
    }
    while (squares[appleIndex].classList.contains('snake')) {
        squares[appleIndex].classList.add('apple')
    }
}
generateApples()

startGame.addEventListener('click', function () {

    // Remove the snake
    OurCurrentSnake.forEach(index => squares[index].classList.remove('snake'))

    // Remove the apple
    squares[appleIndex].classList.remove('apple')

    clearInterval(timerID)
    OurCurrentSnake = [1, 0]
    intervalTime = 1000

    direction = 1
    width = 10
    ScoreCount = 0
    score.textContent = ScoreCount

    timerID = setInterval(move, intervalTime)

    // Adding snake
    OurCurrentSnake.forEach(index => squares[index].classList.add('snake'))

    // Adding apple
    generateApples()
})

// logic for buttons
const up = document.querySelector('.up')
const down = document.querySelector('.down')
const left = document.querySelector('.left')
const right = document.querySelector('.right')

up.addEventListener('click', function (e) {
    up.classList.add("animate-bounce")
    direction = -width

    setTimeout(() => {
        up.classList.remove("animate-bounce")
    }, 100);
})

down.addEventListener('click', function (e) {
    down.classList.add("animate-bounce")
    direction = width

    setTimeout(() => {
        down.classList.remove("animate-bounce")
    }, 100);
})

left.addEventListener('click', function (e) {
    left.classList.add("animate-bounce")
    direction = -1

    setTimeout(() => {
        left.classList.remove("animate-bounce")
    }, 100);
})

right.addEventListener('click', function (e) {
    right.classList.add("animate-bounce")
    direction = 1

    setTimeout(() => {
        right.classList.remove("animate-bounce")
    }, 100);

})