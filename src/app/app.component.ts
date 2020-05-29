import { Component, OnInit } from '@angular/core';

import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private themeService : ThemeService
    ) { }

  otherTheme = true;

  title = 'connect-four';

  ngOnInit(): void {
    this.themeService.menuActive.subscribe(value => this.otherTheme = value);
  }

}
