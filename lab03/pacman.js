

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
        random = Math.floor(Math.random() * N)
        while (pelletLine[random] != pellet){
            random = Math.floor(Math.random() * N)
        }
        pelletLine[random] = key;
        pieces[key] = random;
    }

    return [pelletLine, pieces, N-1]
}

// Establish a game
// var size = Math.floor(Math.random() * 30);
var size = 10;
console.log("Creating game of size " + size)
game = createGame(size)
console.log(game[0])

function moveLeft(game){
    let gameBoard = game[0];
    let positions = game[1];
    let size = game[2];
    // console.log(gameBoard);
    let pacPos = positions["C"];
    targetPos = pacPos;
    // console.log("Pacman at " + pacPos + ", moving left");

    // Target tile index
    //Modify this to determine what pacman should be going for
    if (pacPos == 0){
        targetPos = size
    }
    else{
        targetPos -= 1
    }

    // Evaluate the target tile
    activeTile = gameBoard[targetPos]
    switch(activeTile) {
        case ".":
            // console.log(positions)
            // console.log(targetPos + " is a pellet");
            gameBoard[targetPos] = "C"; //eat pellet
            gameBoard[pacPos] = " "; //empty space behind
            positions["C"] = targetPos;
            console.log(gameBoard)
            // console.log(positions)
            return moveLeft([gameBoard, positions, size])
        case "^":
            gameBoard[targetPos] = "^"; //eat pellet
            gameBoard[pacPos] = " "; //empty space behind
            positions["C"] = targetPos;
            positions["^"] = targetPos;
            console.log(gameBoard)
            console.log("Pacman walked into a ghost, so game over.")
            score = (size - 1) - pelletCount(game);
            console.log("Final score: " + score)
            break;
        case "@":
            gameBoard[targetPos] = "C";
            gameBoard[pacPos] = " ";
            positions["C"] = targetPos;
            console.log(gameBoard)
            // console.log(positions)
            return moveLeft([gameBoard, positions, size])
        default: //free space, can move through without issue
            gameBoard[targetPos] = "C";
            // gameBoard[pacPos] = " ";
            positions["C"] = targetPos;
            console.log(gameBoard)
            return moveLeft([gameBoard, positions, size])
    }
}

function moveRight(game){
    let gameBoard = game[0];
    let positions = game[1];
    let size = game[2];
    let pacPos = positions["C"];
    targetPos = pacPos;

    // Target tile index
    //Modify this to determine what pacman should be going for
    if (pacPos == size){
        targetPos = 0
    }
    else{
        targetPos += 1
    }

    // Evaluate the target tile
    activeTile = gameBoard[targetPos]
    switch(activeTile) {
        case ".":
            gameBoard[targetPos] = "C"; //eat pellet
            gameBoard[pacPos] = " "; //empty space behind
            positions["C"] = targetPos;
            console.log(gameBoard)
            return moveRight([gameBoard, positions, size])
        case "^":
            console.log("Pacman walked into a ghost, so game over.")
            break;
        case "@": //Some effect of the fruit here
            gameBoard[targetPos] = "C";
            gameBoard[pacPos] = " ";
            positions["C"] = targetPos;
            console.log(gameBoard)
            return moveRight([gameBoard, positions, size])
        default:
            console.log(targetPos + " is a free space")
            break;
    }
}

function pelletCount(game){
    let pellets = game[0].filter(x => x === ".").length;
    // console.log("There are " + pellets + " pellets left")
    return pellets;
}

let pellets = pelletCount(game)

// moveLeft(game)
// moveRight(game)