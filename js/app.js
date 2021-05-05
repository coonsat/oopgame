/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

var game;

const getDomElement = nameOfClass => {
    return document.querySelector(nameOfClass);
}

const startBtn = getDomElement("#btn__reset");
startBtn.addEventListener('click', () => {
    game = new Game()
    game.startGame();
});

const keyRows = document.querySelectorAll(".keyrow");
keyRows.forEach(row => {
    Array(row.children).forEach(key => () => {

        key.addEventListener('click', (e) => {
            game.handleInteraction(e.textContent);
        });

        key.addEventListener('keydown', e => {
            if ( e.eventComposing || (e.keyCode >= 97 && e.keyCode <= 122) ) {
                game.handleInteraction(e.textContent);
            }
        });

        key.addEventListener('keyup', e=> {
            if ( e.eventComposing || (e.keyCode >= 97 && e.keyCode <= 122) ) {
                game.handleInteraction(e.textContent);
            }
        });

    });
})
// Array(keyRows).forEach(row => {
//     Array(row.children).forEach(key => {

//         key.addEventListener('click', (e) => {
//             game.handleInteraction(e.textContent);
//         });

//         key.addEventListener('keydown', e => {
//             if ( e.eventComposing || (e.keyCode >= 97 && e.keyCode <= 122) ) {
//                 game.handleInteraction(e.textContent);
//             }
//         });

//         key.addEventListener('keyup', e=> {
//             if ( e.eventComposing || (e.keyCode >= 97 && e.keyCode <= 122) ) {
//                 game.handleInteraction(e.textContent);
//             }
//         });

//     })
// });
