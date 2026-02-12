export class htmlBoard {
  constructor(p, id) {
    this.player = p;
    this.divID = id;
    this.grid = document.getElementById(this.divID);
  }

  makeGrid(side) {
    this.grid.innerHTML = "";

    let board =  this.player.playerBoard;

    let caseSide = (window.innerHeight * 0.8) / side;

    for (let i = 0; i < side; i++) {
      let row = document.createElement("div");
      row.classList.add("row");
      row.setAttribute(
        "style",
        `min-height: ${caseSide}px;  max-height: ${caseSide}px; `,
      );
      for (let j = 0; j < side; j++) {
        let cas = document.createElement("div");
        cas.classList.add("case");
        cas.setAttribute(
          "style",
          `min-height: ${caseSide}px; min-width: ${caseSide}px; max-height: ${caseSide}px; max-width: ${caseSide}px; `,
        );

        if (this.player.playerBoard.board[i][j]) {
          cas.classList.add("ship");
        }
        cas.id = this.player.playerName+i+j;
        cas.addEventListener("click", () => {
            if (board.receiveAttack(i, j)){
                cas.classList.replace("ship", "shiphit");
            }else{
                cas.classList.add("shipmiss");
            }
           
            if(board.allShipsDown()){
                alert(`game over, ${this.player.opponent.playerName} wins`);
            }

            if(this.player.iscpu){
                const attack = this.player.opponent.CPUAttack();
                let div = document.getElementById(`${this.player.opponent.playerName}${attack.row}${attack.column}`);
                if(attack.result){
                    div.classList.add("shiphit");
                }else{
                    div.classList.add("shipmiss");
                }
                
            }
        });

        row.append(cas);
      }
      this.grid.append(row);
    }
  }
}
