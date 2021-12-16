const Player = (name) => {
    function playerInput() {
        return (document.getElementById(name).value || name);
    }
    return {playerInput}
};

const GameBoard = (() => {
    // assign two dimentional array
    const _gridArr = _createArray(3, 3);
    const announceBlock = document.getElementById("announceBlock");
    const announceResult = document.getElementById("announceResult")
    const announceName = document.getElementById("announceName")

    // clean the array value
    const gameResetBtn = document.getElementById("gameResetBtn");
    gameResetBtn.addEventListener("click", () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                _gridArr[row][col] = "";
            }
        }
        DisplayController.resetGame();
        announceBlock.classList.add("blank");
    });

    // functions

    function _createArray(length) {
        const arr = new Array(length || 0);
        let i = length;
        
        if (arguments.length > 1) {
            const args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = _createArray.apply(this, args);
        }
        return arr;
    }
    
    function recordRound(round) {
        const gridItem = Array.from(round.getGridItem());
        _gridArr[gridItem[0]][gridItem[1]] = round.getPlayer().sign;
        _checkGame(round.getPlayer());
    }

    function _checkGame(player) {
        if (checkArrRow() === 3 || checkArrCol() === 3 || checkArrNegSlope() === 3 || checkArrPosSlope() === 3) {
            announceBlock.classList.remove("blank");
            announceResult.textContent = "Winner"
            announceName.textContent = player.playerInput();
            roundInfo.classList.add("blank");
            return 0;
        }
        
        if(DisplayController.checkGame()) {
            announceBlock.classList.remove("blank");
            announceResult.textContent = "Tie!"
            announceName.textContent = "";
            roundInfo.classList.add("blank");
            return 0
        }
        DisplayController.autoMove(_gridArr);
        return 0; 
    }

    function checkArrRow() {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (_gridArr[i][j] === "x") {
                    count--;
                } else if (_gridArr[i][j] === "o") {
                    count++;
                } else {
                    _gridArr[i][j] = 0;
                }
            }
            if (count === 3 || count === -3) {
                return 3;
            }
            for (let j = 0; j < 3; j++) {
                if (Number.isInteger(_gridArr[i][j])) {
                    if (count === -2) {
                        _gridArr[i][j] -= 99;
                    } else if (count === 2) {
                        _gridArr[i][j] += 999;
                    } else {
                        _gridArr[i][j] += count;
                    }
                }
            }
            count = 0;
        }
        return count;
    }

    function checkArrCol() {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (_gridArr[j][i] === "x") {
                    count--;
                } else if (_gridArr[j][i] === "o") {
                    count++;
                }
            }
            if (count === 3 || count === -3) {
                return 3;
            }
            for (let j = 0; j < 3; j++) {
                if (Number.isInteger(_gridArr[j][i])) {
                    if (count === -2) {
                        _gridArr[j][i] -= 99;
                    } else if (count === 2) {
                        _gridArr[j][i] += 999;
                    } else {
                        _gridArr[j][i] += count;
                    }
                }
            }
            count = 0;
        }
        return count;
    }

    function checkArrNegSlope() {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            if (_gridArr[i][i] === "x") {
                count--;
            } else if (_gridArr[i][i] === "o") {
                count++;
            }
        }
        if (count === 3 || count === -3) {
            return 3;
        }
        for (let i = 0; i < 3; i++) {
            if (Number.isInteger(_gridArr[i][i])) {
                if (count === -2) {
                    _gridArr[i][i] -= 99;
                } else if (count === 2) {
                    _gridArr[i][i] += 999;
                } else if (i === 1) {
                    _gridArr[i][i] += (4 * count);
                } else {
                    _gridArr[i][i] += (2 * count);
                }
            }
        }
        count = 0;
        return count;
    }

    function checkArrPosSlope() {
        let count = 0;
        for (let i = 0; i < 3; i++) {
            if (_gridArr[2-i][i] === "x") {
                count--;
            } else if (_gridArr[2-i][i] === "o") {
                count++;
            }
        }
        if (count === 3 || count === -3) {
            return 3;
        }
        for (let i = 0; i < 3; i++) {
            if (Number.isInteger(_gridArr[2-i][i])) {
                if (count === -2) {
                    _gridArr[2-i][i] -= 99;
                } else if (count === 2) {
                    _gridArr[2-i][i] += 999;
                } else {
                    _gridArr[2-i][i] += (2 * count);
                }
            }
        }
        count = 0;
        return count;
    }

    return {recordRound};
})();

