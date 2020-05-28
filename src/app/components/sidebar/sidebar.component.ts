import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private gameService : GameService) { }

  ngOnInit(): void {
  }

  //Toggle auto play mode
  launchhAutoplay(){
    //Get this for the interval loop
    let that = this;
    let thatGameService = this.gameService;

    //Setting the auto play datas
    let playerStart = 1;
    let gameIsWin = false;

    let interval =
      setInterval(function(){
        gameIsWin = thatGameService.coinDrop(that.getRandomInt(7),playerStart);
          if(gameIsWin==true){
            clearInterval(interval);
            console.log("Player "+playerStart+" win the game !");
          }
          else{
            if(playerStart == 1){
              playerStart=2;
            }
            else{
              playerStart=1;
            }
          }
      }, 100);
  }

  //Get random int for collumn drop
  getRandomInt(max:number):number{
    return Math.floor(Math.random() * Math.floor(max));
  }
}
