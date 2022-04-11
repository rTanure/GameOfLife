const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

const minimumPixelSize = 20
const fps = 5

// Game Colors
const color = {
    'true': 'red',
    'false': 'red',
    'line': 'black'
}

let pixelSize // Size of each pixel in game

// Each pixel will have in canvas
let gameWidth
let gameHeight

// Space left on the sides
let horizontalAcress
let verticalRest

// Full size of the windows
let windowWidth
let windowHeight

// State of each pixel in game
let pixelState = []



// PIXEL ARRAY FUNCTIONS



// Careate a defalt array with each pixel
function resetPixelArray(){
    pixelState = []
    for(c = 0; c < gameHeight; c++){
        for(e=0; e < gameWidth; e++){
            pixelState.push( {
                'x': e + 1,
                'y': c + 1,
                'state': false,
                'neighbors': 0
            })
        }
    }
}

// Change the hover pixel state to true
function setGameState(x, y){
    // x and y = pixel coordinate
    let pixelId = ((y - 1) * gameWidth) + x - 1
    if(pixelState[pixelId] != true) {
        pixelState[pixelId].state = true
    } 
}



// SET GAME SIZES



// Calc the empty space around canvas
function getRestOfCanvas() { 
    horizontalAcress = (windowWidth - (minimumPixelSize * gameWidth)) / gameWidth
    verticalRest = (windowHeight - (minimumPixelSize * gameHeight)) / gameHeight
}

// Calculate a new pixel size adding the empty space around canvas
function getPixelSize() { 
    pixelSize = minimumPixelSize + horizontalAcress
}

// Get a window size
function getWindowSize() { 
    windowWidth = (window.innerWidth)
    windowHeight = (window.innerHeight)
}

// get how may pixels will have in vertical and horizontal
function setGameSize() { 
    gameWidth = Math.floor(windowWidth / minimumPixelSize)
    gameHeight = Math.floor(windowHeight / minimumPixelSize)
}

// Calc the canvas size in pixel according the pixel siza and the number of pixels
function setCanvasSize() { 
    canvas.width = gameWidth * pixelSize
    canvas.height = gameHeight * pixelSize
}



// GAME RULES CONFIGURATION



// Calculate the number of neighbors
function calcNeighbors(){
    for(c = 0 ; c < pixelState.length; c++){
        pixelState[c].neighbors = 0
        // top left
        if(pixelState[c].x -1 > 0 && pixelState[c].y -1 > 0){
            if(pixelState[c-gameWidth -1 ].state === true){
                pixelState[c].neighbors ++
            }
        }
        // Top
        if(pixelState[c].y -1 > 0){
            if(pixelState[c - gameWidth].state === true){
                pixelState[c].neighbors ++
            }
        }
        // top right
        if(pixelState[c].x + 1 <= gameWidth && pixelState[c].y -1 > 0) {
            if(pixelState[c - gameWidth + 1].state === true){
                pixelState[c].neighbors ++
            }
        }
        // right
        if(pixelState[c].x + 1 <= gameWidth){
            if(pixelState[c + 1].state === true){
                pixelState[c].neighbors ++
            }
        }
        // bottom right
        if(pixelState[c].y + 1 <= gameHeight && pixelState[c].x + 1 <= gameWidth) {
            if(pixelState[c + gameWidth + 1].state == true){
                pixelState[c].neighbors ++ 
            }
        }
        // bottom
        if(pixelState[c].y + 1 <= gameHeight) {
            if(pixelState[c + gameWidth].state == true){
                pixelState[c].neighbors ++ 
            }
        }
        // bottom left
        if(pixelState[c].y + 1 <= gameHeight && pixelState[c].x + 1 <= gameWidth) {
            if(pixelState[c + gameWidth-1].state == true){
                pixelState[c].neighbors ++ 
            }
        }
        //left
        if(pixelState[c].x -1 > 0){
            if(pixelState[c-1].state === true){
                pixelState[c].neighbors ++
            }
        }
    }
}

