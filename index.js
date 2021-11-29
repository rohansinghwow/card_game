

//Store DOM elements 
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


/** 
              1. handleClick() function 
                        - executed by default when the page loads
                        - ask the server for the array of cards 
                        - server limit is set to 52 
                        - remaing card text = server limit
                        - deck_id user for requesting card info


              2. getDeck() function 
                        - executed when drawCardBtn is clicked
                        - ask the server for the card array of length 2
                        - ?count=2 is provided in the request 
                        - card container background-image is set to card image
                        - card 1 is selected using array[0] and card 2 using array[1]


              3. determineCardWinner() functon 
                        - executed inside handClick() function
                        - myScore and computerScore is compared for winner and looser
                        - if both equals its a tie


              3. reset() functon 
                        - executed when resetBtn is clicked
                        - refreshes the page without reloding the page
                        - All the data of API is removed because of refresh
                        - custom refresh does same thing  
**/


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



function getDeck(){

    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `${data.remaining}`
            cardsContainer[0].style.backgroundImage = `url(${data.cards[0].image})`;
            cardsContainer[1].style.backgroundImage = `url(${data.cards[1].image})`;
            
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = `${winnerText}`
            
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
        return "Computer won this round !"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore+=10
        myScoreEl.textContent = `${myScore}`
        return "You won this round !"
    } else {
        return "War!"
    }
}



handleClick()