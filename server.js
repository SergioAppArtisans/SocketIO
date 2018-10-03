var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

user = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log("Server Running");
app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

    connections.push(socket);
    console.log('Contected: %s sockets connected', connections.length)


// Disconnect
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected %s sockets connected', connections.length)
    });
  //SendMassage
  
   socket.on('send message', function(data){ 
       console.log(data);
       io.sockets.emit('new message', {msg: data})
   });

      socket.on('send action', function(data){
       console.log(data);
       io.sockets.emit('new action', {msg: 1})
   });
});

