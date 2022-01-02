import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private db: AngularFireDatabase) { }

  // Return All The available Courses
  getAllCourses() {
    return this.db.list('courses')
      .snapshotChanges()
      .pipe(
        map(courses => courses.map((course: any) => ({
          key: course.payload.key,
          ...course.payload.val()
        }))

        )
      )
  }

  // Add Course 
  AddCourse(course: Course) {
    this.db.list('/courses/').push(course)
      .then(result => {
        alert("You have added course successfully!!");
      })
      .catch(err => {
        alert(err);
      })

  }

  // Update the course details
  updateCourse(course: Course, id: string) {
    this.db.object('/courses/' + id).update(course)
      .then(result => {
        alert("Course With Id:" + id + " updated sucessfully!!");
      })
      .catch(err => {
        alert(err);
      })
  }

  // Delete course from db
  deleteCourse(id: string) {
    if (confirm("Are you sure you want to delete this course from platform?")) {
      this.db.object('/courses/' + id).remove()
        .then(result => {
          alert("Course with id :" + id + " is delete successfully from database!");
        })
        .catch(err => {
          alert(err);
        })
    }
  }


}

