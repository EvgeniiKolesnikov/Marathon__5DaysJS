const startBtn = document.querySelector('#start')
const timeList = document.querySelector('#time-list')
const screens = document.querySelectorAll('.screen')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 5
let score = 0


startBtn.addEventListener('click', (e) => {
  e.preventDefault()
  screens[0].classList.add('up')
})
timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    console.log(time);
    startGame()
  }
})

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandomCircle()
  }
})


function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span> </h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  circle.classList.add('circle')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}