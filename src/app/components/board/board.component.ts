import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  user: any;
  tasks: any = null;
  userid: any;
  fs: any;
  constructor(
    private toastr: ToastrService,
    public auth: AuthService,
    private db: AngularFirestore
  ) {
    this.auth.getUser().subscribe(
      (user) => {
        if (user) {
          this.user = user;
          localStorage.setItem('userid', user.uid);
        } else {
          this.toastr.warning('Please sign in to access this page.');
        }
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    if (this.userid) {
      this.fs = this.db
        .collection(`userCourses`)
        .doc(this.userid)
        .valueChanges()
        .subscribe((val) => {
          this.tasks = val;
          console.log(this.tasks);
        });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(this.tasks.todo);
      console.log(this.tasks.doing);
      console.log(this.tasks.done);
      this.db
        .collection('userCourses')
        .doc(this.userid)
        .set(this.tasks, { merge: true });
    }
  }

  ngOnDestroy(): void {
    this.fs.unsubscribe();
  }
}
