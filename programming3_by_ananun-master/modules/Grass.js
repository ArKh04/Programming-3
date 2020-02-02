var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Grass extends LiveForm {
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
        if ((newCell && this.multiply >= 2 && matrix[this.y][this.x] == 1 && weather == 0) || (newCell && this.multiply >= 3 && matrix[this.y][this.x] == 1 && weather == 1) || (newCell && this.multiply >= 4 && matrix[this.y][this.x] == 1 && (weather == 2 || weather == 3))) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            GrassArr.push(new Grass(newX, newY));
            this.multiply = 0;
            grassHashiv++;
        }
    }
}