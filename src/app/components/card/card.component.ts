import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private db: AngularFirestore, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.dataFromDB = this.db
      .collection('courses')
      .valueChanges()
      .subscribe((val) => {
        this.courses = val;
        console.log(val);
      });
  }
  course: any;

  openXl(targetModal: any, course: any) {
    this.course = course;
    console.log(this.course);
    this.modalService.open(targetModal, {
      size: 'lg',
      windowClass: 'modal-adaptive',
    });
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
    console.log('Done');
    this.dataFromDB.unsubscribe();
  }
}
