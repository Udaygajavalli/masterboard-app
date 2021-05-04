import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoredbService {
  constructor(private db: AngularFirestore) {}
  addYoutubeCourse(id: any, data: any) {
    this.db.collection('courses').doc(id).set(data, { merge: true });
  }
  courseRequests(data: any) {
    this.db.collection('courseRequest').add(data);
  }
  addCourseIntoUserDb(userid: any, data: any) {
    var userCoursesRef = this.db.collection('userCourses').doc(userid);

    userCoursesRef.get().subscribe((val) => {
      if (val.exists) {
        userCoursesRef.update({
          todo: firebase.firestore.FieldValue.arrayUnion(...data),
        });
      } else {
        userCoursesRef.set(
          {
            todo: data,
            doing: [],
            done: [],
          },
          { merge: true }
        );
      }
    });
  }
}
