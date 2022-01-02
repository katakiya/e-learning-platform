import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  cartCourses: any[] = [];
  cartSize: number = 0;
  displayedColumns: string[] = ["courseName", "Description", "Course Image", "Price", "Action"]
  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }


  //Get all course which are present in shopping cart
  ngOnInit(): void {
    this.shoppingCartService.getCoursesOfShoppingCartAsCourses()
      .subscribe(courses => {
        this.cartCourses = courses;
        this.cartSize = this.cartCourses.length;
      });

  }

  // Delete the course from Cart
  DeleteCourse(row: any) {
    this.shoppingCartService.deleteCourseFromCart(row.key);
  }

  // Get Total amout payble
  getTotalAmout() {
    let total = 0;
    this.cartCourses.forEach(course => {
      total = total + course.price;
    })
    return total;
  }

  // Navigate to Orders page when user clicks on Next
  onNext() {
    this.router.navigate(['orders']);
  }

}
