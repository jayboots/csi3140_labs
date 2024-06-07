window.onload=function(){
    const pelletLine = document.getElementById("pelletLine");
  
    var gameState = "playing";
    var roundScore = 0;
    var totalScore = 0; //Score is only updated upon completing a round, not incrementally.

    let game = createGame(15)
    pelletLine.innerHTML = "[ " + renderBoard(game).join(" | ") + " ]";

    //Handle inputs
    window.addEventListener('keydown', event => {
        
        if (event.key == "ArrowLeft") {
            console.log("Left key");
            if (game != null){
                let size = game[2];
                roundScore = ((size-1) - pelletCount(game[0]));
                game = moveLeft(game)
            }
        } else if (event.key == "ArrowRight") {
            console.log("Right key");
            if (game != null){
                let size = game[2];
                roundScore = ((size-1) - pelletCount(game[0]));
                game = moveRight(game)
            }
        }

        //Handle state switches
        if (game == null){
            totalScore += roundScore;
            roundScore = 0;
            pelletLine.innerHTML = "GAME OVER.  FINAL SCORE: " + totalScore  
        }
        else if (pelletCount(game[0]) == 0){
            totalScore += roundScore;
            roundScore = 0;
            totalScore += roundScore;
            pelletLine.innerHTML = "YOU WIN. FINAL SCORE: " + totalScore
            //score only locks in once you win a round.
        }
        else{
            pelletLine.innerHTML = "[ " + renderBoard(game).join(" | ") + " ]";
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

function moveLeft(game){
    let gameBoard = game[0];
    let positions = game[1];
    let size = game[2];

    let pacPos = positions["C"];
    
    console.log("Pacman at " + pacPos + ", looking to move left");
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
            render = renderBoard(game);
            console.log(render);
            pellets = pelletCount(gameBoard);
            console.log("There are " + pellets + " pellets left")
            return [gameBoard, positions, size];
        case "^":
            console.log("Pacman walked into a ghost at " + targetPos + ". Game over.");
            pellets = pelletCount(gameBoard);
            console.log("There are " + pellets + " pellets left.")
            console.log("You ate " + ((size-1) - pellets) + " pellets.")
            console.log(gameBoard)
            return null;
        case "@":
            gameBoard[targetPos] = " " //eat the fruit on "lower layer"
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            render = renderBoard(game);
            console.log(render);
            pellets = pelletCount(gameBoard);
            console.log("Ate a fruit. Woop.")
            console.log("There are " + pellets + " pellets left")
            return [gameBoard, positions, size];
        default: //free space, can move through without issue
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            render = renderBoard(game);
            console.log(render);
            pellets = pelletCount(gameBoard);
            console.log("There are " + pellets + " pellets left")
            return [gameBoard, positions, size];
    }
}

function moveRight(game){
    let gameBoard = game[0];
    let positions = game[1];
    let size = game[2];

    let pacPos = positions["C"];
    
    console.log("Pacman at " + pacPos + ", looking to move right");
    let targetPos = pacPos;
    if (pacPos == size){
        targetPos = 0
    }
    else{
        targetPos += 1
    }

    //Check if ghost is in target tile and update the target info
    let ghostPos = positions["^"];
    console.log("Ghost at " + ghostPos);
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
            render = renderBoard(game);
            console.log(render);
            pellets = pelletCount(gameBoard);
            console.log("There are " + pellets + " pellets left")
            return [gameBoard, positions, size];
        case "^":
            console.log("Pacman walked into a ghost at " + targetPos + ". Game over.");
            pellets = pelletCount(gameBoard);
            console.log("There are " + pellets + " pellets left.")
            console.log("You ate " + ((size-1) - pellets) + " pellets.")
            console.log(gameBoard)
            return null;
        case "@":
            gameBoard[targetPos] = " " //eat the fruit on "lower layer"
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            render = renderBoard(game);
            console.log(render);
            pellets = pelletCount(gameBoard);
            console.log("Ate a fruit. Woop.")
            console.log("There are " + pellets + " pellets left")
            return [gameBoard, positions, size];
        default: //free space, can move through without issue
            positions["C"] = targetPos; //Move pacman on "upper layer" 
            render = renderBoard(game);
            console.log(render);
            pellets = pelletCount(gameBoard);
            console.log("There are " + pellets + " pellets left")
            return [gameBoard, positions, size];
    }
}

/**
 * Returns a superposition of the pieces on top of the pellet line.
 *
 * @param {*} game
 * @returns {*} render - the ghost and pacman in their proper positions within the pellet line
 */
function renderBoard(game){
    let gameBoard = game[0];
    let positions = game[1];
    
    let render = gameBoard.map((x) => x);
    render[positions["^"]] = "^"
    //and place a "blank" in the index where pacman is
    render[positions["C"]] = "C"
    return render
}

// Returns the amount of pellets remaining in the game.
function pelletCount(gameBoard){
    let pellets = gameBoard.filter(x => x === ".").length;
    // console.log("There are " + pellets + " pellets left")
    return pellets;
}