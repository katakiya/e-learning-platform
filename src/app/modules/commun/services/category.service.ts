import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/compat/database'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }

  //return All Available categoriesn of courses
  getAllCategories(){
    return this.db.list('categories').snapshotChanges()
                  .pipe(
                    map(categories=> categories.map((cat:any)=>({
                         key:cat.payload.key,
                         ...cat.payload.val()
                    }))
                    )
                  )
  }
}
