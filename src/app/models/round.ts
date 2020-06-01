import { Turn } from './turn';

export class Round {

  //Members
  id: number;
  turns:Turn[];
  winner:string;

  //Constructor
  constructor(id:number,turns:Turn[],winner:string) {
    this.id=id;
    this.turns=turns;
    this.winner=winner;
  }
}
