import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'masterboard-app';

  user: any;
  constructor(private auth: AuthService) {
    auth.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  loginwithGoogle() {
    this.auth
      .loginwithGoogle()
      .then((res) => console.log('Login Sucess'))
      .catch((err) => {
        console.log(err.message);
      });
  }
}
