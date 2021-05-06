/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//Sample data:
const sampleData = 
[
    "How are you",
    "I am fine",
    "It takes one to know one",
    "Howdy do",
    "!invalid a$$ay to test",
    "who art thou"
];


var game;


// Reusable functions

const getDomElement = nameOfClass => {
    return document.querySelector(nameOfClass);
}

const removeChildren = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//Set initial welcome message
const resultMessage = getDomElement('#game-over-message');
resultMessage.textContent = "Go on, give the phrase game a go ;)";

//Set event listener on start button to instantiate Game object
const startBtn = getDomElement("#btn__reset");
startBtn.addEventListener('click', () => {
    game = new Game(sampleData)
    game.startGame();
});

//Set event listener via event delegation on only allow the tags with
//a key class to be triggered
const keyboard = getDomElement('#qwerty');
keyboard.addEventListener('click', (e) => {
    if (e.target.className === "key") {
        game.handleInteraction(e.target.textContent);
    }
});

//Set event listener via keyboard press and convert all valid input to lower case
//source for composing for multi browser compatibility:
//https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
document.addEventListener('keydown', e => {
    if ( e.keyCode >= 65 && e.keyCode <= 90 ) {
        game.handleInteraction( e.key.toLowerCase() );
    }
});
