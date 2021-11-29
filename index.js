let deckId
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementsByClassName("card-single")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("card-number")
const computerScoreEl = document.getElementById("cpu-score")
const myScoreEl = document.getElementById("my-score")
const resetBtn = document.getElementById('reset-btn')

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `${data.remaining}`
            deckId = data.deck_id
            console.log(deckId)
            console.log(cardsContainer)
        })
}

newDeckBtn.addEventListener("click", handleClick)

function getDeck(){

    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `${data.remaining}`
            cardsContainer[0].style.backgroundImage = `url(${data.cards[0].image})`;
            cardsContainer[1].style.backgroundImage = `url(${data.cards[1].image})`;
            
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = `This round won by ${winnerText}`
            
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (computerScore > myScore) {
                    // display "The computer won the game!"
                    header.textContent = "The computer won the game!"
                } else if (myScore > computerScore) {
                    // display "You won the game!"
                    header.textContent = "You won the game!"
                } else {
                    // display "It's a tie game!"
                    header.textContent = "It's a tie game!"
                }
            }
        })
}

drawCardBtn.addEventListener("click", getDeck)

resetBtn.addEventListener('click' , reset)

function reset(){
    window.location = window.location
}

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore+=10
        computerScoreEl.textContent = `${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore+=10
        myScoreEl.textContent = `${myScore}`
        return "You win!"
    } else {
        return "War!"
    }
}

