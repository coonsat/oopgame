/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(phrases){
        this.missed = 0;
        this.activePhrase = null;
        this.phrases = validatePhraseList(phrases);
    }

    validatePhraseList(phrases){
        const phraseObjects = phrases
                                .filter(phrase => /^[a-zA-Z]+/.test(phrase))
                                .map(phrase => new Phrase(phrase));
        return phraseObjects;
    }

    getRandomPhrase(){
        return Math.floor(Math.random() * this.phrases.length);
    }

    removeLife(){
        //Removes a heart image
        const lostLife = querySelectorAll(".tries");
        for (let i = lostLife.length ; i >= 0 ; i++) {
            if (lostlife[i].src === "images/liveHeart.png") {
                lostlife[i].src = "images/lostHeart.png";
                break;
            }
        }
        this.missed += 1;
        if (this.missed === 5) gameOver();
    }

    gameOver(){
        const startOverlay = getDomElement('#overlay');
        startOverlay.style.display = 'flex';
        startOverlay.className = this.missed < 5 ? "win" : "lose";
        const phraseElement = getDomElement('#phrase');
        
        while (phraseElement.firstChild) {
            phraseElement.removeChild(phraseElement.firstChild);
        }
    }

    //Check for win by looking at each of the li elements
    //If no hide class is found in any elements then the 
    //player has won. 
    checkForWin(){
        let hasWon = true;
        const phraseUl = getDomElement('#phrase').firstChild;
        Array(phraseUl.children).forEach(letter => {
            if (letter.className.includes("hide")) {
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

        const result = this.activePhrase.checkLetter(letter);
        if ( result ) {
            this.phrases[this.activePhrase].showMatchedLetter(letter);
            this.checkForWin();
        } else {
            this.removeLife();
        }

        const keyRows = document.querySelectorAll('.keyrow');
        Array(keyRows).forEach(row => {
            Array(keyRows.children).forEach(key => {
                key.className = result ? "key chosen" : "key wrong";
            })
        })

        //Disable the selected letter onscreen keyboard button
        //if wrong -> set wrong css clss and call removeLife();

        //If correct -> add chosen css class to letter kyboard button
        //call showMatchedLetter on the phrase and then call checkForWin*)
        if ( this.checkForWin() ) this.gameOver();
    }
}