// Execute the game rules according to the number of neighbors
function executeGameRules() {
    for(c=0; c < pixelState.length; c++){
        if(pixelState[c].neighbors < 2 && pixelState[c].state === true){
            pixelState[c].state = false
        } 
        if(pixelState[c].neighbors > 3 && pixelState[c].state === true){
            pixelState[c].state = false
        } 
        if(pixelState[c].neighbors == 3 && pixelState[c].state === false){
            pixelState[c].state = true
        } 
        if(pixelState[c].state === true){
            if(pixelState[c].neighbors == 2 || pixelState[c].neighbors == 3){
                pixelState[c].state = true
            }
        } 
    }
    // true < 2 neighbor == false
    // true > 3 neighbor == false
    // false = 3 neighbor == true
    // true = 2 or 3 neighbor == true
}



// GET MOUSE POSITION



// get the pixel of mouse position
function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect()
    return {
        'x': evt.clientX - rect.left,
        'y': evt.clientY - rect.top 
    }
}

// transform a pixel position in coordinates 
function getMouseCoord(e) {
    let x 
    let y
    let position = getMousePos(e)
    //X
    for(let c=1; c<=gameHeight; c++){
        let pixel = c * pixelSize
        if (position.y < pixel && position.y > pixel - pixelSize) {
            y = c
        }
    }
    //Y
    for(let c=1; c<=gameWidth; c++) {
        let pixel = c * pixelSize
        if(position.x < pixel && position.x > pixel - pixelSize) {
            x = c
        }
    }
    if(x != undefined && y != undefined) {
        setGameState(x, y)
    }
    draw()
}
canvas.addEventListener('mousemove', getMouseCoord)



// RESET GAME CONFIGURATIONS



// Reset game when window is resized
window.onresize = ()=>{
    resetGame()
}

// Function that reset game and calculate size
function resetGame() {
    getWindowSize()
    setGameSize()
    resetPixelArray()
    getRestOfCanvas()
    getPixelSize()
    setCanvasSize()
    drawLines()
}
resetGame()



// CALCULATE NEW FRAME



function calculate() {
    calcNeighbors()
    executeGameRules()
}



// DRAW GAME



// Set canvas attributes when window load
function setCanvasAttributes() {
    canvas.style.background = color.false
    canvas.style.borderColor = color.line
}
setCanvasAttributes()

// Clear the canvas
function resetCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// Draw horizontal and vertical lines
function drawLines() {
    //Lines
    for(c = 1; c < gameHeight; c++) {
        ctx.beginPath()
        ctx.strokeStyle = color.line
        ctx.moveTo(0, pixelSize * c)
        ctx.lineTo(gameWidth * pixelSize, pixelSize * c)
        ctx.stroke()
    }
    //Columns
    for(c = 1; c < gameWidth; c++) {
        ctx.beginPath()
        ctx.moveTo(pixelSize * c, 0)
        ctx.lineTo(pixelSize * c, pixelSize * gameHeight)
        ctx.stroke()
    }
}

// Draw a single live pixel
function drawPixel(x, y){
    ctx.beginPath()
    ctx.fillStyle = color.true
    ctx.moveTo(x*pixelSize, y*pixelSize)
    ctx.lineTo(x*pixelSize + pixelSize, y*pixelSize)
    ctx.lineTo(x*pixelSize + pixelSize, y*pixelSize + pixelSize)
    ctx.lineTo(x*pixelSize, y*pixelSize + pixelSize)
    ctx.lineTo(x*pixelSize, y*pixelSize)
    ctx.fill()
}

// Map the position of each live pivel
function mapPixels() {
    for(c=0; c < pixelState.length; c++) {
        if(pixelState[c].state === true){
            drawPixel(pixelState[c].x -1 , pixelState[c].y - 1)
        }
    }
}

// Set of functions that draw in canvas
function draw() {
    resetCanvas()
    mapPixels()
    drawLines()
}



// UPDATE GAME



setInterval(()=>{
    calculate()
    draw()
}, 1000/fps)