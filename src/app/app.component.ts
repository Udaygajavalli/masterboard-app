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
    console.log('app-con');

    auth.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  loginwithGoogle() {
    this.auth
      .loginwithGoogle()
      .then((res) => {
        this.toastr.success("That's it. You're in!");
        console.log(res);
      })
      .catch((err) => {
        this.toastr.error(err.message);
        console.log(err.message);
      });
  }

  async logOut() {
    try {
      await this.auth.logOut();
      this.router.navigateByUrl('');
      this.toastr.info('See you again!');
    } catch (err) {
      this.toastr.error(err.message);
    }
  }
}
