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
        audio.play();
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
		            }
		            else if(matrix[i][j] == 2)
		            {
		                GrassEaterArr.push(new GrassEater(j,i));
		            }
		            else if (matrix[i][j] == 3) {
		                LionArr.push(new Lion(j, i));
		            }
		            else if (matrix[i][j] == 5) {
		                rel = new Reloader(j, i);
		            }
        		}
            }
		}
	}
}