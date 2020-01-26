class LivingCreature {

    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
}
class Grass extends LivingCreature{
    constructor(_x, _y) {
        super(_x, _y)

        this.multiply = 0;
    }
    chooseCell() {
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == 0) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    mul() {
        let newCell = random(this.chooseCell());
        if(newCell)
            this.multiply++;
        if (newCell && this.multiply >= 2 && matrix[this.y][this.x] == 1) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            GrassArr.push(new Grass(newX, newY));
            this.multiply = 0;
        }
    }
}
class GrassEater extends LivingCreature{
    constructor(_x, _y) {
        super(_x, _y)
        this.dWithBonus = [
            [this.x,this.y+2],
            [this.x,this.y+1],
            [this.x,this.y-1],
            [this.x,this.y-2],
            [this.x+1,this.y+2],
            [this.x+1,this.y+1],
            [this.x+1,this.y],
            [this.x+1,this.y-1],
            [this.x+1,this.y-2],
            [this.x+2,this.y+2],
            [this.x+2,this.y+1],
            [this.x+2,this.y],
            [this.x+2,this.y-1],
            [this.x+2,this.y-2],
            [this.x-1,this.y+2],
            [this.x-1,this.y+1],
            [this.x-1,this.y],
            [this.x-1,this.y-1],
            [this.x-1,this.y-2],
            [this.x-2,this.y+2],
            [this.x-2,this.y+1],
            [this.x-2,this.y],
            [this.x-2,this.y-1],
            [this.x-2,this.y-2]
        ]
        this.energy = 12;
        this.isBonused = false;
    }
    chooseCell(num) {
        var found = [];
        if(this.isBonused)
        {
            for (let i in this.dWithBonus) {
                let x = this.dWithBonus[i][0]
                let y = this.dWithBonus[i][1];
                if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                    if (matrix[y][x] == num) {
                        found.push([x, y]);
                    }
                }
            }
        }
        else
        {
            for (let i in this.directions) {
                let x = this.directions[i][0]
                let y = this.directions[i][1];
                if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                    if (matrix[y][x] == num) {
                        found.push([x, y]);
                    }
                }
            }
        }
        return found;
    }
    move()
    {
        let newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 0) {
            this.energy--;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
            this.dWithBonus = [
                [this.x,this.y+2],
                [this.x,this.y+1],
                [this.x,this.y-1],
                [this.x,this.y-2],
                [this.x+1,this.y+2],
                [this.x+1,this.y+1],
                [this.x+1,this.y],
                [this.x+1,this.y-1],
                [this.x+1,this.y-2],
                [this.x+2,this.y+2],
                [this.x+2,this.y+1],
                [this.x+2,this.y],
                [this.x+2,this.y-1],
                [this.x+2,this.y-2],
                [this.x-1,this.y+2],
                [this.x-1,this.y+1],
                [this.x-1,this.y],
                [this.x-1,this.y-1],
                [this.x-1,this.y-2],
                [this.x-2,this.y+2],
                [this.x-2,this.y+1],
                [this.x-2,this.y],
                [this.x-2,this.y-1],
                [this.x-2,this.y-2]
            ]
    
            
        }
        else if(this.energy < 0)
        {
            this.die();
        }
    }
    mul() {
        let newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 15) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            GrassEaterArr.push(new GrassEater(newX, newY));
            this.energy -= 4;
        }
        else {
            this.eatBonus();
        }
    }
    eat()
    {
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
            this.dWithBonus = [
            [this.x,this.y+2],
            [this.x,this.y+1],
            [this.x,this.y-1],
            [this.x,this.y-2],
            [this.x+1,this.y+2],
            [this.x+1,this.y+1],
            [this.x+1,this.y],
            [this.x+1,this.y-1],
            [this.x+1,this.y-2],
            [this.x+2,this.y+2],
            [this.x+2,this.y+1],
            [this.x+2,this.y],
            [this.x+2,this.y-1],
            [this.x+2,this.y-2],
            [this.x-1,this.y+2],
            [this.x-1,this.y+1],
            [this.x-1,this.y],
            [this.x-1,this.y-1],
            [this.x-1,this.y-2],
            [this.x-2,this.y+2],
            [this.x-2,this.y+1],
            [this.x-2,this.y],
            [this.x-2,this.y-1],
            [this.x-2,this.y-2]
        ]
            for (let i = 0; i < GrassArr.length; i++) {
                if (GrassArr[i].x == this.x && GrassArr[i].y == this.y)
                {
                    GrassArr.splice(i, 1);
                }
            }
        }
        else
        {
            this.move();
        }
    }
    eatBonus()
    {
        let newCell = random(this.chooseCell(4));
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
            this.dWithBonus = [
                [this.x,this.y+2],
                [this.x,this.y+1],
                [this.x,this.y-1],
                [this.x,this.y-2],
                [this.x+1,this.y+2],
                [this.x+1,this.y+1],
                [this.x+1,this.y],
                [this.x+1,this.y-1],
                [this.x+1,this.y-2],
                [this.x+2,this.y+2],
                [this.x+2,this.y+1],
                [this.x+2,this.y],
                [this.x+2,this.y-1],
                [this.x+2,this.y-2],
                [this.x-1,this.y+2],
                [this.x-1,this.y+1],
                [this.x-1,this.y],
                [this.x-1,this.y-1],
                [this.x-1,this.y-2],
                [this.x-2,this.y+2],
                [this.x-2,this.y+1],
                [this.x-2,this.y],
                [this.x-2,this.y-1],
                [this.x-2,this.y-2]
            ]    
            this.isBonused = true;
        }
        else
        {
            this.eat();
        }
    }
    die()
    {
        matrix[this.y][this.x] = 0;
        for(let i = 0; i < GrassEaterArr.length; i++)
        {
            if(GrassEaterArr[i].x == this.x && GrassEaterArr[i].y == this.y)
            {
                GrassEaterArr.splice(i,1);
            }
        }
    }
}
class Lion extends LivingCreature{
    constructor(_x, _y) {
        super(_x, _y)
        this.energy = 12;
    }
    chooseCell(num) {
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix[0].length && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push([x, y]);
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 0) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
        let newCell = random(this.chooseCell(0));
        if (newCell && this.energy >= 15) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            LionArr.push(new Lion(newX, newY));
            this.energy -= 4;
        }
        else {
            this.eat();
        }
    }
    eat() {
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1]
            ];

            for (let i = 0; i < GrassEaterArr.length; i++) {
                if (GrassEaterArr[i].x == this.x && GrassEaterArr[i].y == this.y) {
                    GrassEaterArr.splice(i, 1);
                }
            }
        }
        else {
            this.move();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < LionArr.length; i++) {
            if (LionArr[i].x == this.x && LionArr[i].y == this.y) {
                LionArr.splice(i, 1);
            }
        }

    }
}
class Reloader{
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