import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Round } from 'src/app/models/round';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {
  rounds$: Observable<Round[]>;
  show=false;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.rounds$ = this.store.select(state => state.rounds.rounds);
  }

  showInfo(id:number){
    console.log('Show modal info for the round : '+id);
  }
}
