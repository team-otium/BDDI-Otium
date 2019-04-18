var app = require('express')()
var express = require('express')
var server = require('http').Server(app)

// All computer client
let computers = []

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/desktop/index.html');
    
}).get('/mobile', function(req, res){
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(__dirname + '/mobile/index.html');
})

app.use(express.static('public'))

let io = require('socket.io').listen(server)

io.sockets.on('connection', function (socket) {

    socket.emit("getRoom", {computers})

    socket.on('computerConnexion', function (id) {
        console.log(id)
        socket.serverId = id.id
        computers.push( socket.serverId.toString() )
        socket.join(socket.serverId.toString())
        socket.broadcast.emit('getRoom', {computers})
    })

    socket.on('askMobileConnexion', (code) => {
        let i = computers.indexOf( code )
        if (i > -1) {
            if (io.sockets.adapter.rooms[code].length < 2) {
                console.log(io.sockets.adapter.rooms[code].length)
                socket.clientId = code
                socket.join(code)
                io.sockets.to(code).emit('mobileConnected')
                console.log('connected')
                /** TO DO : SEND MESSAGE TO ROOM TO START THE EXP */
            } else {
                /** TO DO : ERROR MESSAGE */
            }
        }
    })

    socket.on('disconnect', () => {
        if (socket.serverId != undefined) { // Is computer
            let i = computers.indexOf( socket.serverId.toString() )
            if (i > -1) {
                socket.broadcast.to(computers[i]).emit('computerDisconnected')
                delete computers[i]
                socket.broadcast.emit('getRoom', {data: computers })
            }
        } else { // Is mobile
            socket.broadcast.to(socket.clientId).emit('mobileDisconnected')
        }
    })

    /****** Q1 ******/
    socket.on('q1', (data) => {
        io.sockets.to(socket.clientId).emit('q1', data);
    })
  
    /****** Q2 ******/
    socket.on("q2_doigt", (data) => {
        socket.broadcast.to(socket.clientId).emit("q2_doigt", data)
    })
});


server.listen(1337)