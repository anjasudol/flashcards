import { AsyncStorage } from 'react-native'
import {formatDeckResults, DECK_STORAGE_KEY} from './_DATA'

 // getDecks
 export function fetchDeckResults() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(formatDeckResults)
}


 // getDecks: return all of the decks along with their titles, questions, and answers.
  // getDeck: take in a single id argument and return the deck associated with that id.
  // saveDeckTitle: take in a single title argument and add it to the decks.
  // addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 


