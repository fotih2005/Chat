import express from "express";
import { Server } from "socket.io";
import path from 'path'

const app = new express()


app.use(express.static(path.join(process.cwd(), 'public')))

const server = app.listen(9090, console.log(9090))

const io = new Server(server)

io.on('connection', socket => {
    socket.on('new-user', name => {
        socket
        .broadcast
        .emit('new-user-joined', name)
    })

    socket.on('new-message', ({sender, message}) => {
        socket
        .broadcast
        .emit('new-user-message', {sender, message})
    })

    socket.on('user-typing', ({sender}) => {
        socket
        .broadcast
        .emit('typing', { sender })
    })
})