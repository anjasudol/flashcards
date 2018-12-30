import { AsyncStorage } from 'react-native'
import {formatDeckResults, DECK_STORAGE_KEY} from './_DATA'

 // getDecks
 export function fetchDeckResults() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(formatDeckResults)
}


  // getDeck: take in a single id argument and return the deck associated with that id.
  // saveDeckTitle: take in a single title argument and add it to the decks.
  // addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 


// add deck
// export function saveDeckTitle(title) {
// 	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
// 		[title]: {
//       title: title,
//       questions: []
//     }
// 	}))
// }

// // add card to deck
// export function addCardToDeck(title, card) {
//   // return AsyncStorage.removeItem(DECK_STORAGE_KEY)
//   return AsyncStorage.getItem(DECK_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[title].questions.push(card)
//       AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
//     })
// }

function formatDeck (deckTitle) {
  const deck_key =  deckTitle.replace(/\s/g,'_')
  // formatting data for DB/store
  return {
    [deck_key] : {
      title: deckTitle,
      questions: [],
    }
  }
}

export function addDeckData (deckTitle) {
  const deck = formatDeck(deckTitle)
  // adding new deck
  AsyncStorage.mergeItem(DECK_STORAGE_KEY,JSON.stringify(deck))

  return deck
}

export function addQuestionData (deckTitle,question,answer) {
  const deckId =  deckTitle.replace(/\s/g,'_')
  const cardToAdd = [{
    question,
    answer,
  }]
  // overwritting data to add question/answer
  AsyncStorage.getItem(DECK_STORAGE_KEY)
  .then((decks) => {
    const deckData = JSON.parse(decks)
    deckData[deckId] = {
      ...deckData[deckId],
      questions: deckData[deckId].questions.concat(cardToAdd)
    }
    AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(deckData))
  })
}