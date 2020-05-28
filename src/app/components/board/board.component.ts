import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private gameService : GameService) {

  }

  tiles:any[][];

  //Component initialization
  ngOnInit(): void {
    //Get the gameService tiles
    this.tiles=this.gameService.tiles;
  }



}
