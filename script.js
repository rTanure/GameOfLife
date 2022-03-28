const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
const gameWidth = 20
const gameHeight = 20
const pixelSize = 30
const fps = 2
const color = {
    'true': 'white',
    'false': 'red',
    'line': 'black'
}

let pixelState = []



function setSize() {
    canvas.width = gameWidth * pixelSize
    canvas.height = gameHeight * pixelSize
}
setSize()

function startAttributes(){
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
startAttributes()


function getMousePos(evt) {
    let rect = canvas.getBoundingClientRect()
    return {
        'x': evt.clientX - rect.left,
        'y': evt.clientY - rect.top 
    }
}
function getMouseCoord(e) {
    let x 
    let y
    const position = getMousePos(e)
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
    setGameState(x, y)
    draw()
}
canvas.addEventListener('mousemove', getMouseCoord)

function setGameState(x, y){
    let pixelId = ((y - 1) * gameWidth) + x - 1
    if(pixelState[pixelId] != true) {
        pixelState[pixelId].state = true
    } 
}

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

function calculate() {
    calcNeighbors()
    executeGameRules()
}

function draw() {
    function resetCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.background = color.false
        canvas.style.borderColor = color.line
    }
    resetCanvas()
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
    function mapPixels() {
        for(c=0; c < pixelState.length; c++) {
            if(pixelState[c].state === true){
                drawPixel(pixelState[c].x -1 , pixelState[c].y - 1)
            }
        }
    }
    mapPixels()
    drawLines()
}

setInterval(()=>{
    calculate()
    draw()
}, 1000/fps)