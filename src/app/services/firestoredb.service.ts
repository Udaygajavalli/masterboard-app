import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FirestoredbService {
  constructor(private db: AngularFirestore) {}
  values: any;
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
        this.values = val.data();
        console.log(this.values);
        console.log(data);

        data = firebase.firestore.FieldValue.arrayRemove(
          this.values.doing || this.values.done
        );
        console.log(data);
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
