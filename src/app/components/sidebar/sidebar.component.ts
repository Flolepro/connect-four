import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../app/services/game.service';
import { ThemeService } from '../../../app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  //The boolean for theme switching
  themeSwitchBool = false;

  //Toggle autoplay for button style and interval unicity
  toggledAutoplay=false;

  //For NextRound button
  isRoundWIn = false;

  //Interval for autoplay
  interval:any;

  //Message feedback to diasplayy
  message:string;

  //Player's scores
  scoreP1:number;
  scoreP2:number;

  //Selected language
  selectedLang:string;

  //Constructor, dependency injection
  constructor(
    private gameService : GameService,
    private themeService : ThemeService,
    public translate: TranslateService
    ) { }

  //initialize the component
  ngOnInit(): void {
    this.selectedLang= this.translate.getDefaultLang();
    this.gameService.messageActive.subscribe(value => this.message = value);
    this.gameService.player1ScoreActive.subscribe(value => this.scoreP1 = value);
    this.gameService.player2ScoreActive.subscribe(value => this.scoreP2 = value);
    this.gameService.currentRoundWinActive.subscribe(value => this.isRoundWIn = value);
  }

  //Toggle auto play mode
  onLaunchhAutoplay(){
    if(!this.toggledAutoplay){
      this.toggledAutoplay=true;
      //Get this for the interval loop
      let that = this;
      let thatGameService = this.gameService;
      //Setting the auto play datas
      let playerPlaying : number;
      let gameIsWin = false;

      //The auto play interval
      this.interval =
        setInterval(function(){
          //The player playing
          playerPlaying = thatGameService.playerPlaying;
          //Random col to drop coin in
          let columnAvailable = thatGameService.getAvailableCollumns();
          //Drop the coin and check if the game is win
          gameIsWin = thatGameService.coinDrop(columnAvailable[Math.floor(Math.random() * columnAvailable.length)]);
            if(gameIsWin==true){
              //Stop the interval if game is win
              that.clearAutoplay(that.interval);
            }
        }, 100);
    }
    else{
      this.clearAutoplay(this.interval);
    }
  }

  //Clear autoplay interval
  clearAutoplay(interval:any){
    clearInterval(interval);
    this.toggledAutoplay=false;
  }

  //Switch theme between dark and light
  onSwitchTheme(){
    this.themeSwitchBool=!this.themeSwitchBool;
    this.themeService.switchTheme(this.themeSwitchBool);
  }

  //Reset game values
  onResetGame(){
    this.clearAutoplay(this.interval);
    this.gameService.initNewGame();
  }

  //Create next round
  onNextRound(){
    this.clearAutoplay(this.interval);
    this.gameService.initNewRound();
  }

  //Switch language between en and fr
  switchLang(lang: string) {
    this.selectedLang=lang;
    this.translate.use(this.selectedLang);
  }
}
