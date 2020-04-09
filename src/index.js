export default function createState() {

    const state = {
        tombamentos: 0,
        colisoes: 0,
        frequencia: 0.0,
        amplitude: 0.0,
        historicoCoordenadas: [

        ],
        historicoTombamentos: [

        ],
        historicoColisoes: [

        ]
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
        const tempState = {
            ...state,
            historicoColisoes: [...state.historicoColisoes],
            historicoTombamentos: [...state.historicoTombamentos],
            historicoCoordenadas: [...state.historicoCoordenadas]
        }

        if (newState.tombamentos !== undefined) {
            tempState.tombamentos = newState.tombamentos
            tempState.historicoTombamentos.push({
                datahora: Date.now()
            })
        }
        
        if (newState.colisoes !== undefined) {
            tempState.colisoes = newState.colisoes
            tempState.historicoColisoes.push({
                datahora: Date.now()
            })
        }
        
        if (newState.frequencia !== undefined) tempState.frequencia = newState.frequencia
        if (newState.amplitude !== undefined) tempState.amplitude = newState.amplitude
        
        if (newState.lat && newState.lon) tempState.historicoCoordenadas.push({
            lat: newState.lat,
            lon: newState.lon
        })

        state = tempState
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