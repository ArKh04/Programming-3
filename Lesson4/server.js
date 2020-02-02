var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var dots = [];

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});
io.on('connection', function (socket) {
    for(var i in dots) {
      io.sockets.emit("display message", dots[i]);
      console.log(dots);
    }
    socket.on("send message", function (data) {
        dots.push(data);
        io.sockets.emit("display message", data);
    });
});
server.listen(3000);
