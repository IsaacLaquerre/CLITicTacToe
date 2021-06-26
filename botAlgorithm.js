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
                    for (y = 0; y < board[x].length; y++) {
                        if (this.getFreeSlots(board[x]).length == 1) {
                            if (board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && board[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[x] + ys[this.getFreeSlots(board[x])[0]];
                            } else if (board[x].join(";").replace(/\s/g, "") != playerLetter + ";" + playerLetter + ";" + "" || board[x].join(";").replace(/\s/g, "") != playerLetter + ";" + "" + ";" + playerLetter || board[x].join(";").replace(/\s/g, "") != "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[x] + ys[this.getFreeSlots(board[x])[0]];
                            }
                        } else break;
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
                    for (y = 0; y < ylines[x].length; y++) {
                        if (this.getFreeSlots(ylines[x]).length == 1) {
                            if (ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && ylines[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[this.getFreeSlots(ylines[x])[0]] + ys[x];
                            } else if (ylines[x].join(";").replace(/\s/g, "") != playerLetter + ";" + playerLetter + ";" + "" || ylines[x].join(";").replace(/\s/g, "") != playerLetter + ";" + "" + ";" + playerLetter || ylines[x].join(";").replace(/\s/g, "") != "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[this.getFreeSlots(ylines[x])[0]] + ys[x];
                            }
                        } else break;
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
                while ((i < 3) && (j >= 0)) {
                    diagonals[0].push(board[j][i]);
                    i++;
                    j--;
                }
                var i = 0;
                var j = 0;
                while ((i < 3) && (j < 3)) {
                    diagonals[1].push(board[j][i]);
                    i++;
                    j++;
                }

                for (i in diagonals) {
                    if (this.getFreeSlots(diagonals[i]).length == 1) {
                        if (diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && diagonals[i].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                            return diagonalCoords[i][this.getFreeSlots(diagonals[i])[0]];
                        } else if (diagonals[i].join(";").replace(/\s/g, "") != playerLetter + ";" + playerLetter + ";" + "" || diagonals[i].join(";").replace(/\s/g, "") != playerLetter + ";" + "" + ";" + playerLetter || diagonals[i].join(";").replace(/\s/g, "") != "" + ";" + playerLetter + ";" + playerLetter) {
                            return diagonalCoords[i][this.getFreeSlots(diagonals[i])[0]];
                        }
                    }
                }

                return xs[Math.floor(Math.random() * xs.length)] + ys[Math.floor(Math.random() * ys.length)];
            case "hard":
                //Check horizontals
                for (x in board) {
                    for (y = 0; y < board[x].length; y++) {
                        if (this.getFreeSlots(board[x]).length == 1) {
                            if (!board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && !board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && !board[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[x] + ys[this.getFreeSlots(board[x])[0]];
                            } else if (board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" || board[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter || board[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[x] + ys[this.getFreeSlots(board[x])[0]];
                            }
                        } else break;
                    }
                }

                //Check verticals
                ylines = [];
                for (x in board) {
                    ylines[x] = [];
                    for (y in board[x]) {
                        ylines[x][y] = board[y][x];
                    }
                }
                for (x in ylines) {
                    for (y = 0; y < ylines[x].length; y++) {
                        if (this.getFreeSlots(ylines[x]).length == 1) {
                            if (!ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && !ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && !ylines[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[this.getFreeSlots(ylines[x])[0]] + ys[x];
                            } else if (ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" || ylines[x].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter || ylines[x].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                                return xs[this.getFreeSlots(ylines[x])[0]] + ys[x];
                            }
                        } else break;
                    }
                }

                //Check diagonals
                diagonals = [];
                diagonalCoords = [];
                diagonals[0] = [];
                diagonalCoords[0] = ["c1", "b2", "a3"];
                diagonals[1] = [];
                diagonalCoords[1] = ["a1", "b2", "c3"];

                var i = 0;
                var j = 2;
                while ((i < 3) && (j >= 0)) {
                    diagonals[0].push(board[j][i]);
                    i++;
                    j--;
                }
                var i = 0;
                var j = 0;
                while ((i < 3) && (j < 3)) {
                    diagonals[1].push(board[j][i]);
                    i++;
                    j++;
                }

                for (i in diagonals) {
                    if (this.getFreeSlots(diagonals[i]).length == 1) {
                        if (!diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" && !diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter && !diagonals[i].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                            return diagonalCoords[i][this.getFreeSlots(diagonals[i])[0]];
                        } else if (diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + playerLetter + ";" + "" || diagonals[i].join(";").replace(/\s/g, "") === playerLetter + ";" + "" + ";" + playerLetter || diagonals[i].join(";").replace(/\s/g, "") === "" + ";" + playerLetter + ";" + playerLetter) {
                            return diagonalCoords[i][this.getFreeSlots(diagonals[i])[0]];
                        }
                    }
                }

                return xs[Math.floor(Math.random() * xs.length)] + ys[Math.floor(Math.random() * ys.length)];
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
    }
};