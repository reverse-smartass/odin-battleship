export class battlefield {
  boardDimension = 14;

  constructor() {
    this.board = [];
    this.misses = [];
    this.ships = [];
    this.availableMoves = [];
    for (let i = 0; i < this.boardDimension; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.boardDimension; j++) {
        this.board[i][j] = null;
        this.availableMoves.push([i,j]);
      }
    }
    
  }

  addShip(ship, isVertical, row, column) {
    let r;
    let c;

    let staging = [];
    for (let i = 0; i < ship.len; i++) {
      r = isVertical ? row + i : row;
      c = isVertical ? column : column + i;

      if (
        r >= this.boardDimension ||
        r < 0 ||
        c >= this.boardDimension ||
        c < 0
      )
        return false;

      if (this.board[r][c] !== null) return false;

      staging.push([r, c]);
    }

    this.ships.push(ship);
    ship.coordinates = [];
    ship.coordinates.push(...staging);

    for (let i = 0; i < staging.length; i++) {
      this.board[staging[i][0]][staging[i][1]] = { ship };
    }
    return true;
  }

  receiveAttack(row, column) {
    if (this.board[row][column]) {
      this.board[row][column].ship.hit();
      this.board[row][column].ship.updateStatus();
      return true;
    } else {
      this.misses.push([row, column]);
      return false;
    }
  }

  giveAvailableMove(index){
    return this.availableMoves.splice(index,1);
  }

  allShipsDown() {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].sunk) {
        return false;
      }
    }
    return true;
  }
}
