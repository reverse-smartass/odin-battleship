import "./grid.css";
import { htmlBoard } from "./makeboard";
import { player } from "./player";
import { ship } from "./ship";

let vertical = true;
let horizontal = false;

let p1 = new player("p1", false);
let p2 = new player("p2", true);
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
