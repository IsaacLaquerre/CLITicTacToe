const game = require("./index.js");

var difficulty = "easy";
var difficulties = ["easy", "medium", "hard"];

var xs = ["a", "b", "c"];
var ys = ["1", "2", "3"];

module.exports = {
    start(board, chosenDifficulty) {
        difficulty = difficulties[chosenDifficulty - 1];
    },

    getNextMove(board, playerLetter) {

        switch (difficulty) {
            case "easy":
            return xs[Math.floor(Math.random() * xs.length)] + ys[Math.floor(Math.random() * ys.length)];
            case "medium":
                //Check horizontals
                for (x in board) {
                    for (y=0; y<board[x].length; y++) {
                        if (this.getFreeSlots(board[x]).length == 1) {
                            if (!board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && !board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && !board[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[x] + ys[this.getFreeSlots(board[x])[0]];
                            }else if (board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" || board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter || board[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[x] + ys[this.getFreeSlots(board[x])[0]];
                            }
                        }else break;
                    }
                }

                //Check verticals
                var ylines = [];
                for (x in board) {
                    ylines[x] = [];
                    for (y in board[x]) {
                        ylines[x][y] = board[y][x];
                    }
                }
                for (x in ylines) {
                    for (y=0; y<ylines[x].length; y++) {
                        if (this.getFreeSlots(ylines[x]).length == 1) {
                            if (!ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && !ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && !ylines[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[this.getFreeSlots(ylines[x])[0]] + ys[x];
                            }else if (ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" || ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter || ylines[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[this.getFreeSlots(ylines[x])[0]] + ys[x];
                            }
                        }else break;
                    }
                }

                //Check diagonals
                var diagonals = [];
                diagonalCoords = [];
                diagonals[0] = [];
                diagonalCoords[0] = ["c1", "b2", "a3"];
                diagonals[1] = [];
                diagonalCoords[1] = ["a1", "b2", "c3"];

                var i = 0;
                var j = 2;
                while((i<3) && (j>=0)) {
                    diagonals[0].push(board[j][i]);
                    i++;
                    j--;
                }
                var i = 0;
                var j = 0;
                while((i<3) && (j<3)) {
                    diagonals[1].push(board[j][i]);
                    i++;
                    j++;
                }

                for (i in diagonals) {
                    if (this.getFreeSlots(diagonals[i]).length == 1) {
                        if (!diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && !diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && !diagonals[i].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                            return diagonalCoords[i][this.getFreeSlots(diagonals[i])[0]];
                        }else if (diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" || diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter || diagonals[i].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                            return diagonalCoords[i][this.getFreeSlots(diagonals[i])[0]];
                        }
                    }
                }

            return xs[Math.floor(Math.random() * xs.length)] + ys[Math.floor(Math.random() * ys.length)];
            case "hard":
                return this.simulate(board, playerLetter);
            break;
        }
    },

    getOccupiedSlots(line) {
        var result = [];

        for (i in line) {
            if (line[i] != "   ") result.push(i);
        }

        return result;
    },

    getFreeSlots(line) {
        var result = [];

        for (i in line) {
            if (line[i] === "   ") result.push(i);
        }

        return result;
    },

    getDifficulty() {
        return difficulty;
    },

    simulate(board, playerLetter, possibilities) {
        if (!possibilities) possibilities = [];
        var freeSlots = [];
        var simBoards = [];

        for (x in board) {
            freeSlots[x] = [];
            for (y in this.getFreeSlots(board[x])) {
                if (y === 0 && this.getFreeSlots(board[x])[y] != 0) freeSlots[x][y] = " " + playerLetter + " ";
                else freeSlots[x][y] = this.getFreeSlots(board[x])[y];
            }
        }

        var i = 0;


        for (x in freeSlots) {
            for (y in freeSlots[x]) {
                simBoards[i] = JSON.parse(JSON.stringify(board));
                var lastBoard = JSON.parse(JSON.stringify(simBoards[i]));
                if (playerLetter === "X") simBoards[i][x][freeSlots[x][y]] = " O ";
                else simBoards[i][x][freeSlots[x][y]] = " X ";
                possibilities[i] = {
                    board: simBoards[i],
                    lastBoard: lastBoard,
                    move: x + "," + freeSlots[x][y],
                    wins: 0
                };
                i++;
            }
        }

        console.log(possibilities);

        for (p in possibilities) {
            if (possibilities[p] != undefined) {
                console.log("Checking for possibility #" + p);
                switch(this.validateSimBoard(possibilities[p].board, playerLetter)) {
                    case true:
                        console.log("Found win potential\n\n" + possibilities[p].board);
                        possibilities[p].wins++;
                        return this.simulate(possibilities[p].board, playerLetter, possibilities);
                    break;
                    case false:
                        console.log("Potential loss or tie detected. Removing last move and continuing simulation...\n\n" + possibilities[p].board)
                        //spossibilities[p].board[possibilities[p].move.split(",")[0][possibilities[p].move.split(",")[1]]] = "   ";
                        //this.simulate(possibilities[p].lastBoard, playerLetter, possibilities);
                        //delete possibilities[p];
                        return this.simulate(possibilities[p].board, playerLetter, possibilities);
                    break;
                    case "unfinished":
                        console.log("No potential wins detected. Continuing simulation...\n\n" + possibilities[p].board)
                        return this.simulate(possibilities[p].board, playerLetter, possibilities);
                    break;
                }
            }
        }

        //console.log(possibilities);

        var bestMove = {};
        bestMove.wins = 0;
        bestMove.move = xs[Math.floor(Math.random() * xs.length)] + ys[Math.floor(Math.random() * ys.length)];

        for (i in possibilities) {
            if (possibilities[i].wins > bestMove.wins) {
                bestMove.wins = possibilities[i].wins
                bestMove.move = possibilities[i].move;
            }
        }

        console.log(bestMove.move.split(",")[0].toString());
        return bestMove.move.split(",")[0].toString();
    },

    validateSimBoard(board, currentPlayer) {
        //Check horizontals
        for (x in board) {
            if (board[x][0].split(" ")[1] === currentPlayer && board[x][1].split(" ")[1] === currentPlayer && board[x][2].split(" ")[1]  === currentPlayer) {
                endMessage = "Player" + board[x][0] + "wins!";
                board[x][0] = "-" + board[x][0].split(" ")[1] + "-";
                board[x][1] = "-" + board[x][1].split(" ")[1] + "-";
                board[x][2] = "-" + board[x][2].split(" ")[1] + "-";
                
                return board[x][0].replace(/\s/g, "") != currentPlayer;
            }
        }
    
        //Check verticals
        for (x in board) {
            for (y in board[x]) {
                if (board[0][y].split(" ")[1] === currentPlayer && board[1][y].split(" ")[1] === currentPlayer && board[2][y].split(" ")[1]  === currentPlayer) {
                    endMessage = "Player" + board[x][0] + "wins!";
                    board[0][y] = "|" + board[0][y].split(" ")[1] + "|";
                    board[1][y] = "|" + board[1][y].split(" ")[1] + "|";
                    board[2][y] = "|" + board[2][y].split(" ")[1] + "|";
                    
                    return board[x][0].replace(/\s/g, "") != currentPlayer;
                }
            }
        }
    
        //Check diagonals
        if (board[0][0].split(" ")[1] === currentPlayer && board[1][1].split(" ")[1] === currentPlayer && board[2][2].split(" ")[1]  === currentPlayer) {
            endMessage = "Player" + board[0][0] + "wins!";
            board[0][0] = "\\" + board[0][0].split(" ")[1] + "\\";
            board[1][1] = "\\" + board[1][1].split(" ")[1] + "\\";
            board[2][2] = "\\" + board[2][2].split(" ")[1] + "\\";
            
            return board[0][0].replace(/\s/g, "") != currentPlayer;
        }else if (board[0][2].split(" ")[1] === currentPlayer && board[1][1].split(" ")[1] === currentPlayer && board[2][0].split(" ")[1]  === currentPlayer) {
            endMessage = "Player" + board[0][2] + "wins!";
            board[0][2] = "/" + board[0][2].split(" ")[1] + "/";
            board[1][1] = "/" + board[1][1].split(" ")[1] + "/";
            board[2][0] = "/" + board[2][0].split(" ")[1] + "/";
            
            return board[0][2].replace(/\s/g, "") != currentPlayer;
        }
    
        //Check for ties
        var tied = true;
        for (x in board) {
            for (y in board[x]) {
                if (board[x][y] === "   ") tied = false;
            }
        }
        if (tied) { 
            console.log("tie");
            return false;
        }

        return "unfinished";
    }
};