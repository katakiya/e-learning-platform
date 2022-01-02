import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  // Create an Order 
  createOrder(order: any) {
    return this.db.list('/orders').push(order);
  }

  // Update Order
  updateOrder(orderId: any, order: any) {
    this.db.object('/orders/' + orderId).update(order)
      .then(result => {
        alert("Order Placed Succesfully!!!");
      })
      .catch(err => {
        alert("Error in payment :: " + err);
      })
  }

  // Return all Order Ids by UserId
  getOrderIdsByUserId(userId: any) {
    return this.db.list('/orders/', ref => ref.orderByChild('userId').equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(orders => {
          return orders.map(ids => {
            return ids.key;
          })
        })
      )

  }

  // return list of course by Order Id
  getCoursesByOrderIds(orderId: any) {
    return this.db.object('/orders/' + orderId + '/items/')
      .snapshotChanges()
      .pipe(
        map(courses => {
          return courses.payload.val();
        })
      )

  }

}
