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

  //Interval for autoplay
  interval:any;

  //Message feedback to diasplayy
  message:string;

  //For NextRound button
  isRoundWIn = false;

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

      this.interval =
        setInterval(function(){
          playerPlaying = thatGameService.playerPlaying;
          //TODO get random in available columns
          let columnAvailable = thatGameService.getAvailableCollumns();


          gameIsWin = thatGameService.coinDrop(columnAvailable[Math.floor(Math.random() * columnAvailable.length)]);
            if(gameIsWin==true){
              that.clearAutoplay(that.interval);
            }
        }, 100);
    }
    else{
      this.clearAutoplay(this.interval);
    }
  }

  //Get random int for collumn drop
  getRandomInt(max:number):number{
    return Math.floor(Math.random() * Math.floor(max));
  }

  clearAutoplay(interval:any){
    clearInterval(interval);
    this.toggledAutoplay=false;
  }

  onSwitchTheme(){
    this.themeSwitchBool=!this.themeSwitchBool;
    this.themeService.switchTheme(this.themeSwitchBool);
  }

  onResetGame(){
    this.clearAutoplay(this.interval);
    this.gameService.initNewGame();
  }

  onNextRound(){
    this.clearAutoplay(this.interval);
    this.gameService.initNewRound();
  }

  switchLang(lang: string) {
    this.selectedLang=lang;
    this.translate.use(this.selectedLang);
  }
}
