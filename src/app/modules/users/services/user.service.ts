import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  // Save user in DB
  saveUser(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      // isAdmin:false
    })
  }


  // get User by UID
  getUserByUid(uid: string) {
    return this.db.object('/users/' + uid)
      .snapshotChanges()
      .pipe(
        map(user => {
          let obj: any = user.payload.val();
          obj.id = user.payload.key;

          return obj;
        })
      )
  }

}

