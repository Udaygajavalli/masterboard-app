import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { RequestCourseComponent } from './components/request-course/request-course.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgsRevealModule } from 'ngx-scrollreveal';
import { BoardComponent } from './components/board/board.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, RequestCourseComponent, CardComponent, BoardComponent, CreateCourseComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgsRevealModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent,CreateCourseComponent],
})
export class AppModule {}
