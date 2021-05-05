/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(phrases){
        this.missed = 0;
        this.activePhrase = null;
        this.phrases = this.validatePhraseList(phrases);
    }

    validatePhraseList(phrases){
        return phrases.filter(phrase => /^[a-zA-Z]+/.test(phrase))
                      .map(phrase => new Phrase(phrase));
    }

    //The index of the active phrase is saved and used as a reference
    //This ensures that there is a single point of truth.
    getRandomPhrase(){
        return Math.floor(Math.random() * this.phrases.length);
    }
    
    //Replaces the last living heart in the list with a lost heart :(
    removeLife(){
        const lives = document.querySelectorAll(".tries");
        for (let i = lives.length - 1 ; i >= 0 ; i--) {
            if ( lives[i].firstChild.src.includes("images/liveHeart.png") ) {
                lives[i].firstChild.src = "images/lostHeart.png";
                break;
            }
        }
        this.missed += 1;
        if (this.missed === 5) this.gameOver();
    }

    //Rest gameboard to prepare for next round
    gameOver(){
        //set fireworks background of user won
        const startOverlay = getDomElement('#overlay');
        startOverlay.style.display = 'flex';

        if (this.missed === 5) {
            startOverlay.className = "start lose";
        } else {
            setInterval(() => {
                let x = Math.floor(Math.random() * 256);
                let y = Math.floor(Math.random() * 256);
                let z = Math.floor(Math.random() * 256);
                startOverlay.style.backgroundColor = `rgb(${x}, ${y}, ${z})`;
            }, 900);
            startOverlay.className = "start win";
        }

        //display result message
        const resultMessage = getDomElement('#game-over-message');
        resultMessage.textContent = this.missed === 5 ? 
                                        "Better luck next time :(" : 
                                        "Congratulations, you figured it out!";
        
        //Remove previous phrase
        const phraseUlElement = getDomElement('#phrase').children[0];
        removeChildren(phraseUlElement);

        //Reset keys to be unselected
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.className = "key";
        });

        //Reset missed to 0 and remove all lost heart images
        // this.missed = 0
        const lives = document.querySelectorAll(".tries");
        for (let i = 0 ; i < lives.length ; i++) {
            lives[i].firstChild.src = "images/liveHeart.png";
        }

    }

    //Check for win by looking at each of the li elements
    //If no hide class is found in any elements then the 
    //player has won. 
    checkForWin(){
        let hasWon = true;
        const phraseLetters = document.querySelectorAll('.letter');

        phraseLetters.forEach(letter => {
            if ( letter.className.includes("hide") ) {
                hasWon = false;
            }
        });

        return hasWon; 
    }

    //hides start screenoverlay
    //renders selected phrase to DOM structure
    startGame(){
        this.activePhrase = this.getRandomPhrase();
        const startOverlay = getDomElement('#overlay');
        startOverlay.style.display = 'none';
        this.phrases[this.activePhrase].addPhraseToDisplay();
    }

    //Checks to see if the button clicked by the player matches a letter
    //in the phrase, and then direct the game accordingly
    handleInteraction(letter){

        //Check if letter already pressed
        let keySelected;
        const keys = document.querySelectorAll('.key');
        for (let i = 0 ; i < keys.length ; i++) {
            if (keys[i].textContent === letter && keys[i].className.length > 3){
                keySelected = true;
            }   
        }

        //Ignore key press if the letter has already been pressed
        if ( !keySelected ) {
            //Check if letter guessed by user was in the phrase
            const result = this.phrases[this.activePhrase].checkLetter(letter);
            if ( result ) {
                this.phrases[this.activePhrase].showMatchedLetter(letter);
                this.checkForWin();
            } else {
                this.removeLife();
            }

            //Find key pressed among the button keys and allocate
            //either the chosen or wrong class
            const keys = document.querySelectorAll('.key');
            keys.forEach(key => {
                if ( key.textContent === letter ) {
                    key.className = result ? "key chosen" : "key wrong";
                }
            });

            
            if ( this.checkForWin() ) this.gameOver();

        }
    }
}

