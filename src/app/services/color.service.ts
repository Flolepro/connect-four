import { Injectable } from '@angular/core';

@Injectable()
export class ColorService{

  //The default color for an empty tile
  DEFAULT_COLOR = 'board__tile--white';

  //The color of the player 1 coins
  P1_COLOR = 'board__tile--blue';

  //The color of the player 2 coins
  P2_COLOR = 'board__tile--red';

  constructor() { }

  //Get the player coin color
  getPlayerColor(player:number):string{
    //Default coin color if player is not < 3 and > 0
    let playerColorClass = this.DEFAULT_COLOR;

    //Set the color by player id
    if(player==1){
      playerColorClass=this.P1_COLOR;
    }
    else if(player==2){
      playerColorClass=this.P2_COLOR;
    }

    return playerColorClass;
  }

}

