import "./grid.css";
import { htmlBoard } from "./makeboard";
import { player } from "./player";
import { ship } from "./ship";

let p1 = new player("p1");
let s1 = new ship(4);
let s2 = new ship(5);

p1.playerBoard.addShip(s1, true, 2, 0);

p1.playerBoard.addShip(s2, false, 2, 7);

let p1board = new htmlBoard(p1, "grid");

p1board.makeGrid(p1.playerBoard.boardDimension);
