import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { CategoryService } from 'src/app/modules/commun/services/category.service';
import { OrderService } from 'src/app/modules/orders/services/order.service';
import { ShoppingCartService } from 'src/app/modules/shoppingcart/services/shopping-cart.service';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  categories: any[] = [];
  courses: any[] = [];
  coursesOfShoppingCart: any[] = [];
  sub: Subscription = new Subscription;
  boughtCourses: any[] = [];
  user: any;
  constructor(private categoryservice: CategoryService, private coursesService: CoursesService,
    private shoppingcartService: ShoppingCartService, private authService: AuthenticationService,
    private orderService: OrderService, private route: Router
  ) { }

  // Get All the Categories , Courses ,Courses which are in Shopping cart and purchased courses
  ngOnInit(): void {

    this.sub = this.categoryservice.getAllCategories()
      .pipe(
        mergeMap(cats => this.coursesService.getAllCourses()
          .pipe(
            mergeMap(courses => this.shoppingcartService.getCoursesOfShoppingCart()
              .pipe(
                map(sCartCourses => [cats, courses, sCartCourses])
              )
            )
          )
        )
      )
      .subscribe(([cats, courses, sCartCourses]) => {
        this.categories = cats;
        this.courses = courses;
        this.coursesOfShoppingCart = sCartCourses;
      });

    this.authService.getLoggedInUser()
      .subscribe(user => {
        this.user = user;
        let orderIds: any[] = [];
        if (user) {
          this.orderService.getOrderIdsByUserId(this.user.uid)
            .subscribe(orderIdsList => {
              orderIds = orderIdsList;
              orderIds.forEach(oId => {

                this.orderService.getCoursesByOrderIds(oId)
                  .subscribe((cours: any) => {
                    cours.forEach((element: any) => {
                      this.boughtCourses.push(element);
                    });
                  })

              })
            })
        }
      });



  }

  // Get All Courses By Category
  getCoursesByCategory(categoryType: string) {
    return this.courses.filter(course => course.categorie == categoryType);
  }

  // It will be run on destroy time
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Add Course To Cart
  AddToCart(course: any) {
    console.log("Add to cart:::", course)
    this.shoppingcartService.AddToCart(course);
  }

  // Delete Course From Cart
  DeleteFromCart(course: any) {
    this.shoppingcartService.deleteCourseFromCart(course.key);
  }

  // Check - If course is Present in Shopping Cart or not
  isExistInShoppingCart(key: string) {
    return this.coursesOfShoppingCart.find((course: any) => course.key == key);
  }

  // Check - If course is purchased or not
  isBoughtCourse(key: string) {
    return this.boughtCourses.find((course: any) => course.key == key);
  }

  // Navigate to course-content
  StartLearning(key: string) {
    this.route.navigate(['course-content', key]);
  }


}
