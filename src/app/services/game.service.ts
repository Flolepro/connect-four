import { Injectable } from '@angular/core';

import { ColorService } from './color.service';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Injectable()
export class GameService{

  constructor(private colorService: ColorService) { }

  tiles = [
    [
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      }
    ],
    [
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      }
    ],
    [
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      }
    ],
    [
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      }
    ],
    [
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      }
    ],
    [
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      }
    ],
    [
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      },
      {
        color:'board__tile--white'
      }
    ]
  ];

  //Iterate and check the win conditions in the actual board for the given player
  fetchXY(playerColor:string):boolean{
    //TODO rework this for only check the played tiles and not the whole board each time

    //Maximum nummber of collumns
    let maxCol = 7;
    //Maximum nummber of lines
    let maxLine = 6;

    //All directions to fetch for
    let directions = [[1,0], [1,-1], [1,1], [0,1]];
    for (let dir of directions) {
      //Getting current directions
      let dCol = dir[0];
      let dLine = dir[1];
      //Iterate on the collumns
      for (let colIndex = 0; colIndex < maxCol; colIndex++) {
        //Iterate on the lines
          for (let lineIndex = 0; lineIndex < maxLine; lineIndex++) {
            //Getting the last col and line indexes
            let lastCol = colIndex + 3*dCol;
            let lastLine = lineIndex + 3*dLine;
            //Checking if we are not out of limits
            if (0 <= lastCol && lastCol < maxCol && 0 <= lastLine && lastLine < maxLine) {
              //Check if we are not on an empty tile and if so, check the near tiles for win condition
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
  isGameWin(player:number):boolean{
    let playerColor = this.colorService.getPlayerColor(player);
    //Fetch all win conditions
    if(this.fetchXY(playerColor)){
      console.log('Player '+player+' has win !');
      return true;
    }
    return false;
  }

  //The function to drop a coin in the board
  coinDrop(col:number, player:number):boolean{
    //Get thhe player tile color
    let playerColorClass = this.colorService.getPlayerColor(player)

    //Search for the tile to set the color
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

    //Return if the game is win this turn
    return this.isGameWin(player);
  }



}
