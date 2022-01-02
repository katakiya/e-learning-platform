import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  courses: any[] = [];
  courseId: any = "N/A";
  urlOfCourse: any = "N/A";
  constructor(private route: ActivatedRoute, private courseService: CoursesService, private _sanitizer: DomSanitizer) { }

  // Get Current Purchased course
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.courseService.getAllCourses()
      .subscribe(courses => {
        this.courses = courses;

        let currentCourse = this.courses.find(course => course.key == this.courseId);
        this.urlOfCourse = this._sanitizer.bypassSecurityTrustResourceUrl(currentCourse.urlOfVideo);
      })
  }

}
