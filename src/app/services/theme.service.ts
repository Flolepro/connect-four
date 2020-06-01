import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class ThemeService{

  //The subject and active for theme switch
  public menuSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public menuActive = this.menuSubject.asObservable();

  constructor() { }

  //The function who sitch between dark and light theme
  switchTheme(val : boolean) {
    this.menuSubject.next(val);
  }

}

