/**
 * Creates an array representing a pacman game of size N (>= 5).
 *
 * @param {Number} N - Any integer number.
 * @returns {String[]} pelletLine - an array of characters containing
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

    const gameElements = new Array("C", "^", "@")

    i = 0;
    while (i < gameElements.length){
        // console.log(gameElements[i])
        random = Math.floor(Math.random() * N)
        while (pelletLine[random] != pellet){
            random = Math.floor(Math.random() * N)
        }
        pelletLine[random] = gameElements[i];
        i += 1
    }

    // console.log(random)
    return pelletLine
}

console.log(createGame(10))