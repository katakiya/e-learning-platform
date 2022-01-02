import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoursesComponent } from './modules/admin/components/admin-courses/admin-courses.component';
import { AdminService } from './modules/admin/services/admin.service';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthenticationService } from './modules/auth/services/authentication.service';
import { AboutComponent } from './modules/commun/components/about/about.component';
import { HomeComponent } from './modules/commun/components/home/home.component';
import { PageNotFoundComponent } from './modules/commun/components/page-not-found/page-not-found.component';
import { CourseContentComponent } from './modules/courses/components/course-content/course-content.component';
import { CoursesComponent } from './modules/courses/components/courses/courses.component';
import { YourCoursesComponent } from './modules/courses/components/your-courses/your-courses.component';
import { OrderSuccessComponent } from './modules/orders/components/order-success/order-success.component';
import { OrdersComponent } from './modules/orders/components/orders/orders.component';
import { ShoppingcartComponent } from './modules/shoppingcart/components/shoppingcart/shoppingcart.component';

const routes: Routes = [
   {
     path:'' , redirectTo:'home',pathMatch:'full'
   },
   {
    path:'home',component:HomeComponent
   },
   {
     path:'about',component:AboutComponent
   },
   {
     path:'courses',component:CoursesComponent
   },
   {
     path:'login',component:LoginComponent
   },
   {
     path:'orders',component:OrdersComponent,
     canActivate:[AuthenticationService]
   },
   {
     path:'admin-courses',component:AdminCoursesComponent,
     canActivate:[AuthenticationService , AdminService]

   },
   {
     path:'cart' , component:ShoppingcartComponent
   },
   {
     path:'order-success/:id' , component:OrderSuccessComponent,
     canActivate:[AuthenticationService]
   },
   {
    path:'course-content/:id' , component:CourseContentComponent,
    canActivate:[AuthenticationService]
  },
  {
    path:'your-courses' , component:YourCoursesComponent,
    canActivate:[AuthenticationService]
  },
   {
     path:"**" , component:PageNotFoundComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
