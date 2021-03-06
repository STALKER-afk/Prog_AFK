var LiveForm = require("./LiveForm")
var random = require("./random")




module.exports = class CoronaVirus extends LiveForm {

    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
       
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
      return super.chooseCell(charecter)
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
