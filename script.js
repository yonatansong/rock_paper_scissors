
window.onload = init;
function init() {
    generateDOM();
    play();
    resetScore()
    askForPlayAgain();
}
function generateDOM() {
    if (document.querySelector(".playersCards")) document.querySelector(".playersCards").remove();
    if (document.querySelector(".botsCards")) document.querySelector(".botsCards").remove();
    const result = document.querySelector(".result");
    result.innerText = "Pick a Card!";

    const container = document.querySelector('.cards');
    const allPlayer = ["player", "bot"];
    const pieces = ["rock", "paper", "scissors"];
    for (let player of allPlayer) {
        const parentElement = document.createElement('div');
        let parentClassName = player + "sCards";
        parentElement.classList.add(parentClassName);
        for (let piece of pieces) {
            const children = document.createElement('div')
            let cardId = player + "s" + piece;
            if (player == "player") { children.innerText = piece; }
            children.id = cardId;
            parentElement.appendChild(children);
        }
        container.prepend(parentElement);
    }
}
function askForPlayAgain() {
    const playAgain = document.querySelector('.playAgain')
    playAgain.onclick = init;
}
function play() {
    const playersCards = document.querySelector(".playersCards").children;
    for (let i = 0; i < playersCards.length; i++) {
        playersCards[i].onclick = gameEngine;
    }
}
function botPick(numberOfOption) {
    let botPick = Math.floor(Math.random() * numberOfOption);
    return botPick;
}
function gameEngine(eventObj) {
    const botsCards = document.querySelector(".botsCards").children;
    let playerInput = playerShowCards(eventObj);
    let botInput = botPick(botsCards.length);
    botShowCards(botInput, botsCards)
    logic(playerInput, botInput)
}
function playerShowCards(eventObj) {
    let theCard = eventObj.target;
    const playersCards = document.querySelector(".playersCards").children;
    let playerInput;
    for (let i = 0; i < playersCards.length; i++) {
        playersCards[i].style.visibility = 'hidden';
        if (playersCards[i].id === theCard.id) {
            playerInput = i;
            theCard.style.visibility = 'visible';
            theCard.classList.add('rotateCard');
        }
    }
    return playerInput;
}
function botShowCards(botPick, botsCards) {
    for (let i = 0; i < botsCards.length; i++) {
        botsCards[i].style.visibility = 'hidden';
    }
    botsCards[botPick].style.visibility = 'visible';
    botsCards[botPick].classList.add('rotateCard');
    botsCards[botPick].innerText = botsCards[botPick].id.slice(4);
}

function logic(yourInput, botInput) {
    const result = document.querySelector(".resultSpan");
    let text;
    if (Math.abs(yourInput - botInput) > 1) {
        if (yourInput > botInput) botInput += 3;
        else yourInput += 3;
    }

    if (yourInput > botInput) {
        text = "You Win!";
        addScore(".playersScore");
    };
    if (yourInput == botInput) text = "Draw!";
    if (yourInput < botInput) {
        text = "Bot Win!";
        addScore(".botsScore");
    };
}

const addScore = (scoreElement) => {
    let theScore = document.querySelector(scoreElement).innerHTML;
    document.querySelector(scoreElement).innerHTML = parseInt(theScore) + 1;
}
function resetScore() {
    const resetButton = document.querySelector('.resetScore');
    resetButton.addEventListener('click', () => {
        for (let score of ['.playersScore', '.botsScore']) {
            document.querySelector(score).innerHTML = 0;
        }
    })
}