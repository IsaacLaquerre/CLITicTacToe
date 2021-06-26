const readline = require("readline");
const clearConsole = require("clear-console");
const bot = require("./botAlgorithm.js");

var board = [];
var players;
var soloLetter;
var currentPlayer = "X";
var currentGame = false;

startGame();

function startGame() {

    clearConsole();

    currentGame = true;

    var endMessage = "Tie!";

    var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question("How many players?\n", function(answer) {

        if (answer != 1 && answer != 2) {
            rl.close();
            return startGame();
        }

        players = answer;

        clearConsole();

        initializeBoard();

        if (players == 1) {
            rl.question("Choose bot difficulty (1, 2, 3)\n", function(difficulty) {
                if (isNaN(difficulty) || difficulty < 1 || difficulty > 3) {
                    difficulty = 1;
                }
                soloLetter = ["X", "O"][Math.floor(Math.random() * ["X", "O"].length)];

                bot.start(board, difficulty);

                nextMove(currentPlayer);
            });
        } else {
            nextMove(currentPlayer);
        }
    });


    ///////////////////////////////
    ///////    FUNCTIONS    ///////
    ///////////////////////////////

    //Handle next move
    function nextMove(currentPlayer) {
        if (players == 1) {
            console.log("Bot difficulty: " + bot.getDifficulty() + "\n" + parseBoard());
            //console.log("Last move played - " + currentPlayer + ": " )
        } else console.log(parseBoard());
        if (currentGame) {
            if (players == 1) {
                if (currentPlayer != soloLetter) movePlayer(currentPlayer, bot.getNextMove(board, soloLetter));
                else {
                    rl.question("You are playing '" + soloLetter + "', enter your move (ex: 'a1', 'b2', ...):\n", function(move) {
                        movePlayer(currentPlayer, move.toLowerCase());
                    });
                }
            } else {
                rl.question("Player " + currentPlayer + ", enter your move (ex: 'a1', 'b2', ...):\n", function(move) {
                    movePlayer(currentPlayer, move.toLowerCase());
                });
            }
        } else {
            rl.close();
            return gameOver(endMessage);
        }
    }

    //Put the player's X/O on the player's chosen coordinates
    function movePlayer(currentPlayer, move) {
        console.log(move);
        var move = move.split("");

        if (isNaN(move[1])) {
            clearConsole();
            return nextMove(currentPlayer);
        }

        var y = parseInt(move[1]);

        if (y < 1 || y > 3) {
            clearConsole();
            return nextMove(currentPlayer);
        }

        switch (move[0]) {
            case "a":
                var x = 0;
                break;
            case "b":
                var x = 1;
                break;
            case "c":
                var x = 2;
                break;
            default:
                clearConsole();
                return nextMove(currentPlayer);
        }

        if (board[x][y - 1] != "   ") {
            clearConsole();
            return nextMove(currentPlayer);
        } else board[x][y - 1] = " " + currentPlayer + " ";


        validateBoard(currentPlayer);

        if (currentPlayer === "X") currentPlayer = "O";
        else currentPlayer = "X";

        clearConsole();

        nextMove(currentPlayer);

    }

    //Initialize board's coordinates
    function initializeBoard() {
        currentPlayer = "X";
        var boardWidth = 3;
        var boardHeight = 3;
        for (x = 0; x < boardWidth; x++) {
            board[x] = [];
            for (y = 0; y < boardHeight; y++) {
                board[x][y] = "   ";
            }
        }
    }

    //Parse the board to make it readable in console
    function parseBoard() {
        var result = "\n  1   2   3\na";
        for (x in board) {
            for (y in board[x]) {
                if ((y + 1) % 3 != 0 || (x + 1 == 1 && y + 1 == 1)) {
                    result += board[x][y] + "|";
                } else {
                    if (y == 2 && x != 2) {
                        result += board[x][y] + "\n ---|---|---\n";
                    } else {
                        result += board[x][y] + "\n";
                    }
                }

                if (x == 0 && y == 2) result += "b";
                else if (x == 1 && y == 2) result += "c"
            }
        }

        return result;
    }

    //Check if board has winning line
    function validateBoard(currentPlayer) {
        //Check horizontals
        for (x in board) {
            if (board[x][0].split(" ")[1] === currentPlayer && board[x][1].split(" ")[1] === currentPlayer && board[x][2].split(" ")[1] === currentPlayer) {
                endMessage = "Player" + board[x][0] + "wins!";
                board[x][0] = "-" + board[x][0].split(" ")[1] + "-";
                board[x][1] = "-" + board[x][1].split(" ")[1] + "-";
                board[x][2] = "-" + board[x][2].split(" ")[1] + "-";

                currentGame = false;
            }
        }

        //Check verticals
        for (x in board) {
            for (y in board[x]) {
                if (board[0][y].split(" ")[1] === currentPlayer && board[1][y].split(" ")[1] === currentPlayer && board[2][y].split(" ")[1] === currentPlayer) {
                    endMessage = "Player" + board[x][0] + "wins!";
                    board[0][y] = "|" + board[0][y].split(" ")[1] + "|";
                    board[1][y] = "|" + board[1][y].split(" ")[1] + "|";
                    board[2][y] = "|" + board[2][y].split(" ")[1] + "|";

                    currentGame = false;
                }
            }
        }

        //Check diagonals
        if (board[0][0].split(" ")[1] === currentPlayer && board[1][1].split(" ")[1] === currentPlayer && board[2][2].split(" ")[1] === currentPlayer) {
            endMessage = "Player" + board[0][0] + "wins!";
            board[0][0] = "\\" + board[0][0].split(" ")[1] + "\\";
            board[1][1] = "\\" + board[1][1].split(" ")[1] + "\\";
            board[2][2] = "\\" + board[2][2].split(" ")[1] + "\\";

            currentGame = false;
        } else if (board[0][2].split(" ")[1] === currentPlayer && board[1][1].split(" ")[1] === currentPlayer && board[2][0].split(" ")[1] === currentPlayer) {
            endMessage = "Player" + board[0][2] + "wins!";
            board[0][2] = "/" + board[0][2].split(" ")[1] + "/";
            board[1][1] = "/" + board[1][1].split(" ")[1] + "/";
            board[2][0] = "/" + board[2][0].split(" ")[1] + "/";

            currentGame = false;
        }

        //Check for ties
        var tied = true;
        for (x in board) {
            for (y in board[x]) {
                if (board[x][y] === "   ") tied = false;
            }
        }
        if (tied) {
            currentGame = false;
        }
    }

    //Handle game over
    function gameOver(endMessage) {

        currentGame = false;

        if (endMessage) console.log(endMessage);

        var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        rl.question("Would you like to play again? (Y/N)\n", function(answer) {
            switch (answer.toLowerCase()) {
                case "n":
                case "no":
                case "0":
                case "false":
                    rl.close();
                    process.exit();
                case "y":
                case "yes":
                case "1":
                case "true":
                    rl.close();
                    startGame();
                    break;
                default:
                    rl.close();
                    gameOver();
                    break;
            }
        });
    }
}


/////////////////////////////
/////// BOT FUNCTIONS ///////
/////////////////////////////

module.exports.getBoard = function() {
    return board;
}