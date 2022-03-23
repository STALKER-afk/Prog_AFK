


module.exports = class CoronaVirus {

    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.energy = 10;
        this.getNewCoordinates();
    }

    getNewCoordinates() {
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

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (this.energy >= 5 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            var newCoronaVirus = new CoronaVirus(newX, newY, this.id)
            coronaVirusArr.push(newCoronaVirus);
            matrix[newY][newX] = this.id;
            this.energy = 10;
        }
    }

    move() {
        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells);

        if (this.energy > 0 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.id;

            this.x = newX;
            this.y = newY;

            this.energy--;
        }

        this.die();
    }

    eat() {
        var grassEmptyCells = this.chooseCell(1);
        var grassEaterEmptyCells = this.chooseCell(2);
        var predatorEmptyCells = this.chooseCell(3);
        var maniacEmptyCells = this.chooseCell(4);
        var emptyCells = grassEmptyCells.concat(grassEaterEmptyCells).concat(predatorEmptyCells).concat(maniacEmptyCells);
        var newCell = random(emptyCells);

        if (this.energy > 0 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.id;
            this.x = newX;
            this.y = newY;

            this.energy++;

            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }

            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1)
                    break;
                }
            }

            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }

            for (var i in maniacArr) {
                if (maniacArr[i].x == this.x && maniacArr[i].y == this.y) {
                    maniacArr.splice(i, 1)
                    break;
                }
            }

            this.mul();

        } else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in coronaVirusArr) {
                if (coronaVirusArr[i].x == this.x && coronaVirusArr[i].y == this.y) {
                    coronaVirusArr.splice(i, 1);
                    break;
                }
            }
        }
    }

}
