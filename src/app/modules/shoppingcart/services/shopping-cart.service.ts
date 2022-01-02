import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs';
import { Course } from '../../courses/models/course.model';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  // Add Course to Cart
  async AddToCart(course: any) {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      let cart: any = await this.db.list('/shoppingCart').push({
        dateCreated: new Date().getTime()
      });

      localStorage.setItem("cartId", cart.key);
      this.AddCourseToCart(cart.key, course);
    } else {
      this.AddCourseToCart(cartId, course);
    }
  }


  AddCourseToCart(idCart: string, courseAdd: any) {
    console.log('addCourse', courseAdd);
    this.db.object('/shoppingCart/' + idCart + '/items/' + courseAdd.key)
      .snapshotChanges()
      .pipe(
        take(1)
      ).subscribe(
        courseCart => {
          if (!courseCart.key) {
            this.db.list('/shoppingCart/' + idCart + '/items/').set(courseAdd.key, { course: courseAdd })
          }
        }
      )

  }


  // Return all courses which are in the cart
  getCoursesOfShoppingCart() {
    let cartId = localStorage.getItem('cartId');
    return this.db.list('/shoppingCart/' + cartId + '/items/')
      .snapshotChanges()
      .pipe(

        map(courses =>
          courses.map((c: any) => (
            {

              key: c.payload.key, ...c.payload.val()
            }
          ))
        ))


  }


  // Get All Courses Of shopping cart as Course
  getCoursesOfShoppingCartAsCourses() {
    let cartId = localStorage.getItem('cartId');
    return this.db.list('/shoppingCart/' + cartId + '/items/')
      .snapshotChanges()
      .pipe(

        map(courses =>
          courses.map((c: any) => (
            {

              key: c.payload.key, ...(c.payload.val() as any).course
            }
          ))
        ))


  }


  // Remove the course from Cart
  deleteCourseFromCart(courseKey: string) {
    let cartId = localStorage.getItem("cartId");
    this.db.object('/shoppingCart/' + cartId + "/items/" + courseKey).remove();
  }


  // Clear the shopping Cart
  clearShoppingCart() {
    let cartId = localStorage.getItem("cartId");
    this.db.object('/shoppingCart/' + cartId + "/items/").remove();
  }


}
