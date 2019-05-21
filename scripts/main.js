const gameCommunicate = document.querySelector('.game-communicate');
let clickCounter = 0;

const loop = (number, callback) => {
    for (let i = 0; i < number; i++)
        callback(i);
};

HTMLElement.prototype.containAnyClass = function(...classNames){
    for (let i = 0; i < classNames.length; i++)
        if(this.classList.contains(classNames[i]))
            return true;
    return false;
};

HTMLHeadingElement.prototype.basicAnswer = function() {
    this.innerHTML = 'Zgaduj zgadula! :D';
};

HTMLHeadingElement.prototype.goodAnswer = function(clickNumber) {
    this.innerHTML = `Super! Trafiłeś za ${clickNumber} razem`;
};

HTMLHeadingElement.prototype.badAnswer = function(tooSmall) {
    this.innerHTML = tooSmall ? 
        'Za mało!':
        'Za dużo!';
};

const checkTimeDelay = (callback, alternateText = `Wyrenderowanie wszystkich elementów zajęło: `) => {
    const currTime = new Date().getTime();
    callback();
    console.log(`${alternateText}${new Date().getTime() - currTime}ms`);
};

const getRandomNumber = (maxNumber = 50) => Math.floor((Math.random() * maxNumber)) + 1;

const gameIsOver = () => document.head.hasAttribute('over');

const endGame = () => document.head.setAttribute('over', 'Ooooo yea xD');

const startGame = () => document.head.removeAttribute('over');

const resetClickCounter = () => clickCounter = 0;

const createBox = boxNumber => {
    let box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('data-number', boxNumber);
    return box;
}

const appendBox = box => {
    document.querySelector('div.box-container').appendChild(box);
}

const spawnBoxes = numberOfBoxes => {
    loop(numberOfBoxes, boxIndex => appendBox(createBox(boxIndex + 1)));
}

const removeBoxes = () => {
    document.querySelector('div.box-container').remove();
};

const appendBoxEvents = winningNumber => {
    document.querySelector('div.box-container').addEventListener('click', e => 
    {
        if(!gameIsOver())
            if(e.target.classList.contains('box') && !e.target.containAnyClass('incorrect', 'correct'))
                checkCorrectBox(e.target, winningNumber);
    });
}

const checkCorrectBox = (box, correctNumber) => {
    clickCounter++;
    if(box.getAttribute('data-number') != correctNumber)
    {
        box.classList.add('incorrect');
        gameCommunicate.badAnswer(box.getAttribute('data-number') < correctNumber);
    }
    else
    {
        box.classList.add('correct');
        gameCommunicate.goodAnswer(clickCounter);
        new Audio('https://evergames.pl/KrystianKl/metalgearsolid.mp3').play();
        endGame();
    }
}

const initiateGame = (numberOfBoxes = 71) => {
    createBoxContainer();
    spawnBoxes(numberOfBoxes);
    const winningNumber = getRandomNumber(numberOfBoxes);
    // console.log(`Wygrywającym numerkiem jest: ` + winningNumber);
    appendBoxEvents(winningNumber);
}

const createBoxContainer = () => {
    const container = document.createElement('div');
        container.classList.add('box-container');
    document.body.insertBefore(container, gameCommunicate);
}

const resetGame = (numberOfBoxes = 71) => {
    resetClickCounter();
    removeBoxes();
    startGame();
    initiateGame(numberOfBoxes);
    gameCommunicate.basicAnswer();
}

(() => {
    initiateGame();
})();