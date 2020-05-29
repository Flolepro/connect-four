import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ColorService } from './color.service';
import {Tile} from '../models/tile';

@Injectable()
export class GameService{

  constructor(private colorService: ColorService) { }

  //Maximum nummber of collumns
  maxCols = 7;
  //Maximum nummber of lines
  maxLines = 6;

  //The game tiles
  tiles:Tile[][];
  public tilesSubject: Subject<Tile[][]> = new BehaviorSubject<Tile[][]>([]);
  public tilesActive = this.tilesSubject.asObservable();

  //The game current message
  message:string;
  public messageSubject: Subject<string> = new BehaviorSubject<string>('');
  public messageActive = this.messageSubject.asObservable();

  //The current player playing
  playerPlaying = 1;

  //Iterate and check the win conditions in the actual board for the given player
  fetchXY(playerColor:string):boolean{
    //TODO rework this for only check the played s and not the whole board each time
    //All directions to fetch for
    let directions = [[1,0], [1,-1], [1,1], [0,1]];
    for (let dir of directions) {
      //Getting current directions
      let dCol = dir[0];
      let dLine = dir[1];
      //Iterate on the collumns
      for (let colIndex = 0; colIndex < this.maxCols; colIndex++) {
        //Iterate on the lines
        for (let lineIndex = 0; lineIndex < this.maxLines; lineIndex++) {
          //Getting the last col and line indexes
          let lastCol = colIndex + 3*dCol;
          let lastLine = lineIndex + 3*dLine;
          //Checking if we are not out of limits
          if (0 <= lastCol && lastCol < this.maxCols && 0 <= lastLine && lastLine < this.maxLines) {
            //Check if we are not on an empty  and if so, check the near s for win condition
            if (playerColor != this.colorService.DEFAULT_COLOR
              && playerColor == this.tiles[colIndex][lineIndex].color
              && playerColor == this.tiles[colIndex+dCol][lineIndex+dLine].color
              && playerColor == this.tiles[colIndex+2*dCol][lineIndex+2*dLine].color
              && playerColor == this.tiles[lastCol][lastLine].color) {
                //Game is win by the player
                return true;
            }
          }
        }
      }
    }
    //No one win the game
    return false;
  }

  //Analyse if the game is win or not by the last player
  isGameWin():boolean{
    let playerColor = this.colorService.getPlayerColor(this.playerPlaying);
    //Fetch all win conditions
    if(this.fetchXY(playerColor)){
      this.messageSubject.next('Player '+this.playerPlaying+' has win');
      return true;
    }
    if(this.playerPlaying == 1){
      this.playerPlaying=2;
    }
    else{
      this.playerPlaying=1;
    }
    this.messageSubject.next('Player '+this.playerPlaying+' turn');
    return false;
  }

  //The function to drop a coin in the board
  coinDrop(col:number):boolean{
    //Get thhe player  color
    let playerColorClass = this.colorService.getPlayerColor(this.playerPlaying)

    //Search for the  to set the color
    let line = 0;
    for (let tile of this.tiles[col]) {
      if(tile.color==this.colorService.DEFAULT_COLOR){
        tile.color=playerColorClass;
        break;
      }
      if(line+1==6){
        break;
      }
      line++;
    }
    this.tilesSubject.next(this.tiles);

    //Return if the game is win this turn
    return this.isGameWin();
  }

  initNewGame(){
    //Initialize the game with white tiles
    this.messageSubject.next('Initialization');
    this.tiles = [];
    //Init game tiles
    for (let colIndex = 0; colIndex < this.maxCols; colIndex++) {
      this.tiles[colIndex] = [];
      for (let lineIndex = 0; lineIndex < this.maxLines; lineIndex++) {
        this.tiles[colIndex][lineIndex]= new Tile(this.colorService.DEFAULT_COLOR);
      }
    }
    //Init players
    this.playerPlaying=1;

    //Notify listeners
    this.messageSubject.next('Player '+this.playerPlaying+' turn');
    this.tilesSubject.next(this.tiles);
  }

  //Return an array of all available columns
  getAvailableCollumns(){
    //Return variable
    let columnsAvailable=[];

    //Iterate on columns
    for (let colIndex = 0; colIndex < this.maxCols; colIndex++) {
      let columnAvailable = false;
      //Iterate on lines
      for (let lineIndex = 0; lineIndex < this.maxLines; lineIndex++) {
        if(!columnAvailable && this.tiles[colIndex][lineIndex].color==this.colorService.DEFAULT_COLOR){
          columnAvailable = true;
          columnsAvailable.push(colIndex);
        }
      }
    }
    return columnsAvailable;
  }

}