// to controll the game flow base on rounds
const DisplayController = (() => {
    let _round = 0;
    let botStatus = false;
    // Select elements from DOM
    const _grids =  document.querySelectorAll(".grid");
    const gameStartBtn = document.getElementById("gameStartBtn");
    const playStart = document.getElementById("playStart");
    const roundInfo = document.getElementById("roundInfo");
    const playerName = document.getElementById("playerName");
    const botMode = document.getElementById("botMode");

    const player1 = Object.assign(Player("player1"), {sign: "x"});
    const player2 = Object.assign(Player("player2"), {sign: "o"});

    const handler = function(e) {
        GameBoard.recordRound(_roundCheck(e.target));
    };

    const _roundCheck = (grid) => {
        if (!grid.className.match(/cross-sign|circle-sign/)) {
            _round++;
            (_round % 2) ? grid.classList.add("cross-sign"): grid.classList.add("circle-sign");
        }
        
        const getGridItem = () => grid.dataset.item;
        const getPlayer = () => {
            if (_round % 2) {
                playerName.textContent = player2.playerInput();
                return player1;
            } else {
                playerName.textContent = player1.playerInput();
                return player2;
            }
        };
        return {getGridItem, getPlayer};
    };

    gameStartBtn.addEventListener("click", () => {
        _grids.forEach(grid => {
            grid.addEventListener("click", handler);
        });
        playerName.textContent = player1.playerInput();
        playStart.classList.add("blank");
        roundInfo.classList.remove("blank");
    });

    botMode.addEventListener("click", () => {
        gameStartBtn.click();
        botStatus = true;
        const hintMsg = document.getElementById("hint");
        if (player2.playerInput() !== "Unbeatable") {
            hintMsg.style.display = "block";
        } else {
            hintMsg.style.display = "none";
        }
    });

    function autoMove(arr) {
        if (botStatus === true && _round % 2 === 1) {
            if (player2.playerInput() === "Unbeatable") {
                const gridsArr = Array.from(arr);
                let MIN = 0;
                let MAX = 0;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (gridsArr[i][j] <= MIN) {
                            MIN = gridsArr[i][j];
                        }
                        if (gridsArr[i][j] >= MAX) {
                            MAX = gridsArr[i][j];
                        }
                    }
                }
                let miniMax = (MIN + MAX <= 0) ? MIN : MAX;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (gridsArr[i][j] === miniMax) {
                            for (let k = _grids.length -1; k >= 0; k--) {
                                if (_grids[k].dataset.item.match(`${i}${j}`)) {
                                    _grids[k].click();
                                }
                            }
                            return 0;
                        }
                    }
                }
            } else {
                const blankGrids = Array.from(_grids).filter(grid => !(grid.className.match(/cross-sign|circle-sign/)));
                const getRandom = ((min, max) => {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                })(0, blankGrids.length - 1);
                blankGrids[getRandom].click();
            }
        }
    }

    function checkGame() {
        if (_round > 8) {
            _round = 1;
            return true;
        } else {
            return false
        }
    }

    function resetGame() {
        _grids.forEach(grid => {
            grid.classList.remove("cross-sign");
            grid.classList.remove("circle-sign");
            grid.removeEventListener("click", handler);
        });
        botStatus = false;
        _round = 0;
        playStart.classList.remove("blank");
        return 0
    }

    return {checkGame, resetGame, autoMove};
})();