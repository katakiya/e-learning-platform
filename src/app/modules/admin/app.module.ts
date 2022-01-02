import { NgModule } from "@angular/core";
import { AdminCoursesComponent } from './components/admin-courses/admin-courses.component';
import { MaterialModule } from "../material/material.module";
import { CommonModule } from "@angular/common";
import { AppModuleCourses } from "../courses/app.module";
@NgModule({
    declarations:[
    AdminCoursesComponent
  ],
  exports:[AdminCoursesComponent],
    imports:[
      MaterialModule,
      CommonModule,
      AppModuleCourses
    ],
    providers:[],
    bootstrap:[]
})

export class AppModuleAdmin{
    
}