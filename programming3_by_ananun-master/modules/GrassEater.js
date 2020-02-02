var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GrassEater extends LiveForm {
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
        if ((newCell && this.energy >= 15 && weather == 0) || (newCell && this.energy >= 16  && weather == 1) || (newCell && this.energy >= 17 && (weather == 2 || weather == 3))) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            GrassEaterArr.push(new GrassEater(newX, newY));
            this.energy -= 4;
            grassEaterHashiv++;
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