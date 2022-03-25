var LiveForm = require("./LiveForm")
var random = require("./random")



 modul.exports = class Grass extends LiveForm {
    constructor(x,y,index){
        super(x,y,index);
        this.energy = 8;

    }
    chooseCell(character) {
       return super.chooseCell(charecter);
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);



        if (this.multiply >= 8 && newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            var newGrass = new Grass(newX, newY, this.id)
            grassArr.push(newGrass);

            matrix[newY][newX] = this.id

            this.multiply = 0;
        }
    }

}
