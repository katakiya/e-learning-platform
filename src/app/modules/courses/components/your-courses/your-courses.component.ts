import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/modules/auth/services/authentication.service';
import { OrderService } from 'src/app/modules/orders/services/order.service';

@Component({
  selector: 'app-your-courses',
  templateUrl: './your-courses.component.html',
  styleUrls: ['./your-courses.component.css']
})
export class YourCoursesComponent implements OnInit {

  yourCourses:any[]=[];
  noOfCourses:number = 0;
  user:any;
  constructor(private authService :AuthenticationService,private orderService:OrderService,private route:Router) { }

  // Get logged In user and purchaed courses
  ngOnInit(): void {
    this.authService.getLoggedInUser()
    .subscribe(user=>{
       this.user=user;
       let orderIds:any[] = [];
       if(user){
       this.orderService.getOrderIdsByUserId(this.user.uid)
                               .subscribe(orderIdsList=>{
                                   orderIds =orderIdsList;
                                   orderIds.forEach(oId=>{
                                      
                                      this.orderService.getCoursesByOrderIds(oId)
                                                      .subscribe((cours:any)=>{
                                                         //this.boughtCourses.push(cours);

                                                         cours.forEach((element:any) => {
                                                            this.yourCourses.push(element);
                                                         });

                                                         this.noOfCourses = this.yourCourses.length;
                                                      })
                                                  
                                   })
                               })
                              }
    });
  }

  // Navigate to Course Content Page
  StartLearning(key:string){
    this.route.navigate(['course-content',key]);
  }

}
