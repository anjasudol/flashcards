import { AsyncStorage } from 'react-native'
import {formatDeckResults, DECK_STORAGE_KEY} from './_DATA'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'FlashCard:Notifications'

 // getDecks
 export function fetchDeckResults() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(formatDeckResults)
}

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
  return {
    [deck_key] : {
      title: deckTitle,
      questions: [],
    }
  }
}

export function addDeckData (deckTitle) {
  const deck = formatDeck(deckTitle)
  AsyncStorage.mergeItem(DECK_STORAGE_KEY,JSON.stringify(deck))

  return deck
}

export function addQuestionData (deckTitle,question,answer) {
  const deckId =  deckTitle.replace(/\s/g,'_')
  const cardToAdd = [{
    question,
    answer,
  }]
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


//Notifications

function createNotification () {
  return {
    title: 'Start a Quiz!',
    body: ":) don't forget to make a test today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  // setting notification for next day
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      if (data === null) {
        // asking for permission to send notification
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()


              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
            else {// permission rejected or undetermined
              alert('You will not receive any notifications. Permission can be granted to app in settings.')
            }
          })
      }
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}