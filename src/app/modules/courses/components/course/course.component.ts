import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/commun/services/category.service';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseForm: FormGroup;
  categories: any[] = [];
  submitBtnName: string = "Add";
  formheadingName: string = "Add Course";
  constructor(private formbuilder: FormBuilder, private categoryService: CategoryService, private courseService: CoursesService,
    private dialogRef: MatDialogRef<CourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.courseForm = this.formbuilder.group({
      "CourseName": [null, Validators.required],
      "Description": [null, Validators.required],
      "urlOfImage": [null, Validators.required],
      "urlOfVideo": [null, Validators.required],
      "Price": [null, Validators.required],
      "Category": [null, Validators.required]
    })

  }


  // Method to run when Admin wants to update any existing course
  onEdit(course: Course) {

    this.submitBtnName = "Update";
    this.formheadingName = "Update Course";
    this.courseForm = this.formbuilder.group({
      "CourseName": [course?.title, Validators.required],
      "Description": [course?.description, Validators.required],
      "urlOfImage": [course?.urlImage, Validators.required],
      "urlOfVideo": [course?.urlOfVideo, Validators.required],
      "Price": [course.price, Validators.required],
      "Category": [course?.categorie, Validators.required]
    })

  }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe(categories => {
        this.categories = categories
      })
    if (this.data) {
      if (this.data.id != null) {
        this.onEdit(this.data.course);
      }
    }
  }

  // Method to run when Admin clicks on Add Course Or Update Course Button
  onSubmit(form: any) {
    console.log(form);

    if (this.courseForm.valid && this.data == null) {
      let course: Course = {
        title: form.CourseName,
        description: form.Description,
        price: form.Price,
        categorie: form.Category,
        urlImage: form.urlOfImage,
        urlOfVideo: form.urlOfVideo
      }
      this.courseService.AddCourse(course);
      this.dialogRef.close();
    }

    if (this.courseForm.valid && this.data != null) {
      let course: Course = {
        title: form.CourseName,
        description: form.Description,
        price: form.Price,
        categorie: form.Category,
        urlImage: form.urlOfImage,
        urlOfVideo: form.urlOfVideo

      }
      this.courseService.updateCourse(course, this.data.id);
      this.dialogRef.close();

    }
  }

}
