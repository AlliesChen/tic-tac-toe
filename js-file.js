// create a two dimentional array
const gameBoard = (function createArray(length) {
    const arr = new Array(length || 0);
    let i = length;

    if (arguments.length > 1) {
        const args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
})(3, 3);