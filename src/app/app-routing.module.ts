import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RequestCourseComponent } from './components/request-course/request-course.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { CardComponent } from './components/card/card.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  { path: '', component: CardComponent },
  { path: 'requestcourse', component: RequestCourseComponent },
  { path: 'board', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
