//const e = require("express");

//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 20;

    var matrix = [];
    var rel;
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let lionCountElement = document.getElementById('lionCount');
    let weatherBlock = document.getElementById("weather");

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);
    function ChangeW()
    {
        socket.emit("changeW", 0)
    }
    function MoveEraser(evn)
    {
        socket.emit("MoveEraser", evn.which);
    }
    window.addEventListener('click', ChangeW);
    window.addEventListener('keydown', MoveEraser)
    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        rel = data.rel;
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        lionCountElement.innerText = data.lionCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side);
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        if(data.weather == 0)
        {
            weatherBlock.innerText = "Հիմա գարուն է";
        }
        else if(data.weather == 1)
        {
            weatherBlock.innerText = "Հիմա ամառ է";
        }
        else if(data.weather == 2)
        {
            weatherBlock.innerText = "Հիմա աշուն է";
        }
        else if(data.weather == 3)
        {
            weatherBlock.innerText = "Հիմա ձմեռ է";
        }
        //! Drawing and coloring RECTs
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                if(data.er.x == x && data.er.y == y)
                {
                    fill("#33FFF5")
                }
                else if (matrix[y][x] == 1) {
                    if(data.weather == 0)
                        fill("#289A28");
                    else if(data.weather == 1)
                        fill("#3C953C");
                    else if (data.weather == 2)
                        fill("#58A158");
                    else if (data.weather == 3)
                        fill("#82B682");
                }
                else if (matrix[y][x] == 2) {
                    if(data.weather == 0)
                        fill("#FDF62D");
                    else if(data.weather == 1)
                        fill("#E6E02A");
                    else if (data.weather == 2)
                        fill("#D2CC15");
                    else if (data.weather == 3)
                        fill("#BEB805");
                }
                else if (matrix[y][x] == 3) {
                    if(data.weather == 0)
                        fill("#FF4343");
                    else if(data.weather == 1)
                        fill("#EA3232");
                    else if (data.weather == 2)
                        fill("#D32222");
                    else if (data.weather == 3)
                        fill("#B70D0D");
                }
                else if (matrix[y][x] == 5) {
                    if (rel.isGameEnded) 
                        fill("#0068FF")
                    else
                        fill("#000000")
    
                }
                else if (matrix[y][x] == 4) {
                    fill("#07FF00");
                }
                else if (matrix[y][x] == 0) {
                    if(data.weather == 0)
                        fill("#838383");
                    else if(data.weather == 1)
                        fill("#B9B9B9");
                    else if (data.weather == 2)
                        fill("#D5D5D5");
                    else if (data.weather == 3)
                        fill("#F2F2F2");
                }
                /*else if (matrix[y][x] == 6) {
                    fill("#000000");
                }
                else if (matrix[y][x] == 7) {
                    fill("#F9F22B");
                }*/
                rect(x * side, y * side, side, side);
            }
        }
    }
}