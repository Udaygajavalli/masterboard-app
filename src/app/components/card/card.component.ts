import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoredbService } from 'src/app/services/firestoredb.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnDestroy, OnInit {
  courses: any;
  dataFromDB: any;
  searchString: any;
  user: any;

  constructor(
    private db: AngularFirestore,
    private firestore: FirestoredbService,
    private modalService: NgbModal,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.auth.getUser().subscribe(
      (user) => {
        this.user = user;
        console.log(user);
      },
      (err) => {
        this.toastr.error(err.message);
      }
    );
  }
  ngOnInit(): void {
    this.dataFromDB = this.db
      .collection('courses')
      .valueChanges()
      .subscribe((val) => {
        this.courses = val;
      });
  }
  course: any;

  openXl(targetModal: any, course: any) {
    this.course = course;
    this.modalService.open(targetModal, {
      size: 'lg',
      windowClass: 'modal-adaptive',
    });
  }
  addCourse() {
    if (this.user != null) {
      this.firestore.addCourseIntoUserDb(this.user.uid, this.course.items);
      this.toastr.success('Course Added Successfully');
      this.modalService.dismissAll();
      this.router.navigateByUrl('/board');
    } else {
      this.toastr.info('Sign in to add the course');
    }
  }
  Search() {
    if (this.searchString === '') {
      this.ngOnInit();
    } else {
      this.courses = this.courses.filter((res: any) => {
        return (
          res.courseName
            .toLocaleLowerCase()
            .match(this.searchString.toLocaleLowerCase()) ||
          res.courseDescription
            .toLocaleLowerCase()
            .match(this.searchString.toLocaleLowerCase()) ||
          res.authorName
            .toLocaleLowerCase()
            .match(this.searchString.toLocaleLowerCase())
        );
      });
    }
  }
  ngOnDestroy(): void {
    this.dataFromDB.unsubscribe();
    console.log('Done');
  }
}
