import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private asf: AngularFirestore) { }

  //CRUD
  create(user: User) {
    return this.asf.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {
    
  }

  update() {

  }

  delete() {

  }
}
