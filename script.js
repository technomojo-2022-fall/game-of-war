let deckID
const cardsContainer = document.getElementById("cards")
const newDeckButton = document.getElementById("new-deck")
const drawCardsButton = document.getElementById("draw-cards")
const message = document.getElementById("message")
const remainingText = document.getElementById("remaining-element")

function getCards() {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
	.then(res => res.json())
	.then(data => {
	  remainingText.textContent = `Cards left: ${data.remaining}`
	  deckID = data.deck_id
	})
}

newDeckButton.addEventListener("click", getCards)

drawCardsButton.addEventListener("click", () => {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
	.then(res => res.json())
	.then(data => {

	  remainingText.textContent = `Cards left: ${data.remaining}`
	  cardsContainer.children[0].innerHTML = `
		<img src = ${data.cards[0].image} class="card">
	  `
	  cardsContainer.children[1].innerHTML = `
		<img src = ${data.cards[1].image} class="card">
	  `
	  const winMessage = evaluateCardWinner(data.cards[0], data.cards[1])
	  message.textContent = winMessage

	  if (data.remaining === 0) {
		drawCardsButton.disabled = true
	  }
	})
})


function evaluateCardWinner(card1, card2) {
  const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
  const card1ValueIndex = cardValues.indexOf(card1.value)
  const card2ValueIndex = cardValues.indexOf(card2.value)

  if (card1ValueIndex > card2ValueIndex) {
	return "Card One wins!"
  } else if (card1ValueIndex < card2ValueIndex) {
	return "Card Two wins!"
  } else {
	return "War. What is it good for? Absolutely nuthin'!"
  }
}

// const oneCard = {
//   value: "8"
// }

// const twoCard = {
//   value: "JACK"
// }

// evaluateCardWinner(oneCard, twoCard)