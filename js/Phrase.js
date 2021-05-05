/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay(){
        let phraseUl = getDomElement('#phrase').children[0];
        this.phrase.split('').forEach(character => {
            let phraseLetter = document.createElement('li');
            phraseLetter.innerHTML = character;
            phraseLetter.className = character !== " " ? `hide letter ${character}` : "space";
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
        const phraseLetters = document.querySelectorAll('.letter');
        phraseLetters.forEach(letter => {
            if (chosenLetter === letter.textContent) {
                letter.className = `show letter ${chosenLetter}`;
            }
        });

    }

}


