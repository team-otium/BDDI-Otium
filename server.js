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

    // Change page
    socket.on('pageChange', (data) => {
        io.sockets.to(socket.serverId).emit('pageChange', data);
    })

    socket.on('validationQuestion', (data) => {
        socket.broadcast.to(socket.clientId).emit('validationQuestion', data);
    })

    socket.on('validationWait', (data) => {
        socket.broadcast.to(socket.clientId).emit('validationWait', data);
    })

    socket.on('validationCancel', (data) => {
        socket.broadcast.to(socket.clientId).emit('validationCancel', data);
    })

    // animation Q1
    socket.on('q1', (data) => {
        io.sockets.to(socket.clientId).emit('q1', data);
    })
  
    /****** Q2 ******/
    socket.on("q2_doigt", (data) => {
        socket.broadcast.to(socket.clientId).emit("q2_doigt", data)
    })

    // Q3
    socket.on('q3', (data) => {
        socket.broadcast.to(socket.clientId).emit('q3', data);
    })

    // Q5
    socket.on('q5_doigt', (data) => {
        socket.broadcast.to(socket.clientId).emit('q5_doigt', data);
    })
    // Q4
    socket.on('q4', (data) => {
        io.sockets.to(socket.clientId).emit('q4', data);
    })

    // Q4 select obj
    socket.on('q4-2', (data) => {
        io.sockets.to(socket.clientId).emit('q4-2', data);
    })

    // Q6
    socket.on('q6', (data) => {
        io.sockets.to(socket.clientId).emit('q6', data);
    })

    // Q7
    socket.on('q7', (data) => {
        io.sockets.to(socket.clientId).emit('q7', data);
    })

    // Univers
    socket.on('univers', (data) => {
        socket.broadcast.to(socket.clientId).emit('univers', data);
    })
});


//server.listen(process.env.PORT || 3000)

server.listen(1337)