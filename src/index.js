export default function createState() {

    let state = {
        tombamentos: 0,
        colisoes: 0,
        frequencia: 0.0,
        amplitude: 0.0,
        historicoCoordenadas: [],
        historicoTombamentos: [],
        historicoColisoes: []
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

        if (newState.tombamentos > state.tombamentos) {
            state.tombamentos = newState.tombamentos
            state.historicoTombamentos.push({
                index: state.historicoTombamentos.length+1,
                type: 'tombamento',
                datetime: Date.now(),
                coordinates: {
                    lat: newState.lat,
                    lon: newState.lon
                }
            })
        }
        
        if (newState.colisoes > state.colisoes) {
            state.colisoes = newState.colisoes
            state.historicoColisoes.push({
                index: state.historicoColisoes.length+1,
                type: 'colisao',
                datetime: Date.now(),
                coordinates: {
                    lat: newState.lat,
                    lon: newState.lon
                }
            })
        }

        
        if (newState.frequencia !== undefined) state.frequencia = newState.frequencia
        if (newState.amplitude !== undefined) state.amplitude = newState.amplitude
        
        const lastCoord = state.historicoCoordenadas[state.historicoCoordenadas.length-1]
        
        if ((state.historicoCoordenadas.length == 0) || 
            (lastCoord && (newState.lat !== lastCoord.lat || newState.lon !== lastCoord.lat))
        ){            
            state.historicoCoordenadas.push({
                lat: newState.lat,
                lon: newState.lon
            })
        }

        notifyAll(state)
    }

    function resetState() {
        state = {
            tombamentos: 0,
            colisoes: 0,
            frequencia: 0.0,
            amplitude: 0.0,
            historicoTombamentos: [],
            historicoColisoes: [],
            historicoCoordenadas: []
        }
        notifyAll(state)
    }

    function getState() {
        return state
    }

    return {
        subscribe,
        setState,
        getState,
        resetState
    }

}