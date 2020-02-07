//var Eraser = require("Er");

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
var Grass = require("./Grass.js");
var GrassEater = require("./GrassEater.js");
var Lion = require("./Lion.js");
var Eraser = require("./Eraser.js")
var random = require("./random");
module.exports = class Reloader{
	constructor(_x,_y)
	{
		this.x = _x;
		this.y = _y;
		this.isGameEnded = false;
		this.n = 0;
	}
	isreload()
	{
		let n = matrix[0][0];
		let c = true;
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[0].length; j++) {
				if(!(matrix[i][j] == n || (i == this.y && j == this.x) || matrix[i][j] == 4)/* && matrix != ml*/)
				{
					c = false
				}
			}
		}
		if (c)
		{
			this.isGameEnded = true;
		}
		if (this.isGameEnded)
		{
			this.reload();
		}
	}
	reload()
	{
        //audio.play();
		GrassArr = [];
		GrassEaterArr = [];
		LionArr = [];
		//matrix = ml;
		this.n++;
		if(this.isGameEnded && this.n >= 5)
		{
			matrixGen(50, 50, 150, 15, 5);
			for (var i = 0; i < matrix.length; i++) 
			{
        		for (var j = 0; j < matrix.length; j++) 
        		{
		            if (matrix[i][j] == 1) {
						GrassArr.push(new Grass(j, i));
						grassHashiv++;
		            }
		            else if(matrix[i][j] == 2)
		            {
						GrassEaterArr.push(new GrassEater(j,i));
						grassEaterHashiv++;
		            }
		            else if (matrix[i][j] == 3) {
						LionArr.push(new Lion(j, i));
						lionHashiv++;
		            }
		            else if (matrix[i][j] == 5) {
		                rel = new Reloader(j, i);
					}
					er = new Eraser(0,0);
        		}
            }
		}
	}
}