
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Lion = require("./modules/Lion.js");
var Reloader = require("./modules/Reloader.js");
var Eraser = require("./modules/Eraser.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
GrassArr = [];
GrassEaterArr = [];
LionArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
lionHashiv = 0;
weather = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGen(width, heigth, grass, grasseater, lion) {
    for (let i = 0; i < heigth; i++) {
        matrix[i] = [];
        for (let j = 0; j < width; j++) {
            matrix[i][j] = 0
        }
    }
    for (let i = 0; i < width*heigth/50; i++) 
    {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * heigth);
        while (matrix[y][x] != 0) 
        {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * heigth);
        }
        matrix[y][x] = 4;
    }
    for (let i = 0; i < 1; i++) 
    {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * heigth);
        while (matrix[y][x] != 0 || (x  == 0 && y == 0)) 
        {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * heigth);
        }
        matrix[y][x] = 5;
    }

    for (let i = 0; i < grass; i++) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * heigth);
        while (matrix[y][x] != 0) {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * heigth);
        }
        matrix[y][x] = 1;
    }

    for (let i = 0; i < lion; i++) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * heigth);
        while (matrix[y][x] != 0) {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * heigth);
        }
        matrix[y][x] = 3;
    }

    for (let i = 0; i < grasseater; i++) {
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * heigth);
        while (matrix[y][x] != 0) {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * heigth);
        }
        matrix[y][x] = 2;
    }
}
matrixGen(50, 50, 150, 15, 5);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(4000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 1) {
                GrassArr.push(new Grass(j, i));
                grassHashiv++;
            }
            else if (matrix[i][j] == 2) {
                GrassEaterArr.push(new GrassEater(j, i));
                grassEaterHashiv++;
            }
            else if (matrix[i][j] == 3) {
                LionArr.push(new Lion(j, i));
                lionHashiv++;
            }
            else if (matrix[i][j] == 5) {
                rel = new Reloader(j, i);
            }
        }
    }
    er = new Eraser(0,0);
}
creatingObjects();

function ChangeWeather(m)
{
    weather++;
    weather %= 4;
}
function game() {
    rel.isreload();

    for (let i = 0; i < GrassArr.length; i++) {
        GrassArr[i].mul();
    }
    for (let i = 0; i < LionArr.length; i++) {
        LionArr[i].mul();
    }
    for(let i = 0; i < GrassEaterArr.length; i++)
    {
        GrassEaterArr[i].mul();
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        lionCounter: lionHashiv,
        rel: rel,
        weather: weather,
        er: er
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}
io.on('connection', function (socket) {
    socket.on("changeW", function (data) {
        ChangeWeather();
    });
    socket.on("MoveEraser", function (evn) {
        console.log(evn);
        if(evn == 68)
        {
            er.CC();
            er.moveRight();
        }
        if(evn == 65)
        {
            er.CC();
            er.moveLeft();
        }
        if(evn == 87)
        {
            er.CC();
            er.moveUp();
        }
        if(evn == 83)
        {
            er.CC();
            er.moveDown();
        }
    });
});


setInterval(game, 1000)
setInterval(ChangeWeather, 60000)