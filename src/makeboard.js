export class htmlBoard {
  constructor(p, id) {
    this.player = p;
    this.divID = id;
  }

  grid = document.getElementById(this.divID);

  makeGrid(side) {
    grid.innerHTML = "";

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
        cas.addEventListener("click", () => {
            if (board.receiveAttack(i, j)){
                cas.classList.replace("ship", "shiphit");
            }else{
                cas.classList.add("shipmiss");
            }
           
            if(board.allShipsDown()){
                alert('game over');
            }
        });

        row.append(cas);
      }
      grid.append(row);
    }
  }
}
