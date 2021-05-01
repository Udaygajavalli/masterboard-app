import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoredbService {
  constructor(private firestore: AngularFirestore) {}
  addYoutubeCourse(id:any,data: any) {
    this.firestore.collection('courses').doc(id).set(data,{merge:true});
  }
  courseRequests(data: any) {
    this.firestore.collection('courseRequest').add(data);
  }
}
