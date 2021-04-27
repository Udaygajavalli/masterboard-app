import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'masterboard-app';

  user: any;
  constructor(
    private auth: AuthService,
    public toastr: ToastrService,
    private router: Router
  ) {
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
      .then((res) => {
        this.toastr.success("That's it. You're in!");
        console.log('Login Sucess');
      })
      .catch((err) => {
        this.toastr.error('Ohhh No, Try again!');
        console.log(err.message);
      });
  }

  async logOut() {
    try {
      await this.auth.logOut();
      this.router.navigateByUrl('');
      this.toastr.info('See you again!');
    } catch (error) {
      this.toastr.error('Something is wrong!');
    }
  }
}
