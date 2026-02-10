import { battlefield } from "./battlefield";

export class player{
    constructor(name){
        this.playerName = name;
        this.playerBoard = new battlefield();
    }
}