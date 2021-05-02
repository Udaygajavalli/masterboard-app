import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnDestroy {
  courses: any;
  dataFromDB: any;

  constructor(private db: AngularFirestore, private modalService: NgbModal) {
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
  ngOnDestroy(): void {
    console.log('Done');
    this.dataFromDB.unsubscribe();
  }
}
