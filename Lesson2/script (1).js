var matrix = [];
/*var ml = 
[
    [0,0,0,6,6,6,6,6,6,6,6],
    [0,0,0,6,7,7,7,7,7,7,6],
    [0,0,6,7,7,7,7,7,7,6,0],
    [0,0,6,7,7,7,7,7,6,0,0],
    [0,6,7,7,7,7,7,6,0,0,0],
    [0,6,7,7,7,7,6,6,6,6,0],
    [6,7,7,7,7,7,7,7,7,6,0],
    [6,6,6,6,7,7,7,7,6,0,0],
    [0,0,0,6,7,7,7,6,0,0,0],
    [0,0,6,7,7,7,6,0,0,0,0],
    [0,0,6,7,7,6,0,0,0,0,0],
    [0,6,7,7,6,0,0,0,0,0,0],
    [0,6,7,6,0,0,0,0,0,0,0],
    [6,7,6,0,0,0,0,0,0,0,0],
    [6,6,0,0,0,0,0,0,0,0,0],
]*/
var GrassArr = [];
var GrassEaterArr = [];
var LionArr = [];
var side = 50;
var rel;
var audio = new Audio('Ligthning.mp3');
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
matrixGen(50, 50, 150, 15, 5);//tvery poxeluc Reloaderi meji reload functiayi mejinnel poxel
console.log(matrix);

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("#F9F22B");
            }
            else if (matrix[y][x] == 3) {
                fill("#C20808");
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
                fill("#acacac");
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
}
