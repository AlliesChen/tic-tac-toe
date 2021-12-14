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
    };
    
    function recordRound(round) {
        const gridItem = Array.from(round.getGridItem());
        _gridArr[gridItem[0]][gridItem[1]] = round.getPlayer().sign;
        _checkGame(round.getPlayer());
    };

    function _checkGame(player) {
        for (let row = 0; row < 3; row++) {
            for (let pattern = 0; pattern < 4; pattern++) {
                let count = 0;
                for (let col = 2; col >= 0; col--) {
                    switch (pattern) {
                        case 0:
                            if (_gridArr[row][col] === player.sign) {
                                count++;
                            }
                            break;
                        case 1:
                            if (_gridArr[col][row] === player.sign) {
                                count++;
                            }
                            break;
                        case 2:
                            if (_gridArr[col][col] === player.sign) {
                                count++;
                            }
                            break;
                        default:
                            if (_gridArr[2 - col][col] === player.sign) {
                                count++;
                            }
                    }
                }
                if (count === 3) {
                    announceBlock.classList.remove("blank");
                    announceResult.textContent = "Winner"
                    announceName.textContent = player.playerInput();
                    roundInfo.classList.add("blank");
                    return 0;
                }
            }
        }
        if(DisplayController.checkGame()) {
            announceBlock.classList.remove("blank");
            announceResult.textContent = "Tie!"
            roundInfo.classList.add("blank");
        }
        return 0; 
    }
    
    return {recordRound};
})();

// to controll the game flow base on rounds
const DisplayController = (() => {
    let _round = 0;
    const _grids =  document.querySelectorAll(".grid");
    const gameStartBtn = document.getElementById("gameStartBtn");
    const playStart = document.getElementById("playStart");
    const roundInfo = document.getElementById("roundInfo");
    const playerName = document.getElementById("playerName");
    const player1 = Object.assign(Player("player1"), {sign: "x"});
    const player2 = Object.assign(Player("player2"), {sign: "o"});

    const handler = function(e) {
        GameBoard.recordRound(_roundCheck(e.target));
    };

    gameStartBtn.addEventListener("click", () => {
        _grids.forEach(grid => {
            grid.addEventListener("click", handler);
        });
        playerName.textContent = player1.playerInput();
        playStart.classList.add("blank");
        roundInfo.classList.remove("blank");
    });

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
        _round = 0;
        playStart.classList.remove("blank");
        return 0
    }
    
    return {checkGame, resetGame};
})();