//global game var
var N = 10
var game = createGame(N)
var ghostSpeed = 2000;
var ghostTrigger = setInterval(moveGhost, ghostSpeed, game);
var totalScore = 0; //Score is only updated upon completing a round, not incrementally.
var gameState = 0;

window.onload=function(game){

    const pelletLine = document.getElementById("pelletLine");
    renderBoard();

    const commentary = document.getElementById("commentary");
    commentary.innerHTML = "Score: " + totalScore

    //for arrow input activation / deactivation

    //Handle inputs
    window.addEventListener('keydown', event => {
        
        if (event.key == "ArrowLeft") {
            // console.log("Left key");
            if (gameState == 0){
                let size = game[2];
                moveLeft()
                renderBoard();
                commentary.innerHTML = "Score: " + totalScore
            }
        } else if (event.key == "ArrowRight") {
            // console.log("Right key");
            if (gameState == 0){
                let size = game[2];
                moveRight()
                renderBoard();
                commentary.innerHTML = "Score: " + totalScore
            }
        }

        if (pelletCount(game[0]) == 0){
            clearInterval(ghostTrigger);
            renderBoard();
            commentary.innerHTML = "YOU WIN. FINAL SCORE: " + totalScore
            gameState = 1;
            setTimeout(nextLevel, 4000)
        }
        else{
            renderBoard();
        }
    })
  }

/**
 * Creates an array representing a pacman game of size N (>= 5), and a dictionary tracking the indices of key pieces. This function is a pseudo-class basically...
 *
 * @param {*} N - size of the game board
 * @returns {{}} - game variables in an array
 */
function createGame(N){
    const pellet = "."

    // Require a minimum of 5 things to do
    if (N < 5){
        N = 5;
    }

    //Establish the pellet line
    pelletLine = new Array(N)
    var i = 0;
    while (i < N){
        pelletLine[i] = pellet
        i += 1
    }

    // Establish a dict for the key pieces and anticipated indices
    var pieces = {"C": null, "^": null, "@": null}

    for(var key in pieces) {
        let random = Math.floor(Math.random() * N)
        while (pelletLine[random] != pellet){
            random = Math.floor(Math.random() * N)
        }
        pelletLine[random] = key;
        pieces[key] = random;
    }

    //Now place a pellet where the index for the ghost is
    pelletLine[pieces["^"]] = "."
    //and place a "blank" in the index where pacman is
    pelletLine[pieces["C"]] = " "

    //We will use the dictionary info to draw the pieces over the pellet line.
    return [pelletLine, pieces, N-1]
}

function moveLeft(){
    let gameBoard = game[0];
    let positions = game[1];
    let size = game[2];

    let pacPos = positions["C"];
    
    // console.log("Pacman at " + pacPos + ", looking to move left");
    let targetPos = pacPos;
    if (pacPos == 0){
        targetPos = size
    }
    else{
        targetPos -= 1
    }

    //Check if ghost is in target tile and update the target info
    let ghostPos = positions["^"];
    // console.log("Ghost at " + ghostPos);
    let activeTile = null;

    if (targetPos == ghostPos){
        activeTile = "^"
    }
    else{
        activeTile = gameBoard[targetPos]
    }

    let pellets = null;
    let render = null;

    switch(activeTile) {
        case ".":
            gameBoard[targetPos] = " " //eat the pellet on "lower layer"
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            totalScore += 1;
            game = [gameBoard, positions, size];
            break;
        case "^":
            document.getElementById("commentary").innerHTML = "GAME OVER. FINAL SCORE: " + totalScore;
            clearInterval(ghostTrigger);
            console.log("Pacman walked into a ghost at " + targetPos + ". Game over.");
            gameBoard[targetPos] = "^"
            positions["C"] = targetPos;
            game = [gameBoard, positions, size]
            gameState = 1;
            setTimeout(resetGame, 4000)
            break;
        case "@":
            gameBoard[targetPos] = " " //eat the fruit on "lower layer"
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            pellets = pelletCount(gameBoard);
            console.log("Ate a fruit. Woop.")
            game = [gameBoard, positions, size];
            break;
        default: //free space, can move through without issue
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            pellets = pelletCount(gameBoard);
            game = [gameBoard, positions, size];
            break;
    }
}

