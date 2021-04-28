import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoredbService {
  constructor(private firestore: AngularFirestore) {}
  createCoffeeOrder(data: any) {
    this.firestore.collection('coffeeOrders').add(data);
  }
}
