const Grid = {
    get list() {
        return document.querySelectorAll(".grid");
    }
};

const gameBoard = (() => {
    // create a two dimentional array
    function _createArray(length) {
        const arr = new Array(length || 0);
        let i = length;
    
        if (arguments.length > 1) {
            const args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = _createArray.apply(this, args);
        }
        return arr;
    };

    const grids = (() => {
        const gridArr = _createArray(3, 3);
        return gridArr;
    })();

    // to controll the game flow base on rounds
    const _displayController = (() => {
        let _round = 1;
        function setRound() {
            let currentRound = _round;
            _round++;
            return currentRound;
        }
        function checkGame() {
            if (_round > 9) {
                for(let col of grids) {
                    for(let row of col) {
                        row = "";
                    }
                }
                _round = 1;
                alert("Game Over")
            } else {
                return false;
            }
            return true;
        }
        function resetGame() {
            Grid.list.forEach(grid => {
                grid.classList.remove("cross-sign");
                grid.classList.remove("circle-sign");
            });
            return 0;
        }
        return {setRound, checkGame, resetGame};
    })();

    function checkAction(dataItem, playerName) {
        const dataArr = dataItem.split("");
        Grid.list.forEach(grid => {
            gridClass = grid.getAttribute("class");
            if(dataItem === grid.dataset.item && !gridClass.match(/cross-sign|circle-sign/)) {
                if(_displayController.setRound() % 2) {
                    grid.classList.add("cross-sign");
                    grids[dataArr[0]][dataArr[1]] = "x"
                } else {
                    grid.classList.add("circle-sign");
                    grids[dataArr[0]][dataArr[1]] = "o"
                }
                console.log(playerName + " draw the grid " + dataItem);
            }
        });
        _displayController.checkGame();
    };

    return {checkAction};
})();


const player = {
    markGrid(name) {
        Grid.list.forEach(grid => {
            grid.addEventListener('click', () => {
                gameBoard.checkAction(grid.dataset.item, name);
            });
        });
    },
};

const player1 = player.markGrid("player1");