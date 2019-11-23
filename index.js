const chalk = require('chalk');
const asciiArt= require('./diagram.js');
var wordList = ["yesterday", "relation", "agriculture", "javascript", "Awkward", "Bagpipes", "Banjo", "Bungler", "Croquet",
    "Crypt", "Dwarves", "Fervid", "Fishhook", "Jukebox", "Kayak", "Memento", "Mystify", "Numbskull", "Ostracize", "Oxygen"];
var word = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
console.log('We choose the word.\n Now guess the character.');
asciiArt.wrongDefault();
var answer = [];

for (var i = 0; i < word.length; i++) {
    answer[i] = "_";
}

console.log(answer.join(" "));

let remainingLetters = word.length, count = 0;
const typedWrongChar = new Set();

process.stdin.on('data', (guess) => {
    let char = guess.toString().charAt(0);
    let flag = false;

    if (!typedWrongChar.has(char)) {
        for (var j = 0; j < word.length; j++) {
            if (word[j] === char) {
                flag = true;
                answer[j] = char;
                remainingLetters--;
                typedWrongChar.add(char);
            }
        }
    }

    if (flag === false) {
        if (true === typedWrongChar.has(char)) {
            console.log("You already typed this char. Try another one.....");
        }
        else {

            typedWrongChar.add(char);
            count++;
            console.log(chalk.bold.red("Wrong Char.\nYou have remaining " + (8-count) + " chances!!!!"));
            printHangman(count);
            
        }
    }

    if (count === 8) {
        console.log(chalk.blue("You loss the game!!!"));
        asciiArt.completeHangman();
        process.exit();
    }

    if (remainingLetters <= 0) {
        console.log(chalk.bold.green("Congrats!!!.\nYou won the Game.!.!.!.!.!.!\nWord is " + word));
        asciiArt.safe();
        process.exit();
    }

    console.log(answer.join(" "));

}
);


const printHangman=(num)=>{
    switch(num){

        case 1:
            asciiArt.wrong1();
            break;
        case 2:
            asciiArt.wrong2();
            break;
        case 3:
            asciiArt.wrong3();
            break;
        case 4:
            asciiArt.wrong4();
            break;
        case 5:
            asciiArt.wrong5();
            break;
        case 6:
            asciiArt.wrong6();
            break;
        case 7:
            asciiArt.wrong7();
            break;
        
    }
}