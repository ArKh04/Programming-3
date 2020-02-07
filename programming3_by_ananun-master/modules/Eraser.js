var random = require("./random");


module.exports = class Eraser {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.isActive = true;
    }
    CC() {
        if (this.x <= 0)
            this.x = 0;
        if (this.x >= matrix[0].length - 2)
            this.x = matrix[0].length - 1;
        if (this.y <= 0)
            this.y = 0;
        if (this.y >= matrix.length - 2)
            this.y = matrix.length - 1;
    }
    moveRight() {
        if (!this.isActive) {
            this.x++;
        }
        else {
            if (matrix[this.y][this.x] = 1) {
                for (let i = 0; i < GrassArr.length; i++) {
                    if (GrassArr[i].x == this.x && GrassArr[i].y == this.y) {
                        GrassArr.splice(i, 1);
                    }
                }
            }
            else if (matrix[this.y][this.x] = 2) {
                for (let i = 0; i < GrassEaterArr.length; i++) {
                    if (GrassEaterArr[i].x == this.x && GrassEaterArr[i].y == this.y) {
                        GrassEaterArr.splice(i, 1);
                    }
                }

            }
            else if (matrix[this.y][this.x] = 3) {
                for (let i = 0; i < GrassEaterArr.length; i++) {
                    if (LionArr[i].x == this.x && LionArr[i].y == this.y) {
                        LionArr.splice(i, 1);
                    }
                }
            }
            matrix[this.y][this.x] = 0;
            this.x++;
        }
    }
    moveLeft() {
        if (!this.isActive) {
            this.x--;
        }
        else {
            if (matrix[this.y][this.x] = 1) {
                for (let i = 0; i < GrassArr.length; i++) {
                    if (GrassArr[i].x == this.x && GrassArr[i].y == this.y) {
                        GrassArr.splice(i, 1);
                    }
                }
            }
            else if (matrix[this.y][this.x] = 2) {
                for (let i = 0; i < GrassEaterArr.length; i++) {
                    if (GrassEaterArr[i].x == this.x && GrassEaterArr[i].y == this.y) {
                        GrassEaterArr.splice(i, 1);
                    }
                }

            }
            else if (matrix[this.y][this.x] = 3) {
                for (let i = 0; i < GrassEaterArr.length; i++) {
                    if (LionArr[i].x == this.x && LionArr[i].y == this.y) {
                        LionArr.splice(i, 1);
                    }
                }
            }
            matrix[this.y][this.x] = 0;
            this.x--;
        }
    }
    moveDown() {
        if (!this.isActive) {
            this.y++;
        }
        else {
            if (matrix[this.y][this.x] = 1) {
                for (let i = 0; i < GrassArr.length; i++) {
                    if (GrassArr[i].x == this.x && GrassArr[i].y == this.y) {
                        GrassArr.splice(i, 1);
                    }
                }
            }
            else if (matrix[this.y][this.x] = 2) {
                for (let i = 0; i < GrassEaterArr.length; i++) {
                    if (GrassEaterArr[i].x == this.x && GrassEaterArr[i].y == this.y) {
                        GrassEaterArr.splice(i, 1);
                    }
                }

            }
            else if (matrix[this.y][this.x] = 3) {
                for (let i = 0; i < GrassEaterArr.length; i++) {
                    if (LionArr[i].x == this.x && LionArr[i].y == this.y) {
                        LionArr.splice(i, 1);
                    }
                }
            }
            matrix[this.y][this.x] = 0;
            this.y++;
        }
    }
    moveUp() {
        if (!this.isActive) {
            this.y--;
        }
        else {
            if (matrix[this.y][this.x] = 1) {
                for (let i = 0; i < GrassArr.length; i++) {
                    if (GrassArr[i].x == this.x && GrassArr[i].y == this.y) {
                        GrassArr.splice(i, 1);
                    }
                }
            }
            else if (matrix[this.y][this.x] = 2) {
                for (let i = 0; i < GrassEaterArr.length; i++) {
                    if (GrassEaterArr[i].x == this.x && GrassEaterArr[i].y == this.y) {
                        GrassEaterArr.splice(i, 1);
                    }
                }

            }
            else if (matrix[this.y][this.x] = 3) {
                for (let i = 0; i < GrassEaterArr.length; i++) {
                    if (LionArr[i].x == this.x && LionArr[i].y == this.y) {
                        LionArr.splice(i, 1);
                    }
                }
            }
            matrix[this.y][this.x] = 0;
            this.y--;
        }
    }
    Active() {
        this.isActive = !this.isActive;
    }
}