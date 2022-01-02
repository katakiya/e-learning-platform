import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { PaymentService } from 'src/app/modules/payment/services/payment.service';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  cartCourses: any[] = [];
  cartSize: number = 0;
  user: any;
  displayedColumns: string[] = ["courseName", "Course Image", "Price"];
  constructor(private shoppingCartService: ShoppingCartService, private router: Router,
    private authService: AuthenticationService, private orderService: OrderService,
    private paymentService: PaymentService
  ) { }

  // get logged In user , Courses of Cart and size of the cart
  ngOnInit(): void {
    this.shoppingCartService.getCoursesOfShoppingCartAsCourses()
      .subscribe(courses => {
        this.cartCourses = courses;
        this.cartSize = this.cartCourses.length;
      });
    this.authService.getLoggedInUser()
      .subscribe(user => {
        this.user = user;
      });

  }

  // Delete Course
  DeleteCourse(row: any) {
    this.shoppingCartService.deleteCourseFromCart(row.key);
  }

  // Get Total Amout Of course which are in cart
  getTotalAmout() {
    let total = 0;
    this.cartCourses.forEach(course => {
      total = total + course.price;
    })
    return total;
  }

  // Pay Money to buy courses
  onPay() {
    let order = {
      orderDate: new Date().getTime(),
      userId: this.user.uid,
      items: this.cartCourses,
      totalAmount: this.getTotalAmout(),
      paid: false
    }

    let createdOrder = this.orderService.createOrder(order);

    let paymentResult = this.paymentService.makePayment(createdOrder.key, order.totalAmount);

    if (paymentResult) {
      let orderSuccess = order;
      orderSuccess.paid = true;
      // we can apply the logic here if we integrate real payment
      this.orderService.updateOrder(createdOrder.key, orderSuccess);
      this.shoppingCartService.clearShoppingCart();
      this.router.navigate(['order-success', createdOrder.key]);
    }

  }

  // Method to run when User clicks on Cancel order
  onCancel() {
    this.router.navigate(['courses']);
  }



}