function moveRight(){
    let gameBoard = game[0];
    let positions = game[1];
    let size = game[2];

    let pacPos = positions["C"];
    
    // console.log("Pacman at " + pacPos + ", looking to move right");
    let targetPos = pacPos;
    if (pacPos == size){
        targetPos = 0
    }
    else{
        targetPos += 1
    }

    //Check if ghost is in target tile and update the target info
    let ghostPos = positions["^"];
    // console.log("Ghost at " + ghostPos);
    let activeTile = null;

    if (targetPos == ghostPos){
        activeTile = "^"
    }
    else{
        activeTile = gameBoard[targetPos]
    }

    let pellets = null;
    let render = null;

    // console.log("Target tile is " + activeTile)
    switch(activeTile) {
        case ".":
            gameBoard[targetPos] = " " //eat the pellet on "lower layer"
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            totalScore += 1;
            game = [gameBoard, positions, size];
            break;
        case "^":
            document.getElementById("commentary").innerHTML = "GAME OVER. FINAL SCORE: " + totalScore;
            clearInterval(ghostTrigger);
            console.log("Pacman walked into a ghost at " + targetPos + ". Game over.");
            gameBoard[targetPos] = "^"
            positions["C"] = targetPos;
            game = [gameBoard, positions, size]
            gameState = 1;
            setTimeout(resetGame, 4000)
            break;
        case "@":
            gameBoard[targetPos] = " " //eat the fruit on "lower layer"
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            pellets = pelletCount(gameBoard);
            console.log("Ate a fruit. Woop.")
            game = [gameBoard, positions, size];
            break;
        default: //free space, can move through without issue
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            pellets = pelletCount(gameBoard);
            game = [gameBoard, positions, size];
            break;
    }
}

function moveGhost(){

    let gameBoard = game[0];
    let positions = game[1];
    let size = game[2];

    let ghostPos = positions["^"];
    let targetPos = ghostPos
    //Decide if we'll move left or right. 0 = Left. 1 = Right.
    let coinFlip = Math.round(Math.random())

    switch(coinFlip) {
    case 0:
        targetPos -= 1;
        if (targetPos < 0){
            targetPos = size //if we move our ghost off the screen, wrap him around to the right
        }
        // console.log("Ghost moves left from " + ghostPos + " to " + targetPos)
        break;
    case 1:
        targetPos += 1;
        if (targetPos > size){
            targetPos = 0 //if we move our ghost off the screen, wrap him around to the left
        }
        // console.log("Ghost moves right from " + ghostPos + " to " + targetPos)
        break;
    default:
        // console.log("For some reason, the ghost doesn't move at all.")
        break;
    }
    
    //Check if Pacman is in target tile and update the target info
    let pacPos = positions["C"];
    // console.log("Pacman at " + pacPos);

    let activeTile = null;

    if (targetPos == pacPos){
        activeTile = "C"
    }
    else{
        activeTile = gameBoard[targetPos]
    }

    // console.log("Target tile is " + activeTile)
    switch(activeTile) {
        case "C":
            gameBoard[targetPos] = "^" //eat pacman and replace his item with a ghost
            gameBoard[pacPos] = "^" //eat pacman and replace his item with a ghost
            positions["^"] = targetPos;
            game = [gameBoard, positions, size];
            renderBoard();
            clearInterval(ghostTrigger)
            console.log("GAME OVER. PACMAN WAS CAUGHT BY THE GHOST.")
            gameState = 1;
            setTimeout(resetGame, 4000)
            break;
        default: //Any space that is not pacman can be moved through
            positions["^"] = targetPos; //Move ghost on "upper layer" 
            game = [gameBoard, positions, size];
            renderBoard();
            break;
    }
    // return game;
}


function renderBoard(){
    let gameBoard = game[0];
    let positions = game[1];
    let render = gameBoard.map((x) => x);
    render[positions["C"]] = "C"
    //and place a "blank" in the index where pacman is
    render[positions["^"]] = "^"
    if (gameState == 0){
        console.log(render)
    }
    document.getElementById("pelletLine").innerHTML = "[ " + render.join(" | ") + " ]";
}

// Returns the amount of pellets remaining in the game.
function pelletCount(){
    let gameBoard = game[0]
    let pellets = gameBoard.filter(x => x === ".").length;
    // console.log("There are " + pellets + " pellets left")
    return pellets;
}

function nextLevel(){
    if (N < 20){
        N += 2; //add some challenge and also visually see the next level:)
    }
    if (ghostSpeed > 500){
        ghostSpeed -= 250;
    }
    game = createGame(N) 
    gameState = 0;
    ghostTrigger = setInterval(moveGhost, ghostSpeed, game)
    renderBoard();
}


function resetGame(){
    N = 10;
    ghostSpeed = 2000;
    game = createGame(N) 
    gameState = 0;
    totalScore = 0;
    ghostTrigger = setInterval(moveGhost, ghostSpeed, game)
    commentary.innerHTML = "NEW GAME"
    renderBoard();
}