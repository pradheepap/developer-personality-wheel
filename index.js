const sectors = [
  // { color: '#f82', label: 'Design your world' },
  // { color: '#0bf', label: 'Code fuels dreams' },
  // { color: '#fb0', label: 'Ctrl + Success' },
  // { color: '#0fb', label: 'Code the future' },
  // { color: '#b0f', label: 'Ctrl, Alt, Defeat' },
  // { color: '#f0b', label: 'Hacker at heart' },
  // { color: '#bf0', label: 'Debug, dont despair.' }

  { color: '#f82', label: '☕ Wizard', message: "Coffee Wizard: This programmer's powers are fueled by an endless supply of coffee. They can code through the night with the help of their trusty caffeine potion." },
  { color: '#0bf', label: '⏰ Procrastinator', message: "Procrastinator : This programmer excels at finding creative ways to avoid work, but somehow still manages to meet deadlines at the last minute." },
  { color: '#088F8F', label: '♾️ Optimist' , message: "Infinite Optimist: No matter how dire the situation, this programmer remains unshaken, convinced that the next line of code will fix everything."},
  { color: '#b0f', label: '🤓 Jargon Jedi' , message: "Jargon Jedi: Fluent in the most complex programming languages, they can speak in acronyms and buzzwords that sound like pure magic to the uninitiated."},
  { color: '#f0b', label: '🎯 Perfectionist', message: "Perfectionist: They refactor, revise, and review endlessly. Their code is a work of art, but deadlines are their worst enemy." },
  { color: '#00f', label: '⌨️ Drummer', message: "Keyboard Drummer: Coding to their own rhythm, they type furiously, creating a symphony of keystrokes that always produce functional code."},
  { color: '#fb0', label: '🕵🏽 Debugger', message: "Debugger Detective: Known for their uncanny ability to track down and eliminate bugs, even the sneakiest ones. Theyre like Sherlock Holmes in a terminal."}

]

const rand = (m, M) => Math.random() * (M - m) + m
const tot = sectors.length
const spinEl = document.querySelector('#spin')
const ctx = document.querySelector('#wheel').getContext('2d')
const dia = ctx.canvas.width
const rad = dia / 2
const PI = Math.PI
const TAU = 2 * PI
const arc = TAU / sectors.length
const messageEl = document.querySelector('#message')

const friction = 0.991
let angVel = 0 
let ang = 0 

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot

function drawSector(sector, i) {
  const ang = arc * i
  ctx.save()
  // COLOR
  ctx.beginPath()
  ctx.fillStyle = sector.color
  ctx.moveTo(rad, rad)
  ctx.arc(rad, rad, rad, ang, ang + arc)
  ctx.lineTo(rad, rad)
  ctx.fill()
  // TEXT
  ctx.translate(rad, rad)
  ctx.rotate(ang + arc / 2)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 20px sans-serif'
  ctx.fillText(sector.label, rad - 10, 10)
  //
  ctx.restore()
}

function rotate() {
  const sector = sectors[getIndex()]
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
  spinEl.textContent = !angVel ? 'Spin' : sector.label
  spinEl.style.background = sector.color
  messageEl.textContent= sector.message
}

function frame() {
  if (!angVel) return
  angVel *= friction 
  if (angVel < 0.002) angVel = 0 
  ang += angVel 
  ang %= TAU 
  rotate()
}

function engine() {
  frame()
  requestAnimationFrame(engine)
}

function init() {
  sectors.forEach(drawSector)
  rotate() 
  engine() 
  spinEl.addEventListener('click', () => {
    if (!angVel) angVel = rand(0.25, 0.45)
  })
}

init()
