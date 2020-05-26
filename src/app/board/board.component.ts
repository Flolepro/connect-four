import { Component, OnInit } from '@angular/core';
import { TileService } from '../services/tile.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private tileService : TileService) {

  }

  tiles:any[][];

  getRandomInt(max:number):number{
    return Math.floor(Math.random() * Math.floor(max));
  }


  //Component initialization
  ngOnInit(): void {
    this.tiles=this.tileService.tiles;

    let that = this;
    let thatTileService = this.tileService;
    let playerStart = 1;
    setInterval(function(){

      thatTileService.coinDrop(that.getRandomInt(7),playerStart);
      if(playerStart == 1){
        playerStart=2;
      }
      else{
        playerStart=1;
      }
      }, 1000);
  }



}
