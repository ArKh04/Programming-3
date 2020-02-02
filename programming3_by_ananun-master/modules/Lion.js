var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Lion extends LiveForm {
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
        if ((newCell && this.energy >= 15 && weather == 0) || (newCell && this.energy >= 16  && weather == 1) || (newCell && this.energy >= 17 && (weather == 2 || weather == 3))) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            LionArr.push(new Lion(newX, newY));
            this.energy -= 4;
            lionHashiv++;
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