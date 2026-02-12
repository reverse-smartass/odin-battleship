import { battlefield } from "./battlefield";

export class player {
  constructor(name, iscpu) {
    this.opponent;
    this.iscpu = iscpu;
    this.playerName = name;
    this.playerBoard = new battlefield();
  }

  setOpponent(opponent) {
    if (opponent instanceof player) {
      this.opponent = opponent;
      return true;
    }
    return false;
  }

  boardReceiveAttack(row, column) {
    let result = this.playerBoard.receiveAttack(row, column);
    console.log(result);

    if (this.playerBoard.allShipsDown()) {
      alert(`game over, ${this.opponent.playerName} wins`);
    }

    return result;
  }

  attackOpponent(row, column) {
    return this.opponent.boardReceiveAttack(row, column);
  }

  CPUAttack() {
    const board = this.playerBoard;
    const index = Math.floor(Math.random() * board.availableMoves.length);
    let move = board.giveAvailableMove(index);
    //console.log(move);
    return {
      result: this.attackOpponent(move[0][0], move[0][1]),
      row: move[0][0],
      column: move[0][1],
    };
  }
}
