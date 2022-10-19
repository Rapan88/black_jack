import * as readline from 'readline';
import {stdin as input, stdout as output} from 'node:process';
import {CARDS} from "./cards.js";

const rl = readline.createInterface({input, output});

const deckOfCards = []
deckOfCards.push(CARDS.TWO)
deckOfCards.push(CARDS.THREE)
deckOfCards.push(CARDS.FOUR)
deckOfCards.push(CARDS.FIVE)
deckOfCards.push(CARDS.SIX)
deckOfCards.push(CARDS.SEVEN)
deckOfCards.push(CARDS.EIGHT)
deckOfCards.push(CARDS.NINE)
deckOfCards.push(CARDS.TEN)
deckOfCards.push(CARDS.JACK)
deckOfCards.push(CARDS.QUEEN)
deckOfCards.push(CARDS.KING)
deckOfCards.push(CARDS.ACE)

const MAX = 12
let user_cash = {cash: 100, rate: 0}
let price = 0

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function startGame() {
    askTheUser("Do you won`t play the BlackJack?(y/n)\n", checkTheAnswer)
}

function checkTheAnswer(answer) {
    if (answer === "y") {
        console.log("Your cash: " + user_cash.cash)
        askTheUser("Your rate: ", checkTheRate)
    } else {
        process.exit()
    }
}

function askTheUser(query, cb) {
    rl.question(query, function (answer) {
        cb(answer)
    });
}

function checkTheRate(rate) {
    if (isNaN(+rate)) {
        askTheUser("Your rate: ", checkTheRate)
        return;
    }
    if (rate > user_cash.cash) {
        askTheUser("Your rate is bigger then your cash: ", checkTheRate)
        return;
    }
    user_cash.rate = rate
    const id = {one: getRandomInt(MAX), two: getRandomInt(MAX)}
    console.log(getCard(id.one).show + " " + getCard(id.two).show)
    price = getCard(id.one).price + getCard(id.two).price
    console.log(price)
    askTheUser("Hit or Stand?(h/s)", hitOrStand)
}

function hitOrStand(answer) {
    if (answer === "h") {
        const card = getCard(getRandomInt(MAX))
        price += card.price
        console.log(card.show)
        console.log(price)
        if (price > 21) {
            console.log("YOU LOSE")
            user_cash.cash -= +user_cash.rate
            startGame()
        }
        askTheUser("Hit or Stand?(h/s)", hitOrStand)
    }
    if (answer === "s") {
        const card = getCard(getRandomInt(MAX))
        console.log(card.show)
        if (price < 22 && price + card.price > price && price + card.price < 22) {
            console.log("YOU LOSE")
            console.log(price + card.price)
            user_cash.cash -= +user_cash.rate
            startGame()
        } else {
            console.log("YOU WIN")
            user_cash.cash += +user_cash.rate
            startGame()
        }
    } else {
        startGame()
    }
}

function getCard(id) {
    return deckOfCards[id]
}

startGame()

