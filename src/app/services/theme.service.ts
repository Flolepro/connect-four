import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ThemeService{

  public menuSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public menuActive = this.menuSubject.asObservable();

  constructor() { }

  switchTheme(val : boolean) {
    console.log(val);
    this.menuSubject.next(val);
  }

}

