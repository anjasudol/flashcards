import { AsyncStorage } from 'react-native'
import {formatDeckResults, DECK_STORAGE_KEY} from './_DATA'

 // getDecks
 export function fetchDeckResults() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(formatDeckResults)
}


  // saveDeckTitle: take in a single title argument and add it to the decks.
  // addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 

// getDeck: take in a single id argument and return the deck associated with that id.
  export function getDeck(title){
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
      .then((deck) => {
        const item = JSON.parse(deck);
        return item[title];
      }).catch(() => console.error('No deck by that name'));
  }

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