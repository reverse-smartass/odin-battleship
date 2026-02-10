export class battlefield {
  #boardDimension = 14;

  constructor() {
    this.board = [];
    this.misses = [];
    this.ships = [];
    for (let i = 0; i < this.#boardDimension; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.#boardDimension; j++) {
        this.board[i][j] = null;
      }
    }
  }

  addShip(ship, isVertical, column, row) {
    let r;
    let c;

    let staging = [];
    for (let i = 0; i < ship.len; i++) {
      r = isVertical ? row + i : row;
      c = isVertical ? column : column + i;

      if (
        r >= this.#boardDimension ||
        r < 0 ||
        c >= this.#boardDimension ||
        c < 0
      )
        return false;

      if (this.board[c][r] !== null) return false;

      staging.push([c, r]);
    }

    this.ships.push(ship);
    ship.coordinates = [];
    ship.coordinates.push(...staging);

    for (let i = 0; i < staging.length; i++) {
      this.board[staging[i][0]][staging[i][1]] = { ship };
    }
    return true;
  }

  receiveAttack(column, row){
    if(this.board[column][row]){
      this.board[column][row].ship.hit();
      this.board[column][row].ship.updateStatus();
      return true;
    }else{
      this.misses.push([column, row]);
      return false;
    }
  }

  allShipsDown(){
    for(let i = 0; i < this.ships.length; i++){
      if(!this.ships[i].sunk){
        return false;
      }
    }
    return true;
  }
}
