import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Tile } from 'src/app/models/tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {

  constructor(private gameService : GameService) {

  }

  //Members for the board functions
  tiles:Tile[][];

  //Component initialization
  ngOnInit(): void {
    //Get the gameService tiles
    this.tiles=this.gameService.tiles;
    this.gameService.tilesActive.subscribe(value => this.tiles = value);
    this.gameService.initNewGame();
  }

  coinDropOn(col:any){
    this.gameService.coinDrop(this.tiles.indexOf(col));
  }


}
