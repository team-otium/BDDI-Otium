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



server.listen(1337)