// create a two dimentional array
const gameBoard = (() => {
    function _createArray(length) {
        const arr = new Array(length || 0);
        let i = length;
    
        if (arguments.length > 1) {
            const args = Array.prototype.slice.call(arguments, 1);
            while(i--) arr[length-1 - i] = _createArray.apply(this, args);
        }
        return arr;
    }

    const grid = (() => {
        const arr = _createArray(3, 3);
        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 3; row++) {
                arr[col][row] = (() => {
                    const gridSets = document.querySelectorAll(".grid");
                    gridSets.forEach(gridSet => {
                        if (gridSet.dataset.item == (col.toString() + row.toString())) {
                            gridSet.addEventListener('click', () => {
                                gridSet.classList.toggle('circle-sign');
                            });
                        }
                    });
                })();
                
            }
        }
        return arr;
    })();
    

    return {grid};
})();