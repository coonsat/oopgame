/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay(){
        let phraseUl = getDomElement('#phrase').firstChild;
        this.phrase.forEach(letter => {
            let phraseLetter = document.createElement('li');
            phraseLetter.innerHTML = letter;
            phraseLetter.className = letter !== " " ? `hide letter ${letter}` : "space";
            phraseUl.append(phraseLetter);
        });
    }

    //Checks to see if the chosen letter by the  
    //player matches a letter in the phrase
    checkLetter(chosenLetter){
        return this.phrase.includes(chosenLetter);
    }

    //reveals the letter on the board that matches the player's selection
    showMatchedLetter(chosenLetter){
        let phraseUl = getDomElement('#phrase').firstChild;
        Array(phraseUl.children).forEach(letter => {
            if (chosenLetter === letter.textContent) {
                letter.className = `letter ${chosenLetter}`;
            }
        });

    }

}


