import "./grid.css";
import { htmlBoard } from "./makeboard";
import { player } from "./player";
import { ship } from "./ship";
let resetbtn = document.getElementById("reset");
let vertical = true;
let horizontal = false;

let p1 = new player("p1", false);
let p2 = new player("p2 (computer)", true);
p1.setOpponent(p2);
p2.setOpponent(p1);

let s1 = new ship(4);
let s2 = new ship(5);
let s3 = new ship(2);
let s4 = new ship(5);

p1.playerBoard.addShip(s1, vertical, 2, 0);

p1.playerBoard.addShip(s2, horizontal, 2, 7);

p2.playerBoard.addShip(s3, vertical, 2, 0);

p2.playerBoard.addShip(s4, horizontal, 2, 7);

let p1board = new htmlBoard(p1, "p1grid");

p1board.makeGrid(p1.playerBoard.boardDimension);

let p2board = new htmlBoard(p2, "p2grid");

p2board.makeGrid(p2.playerBoard.boardDimension);

/* resetbtn.addEventListener("click", () => {
  p1.playerBoard.reset();
  p2.playerBoard.reset();
  p1.playerBoard.addShip(s1, vertical, 2, 0);

  p1.playerBoard.addShip(s2, horizontal, 2, 7);

  p2.playerBoard.addShip(s3, vertical, 2, 0);

  p2.playerBoard.addShip(s4, horizontal, 2, 7);
  p1board.makeGrid(p1.playerBoard.boardDimension);
  p2board.makeGrid(p2.playerBoard.boardDimension);
});
 */

function randomMinMax(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function addRandomShips(board, minLength, maxLength) {
  const nbShips = 5;

  let isVertical = [true, false];

  let availableCoordinates = board.availableMoves.slice();

  for (let i = 0; i < nbShips; i++) {
    let found = false;
    let direction = isVertical[Math.floor(Math.random() * 2)];
    let length = randomMinMax(minLength, maxLength);
    let place;
    while (!found) {
      let index = Math.floor(Math.random() * availableCoordinates.length);
      place = availableCoordinates[index];


      if(validShipPlacement(length, place[0], place[1], direction, board)){
        found = true;
        board.addShip(new ship(length), direction, place[0], place[1]);
        if(direction){
          for(let j = 0; j < length; j++){
            availableCoordinates.splice(index + j * board.boardDimension, 1);
          }
        }else{
          availableCoordinates.splice(index, length);
        }
      }
    }

  }
}

function validShipPlacement(length, row, column, isVertical, board) {
  for (let i = 0; i < length; i++) {
    let r = isVertical ? row + i : row;
    let c = isVertical ? column : column + i;
    if (board[r][c]) {
      return false;
    }
  }
  return true;
}
