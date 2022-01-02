import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseComponent } from 'src/app/modules/courses/components/course/course.component';
import { CoursesComponent } from 'src/app/modules/courses/components/courses/courses.component';
import { Course } from 'src/app/modules/courses/models/course.model';
import { CoursesService } from 'src/app/modules/courses/services/courses.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  courses:any[]=[];
  displayedColumns:string[] = ["courseName","Description" , "Category" , "urlOfImage" , "Price" , "Actions"];
  constructor(private courseService : CoursesService , private serviceDialog:MatDialog) { }

  ngOnInit(): void {
    this.courseService.getAllCourses()
                              .subscribe(courses =>{
                                   this.courses = courses;
                              })
  }

  EditCourse(row:any){
    console.log(row);
    
      let course:Course = {
        title:row.title,
        description:row.description,
        price:row.price,
        categorie:row.categorie,
        urlImage:row.urlImage,
        urlOfVideo:row.urlOfVideo

      }
     
    console.log("edit course:::::",course);
    
    this.serviceDialog.open(CourseComponent,{
      width:'600px',
      data:{
         course:course,
         id:row.key
      }
  })
  }

  DeleteCourse(row:any){
      this.courseService.deleteCourse(row.key);
  }

  AddCourse(){
     this.serviceDialog.open(CourseComponent,{
         width:'600px',
     })
  }

}
