import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { CoursesComponent } from './components/courses/courses.component';
import { BrowserModule } from '@angular/platform-browser';
import { CourseComponent } from './components/course/course.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CourseContentComponent } from './components/course-content/course-content.component';
import { YourCoursesComponent } from './components/your-courses/your-courses.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseComponent,
    CourseContentComponent,
    YourCoursesComponent
  ],
  exports: [
    CoursesComponent,
    CourseComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: []
})

export class AppModuleCourses {

}