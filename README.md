# Tic-Tac-Toe

[Live preview](https://allieschen.github.io/tic-tac-toe/)

To test the minimax algorithm, set the player2's name to "Unbeatable".

[How the system work(flowchart)](https://drive.google.com/file/d/156GqDK-x4kFQ9bUXjeG0POJVVMCNRJtR/view?usp=sharing)

## Requirements

- [x] Starting
  - Store the gameboard as an array inside of a Gameboard object.
  - Players are also going to be stored in objects.
  - An object to control the flow of the game itself.
- [x] Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage.
- [x] Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker.
- [x] Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
- [x] Reset the game
  - Clean up the interface to allow players to put in their names
  - Include a button to start/restart the game
  - Add a display element that congratulates the winning player!
- [x] Optional: create an AI so that a player can play against the computer! 
  - Start by just getting the computer to make a random legal move.
  - Create an unbeatable AI using the minimax algorithm

For the step 2 & 3, I didn't follow the requirement as I don't want the array, which stores the game board to be touched (publicly).

## Reference

The way to built a two dimentional array is refered to [this discussion](https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938). And an [explain](https://stackoverflow.com/questions/960866/how-can-i-convert-the-arguments-object-to-an-array-in-javascript) for why it can turn `arguments` object to an array, also can be find in [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

Additionally, for the detail of methods, which are also the key to implement the algorithm:

- [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [Funciton.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

To remove the event listener, refer to [the comment](https://stackoverflow.com/questions/4950115/removeeventlistener-on-anonymous-functions-in-javascript) by Adam Heath.

For RWD(the grids and signs), refer to [this article](https://www.ucamc.com/e-learning/css/102-rwd-css-media-type).

To trigger a click action automatically, refer to [the comment](https://stackoverflow.com/questions/2381572/how-can-i-trigger-a-javascript-event-click) by instanceof me and Mosh Feu.

Color set: [Coolors](https://coolors.co/ffd9da-ea638c-89023e-30343f-1b2021)