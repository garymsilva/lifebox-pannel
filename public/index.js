export default function createState() {

    const state = {
        tombamentos: 0,
        colisoes: 0
    }

    const observers = []

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(state) {
        for (const observerFunction of observers) {
            observerFunction(state)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
        notifyAll(state)
    }

    function getState() {
        return state
    }

    return {
        subscribe,
        setState,
        getState
    }

}