import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private gameService : GameService) {

  }

  tiles:any[][];

  getRandomInt(max:number):number{
    return Math.floor(Math.random() * Math.floor(max));
  }


  //Component initialization
  ngOnInit(): void {
    this.tiles=this.gameService.tiles;

    let that = this;
    let thatGameService = this.gameService;
    let playerStart = 1;
    let gameIsWin = false;
    let interval =
      setInterval(function(){
        gameIsWin = thatGameService.coinDrop(that.getRandomInt(7),playerStart);
          if(playerStart == 1){
            playerStart=2;
          }
          else{
            playerStart=1;
          }
          if(gameIsWin==true){
            clearInterval(interval);
          }
      }, 100);



  }



}
