import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  user: any;
  constructor(private toastr: ToastrService, private auth: AuthService) {
    this.auth.getUser().subscribe(
      (user) => {
        if (user) {
          this.user = user;
        } else {
          this.toastr.warning('Please sign in to access this page.');
        }
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  ngOnInit(): void {}
}
