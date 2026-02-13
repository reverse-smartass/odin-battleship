import { battlefield } from "./battlefield";
import { ship } from "./ship";

describe("ship.js", () => {
  let s = new ship(3);
  s.coordinates = [[2,1], [2,2], [2,3]];

  test("hit", () => {
    s.hit();
    s.hit();
    expect(s.hits).toStrictEqual(2);
  });

  test("isSunk", () => {
    expect(s.isSunk()).toStrictEqual(false);
    s.hit();
    expect(s.isSunk()).toStrictEqual(true);
  });

   test("coordinates compare", () => {
    expect(s.isHitting([2,1])).toStrictEqual(true);
  });
});


describe("battlefield.js", () => {
  let s = new ship(3);
  s.coordinates = [[2,1], [2,2], [2,3]];
  let bf = new battlefield();

  test("addship", () => {
    expect(bf.addShip(s, true, 2, 0)).toStrictEqual(true);
    expect(bf.board[2][0].ship).toStrictEqual(s);    
  });

  test("receive", () => {
    expect(bf.receiveAttack(2,0)).toBe(true);
    bf.receiveAttack(2,1);
    bf.receiveAttack(2,2);
    expect(s.hits).toBe(1);
    expect(bf.misses).toStrictEqual([[2,1], [2,2]]);
  })


  test("over", () => {
    bf.receiveAttack(3,0);
    bf.receiveAttack(1,0);
    expect(s.hits).toBe(2);
    expect(bf.allShipsDown()).toStrictEqual(false);
  })
});

