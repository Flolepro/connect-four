import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { AuthComponent } from './components/auth/auth.component';


const routes : Routes =[
  { path: 'board', component : BoardComponent},
  { path: 'auth', component : AuthComponent},
  { path: '', component : BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
