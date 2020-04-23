import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import createState from './index.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)
const state = createState()

state.subscribe((newState) => {
    console.log('> Sending new state to clients', newState)
    sockets.emit('update', newState)
})

app.use(express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', (req, res) => {
    console.log(`> Receiving post with body`, req.body)

    const data = req.body.data

    const newState = {
        tombamentos: data.evento.tomb,
        colisoes: data.evento.colis,
        frequencia: data.vibra.freq,
        amplitude: data.vibra.ampli,
        lat: data.localGPS.latit,
        lon: data.localGPS.longit
    }
    
    state.setState(newState)
    res.sendStatus(201)
})

app.get('/reset', (req, res) => {
    console.log('Reset data on state!')

    state.resetState()
    res.redirect('..')
})

sockets.on('connection', (socket) => {
    
    console.log(`> Client connected on Server with id: ${socket.id}`)

    socket.emit('setup', state.getState())

    socket.on('disconnect', () => {
        console.log(`> Client disconnected: ${socket.id}`)
    })
})

server.listen(process.env.PORT || 3000, () => {
    console.log('> Server listening on port 3000')
})