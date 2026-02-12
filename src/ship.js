export class ship{
    constructor(length){
        this.len = length;
        this.hits = 0;
        this.sunk = false;
        this.coordinates = [];
    }

    addCoordinates(c){
        this.coordinates.push(c);
    }

    updateStatus(){
        //console.log("length "+ this.len + " hits " + this.hits);
        
        if(this.isSunk()){
            this.sunk = true;
        }
    }

    isSunk(){
        return this.hits === this.len;
    }

    isHitting(coor){
        for(let i = 0; i < this.coordinates.length; i++){
            if(this.coordinatesCompare(this.coordinates[i], coor)){
                return true;
            }
        }
        return false;
    }

    coordinatesCompare(c1, c2){
        return c1[0] === c2[0] && c1[1] === c2[1]; 
    }

    hit(){
        this.hits+=1;
    }
}