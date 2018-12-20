export const RECEIVE_DOCKS = 'RECEIVE_ENTRIES'
export const ADD_DOCK = 'ADD_DOCK'

export function receiveDocks (docks) {
    return {
        type: RECEIVE_DOCKS,
        docks
    }
}


export function addDocks (dock) {
    return {
        type: ADD_DOCK,
        dock
    }
}



