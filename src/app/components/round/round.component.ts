import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Round } from '../../../app/models/round';
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
}
