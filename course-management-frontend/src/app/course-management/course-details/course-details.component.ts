import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../services/course.service";
import {CourseModel} from "../models/course-model";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  courseId: string;
  courseDetails: CourseModel;
  courseForm: FormGroup;
  updateMode: boolean;

  constructor(private fb: FormBuilder,
              private courseService: CourseService,
              private actRoute: ActivatedRoute,
              private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.initCourseForm();
    this.getIdFromRouteAndFetchCourse();
  }

  getIdFromRouteAndFetchCourse(): void {
    if (this.actRoute.snapshot.params['id']) {
      this.updateMode = true;
      this.courseId = this.actRoute.snapshot.params['id'];
      this.courseService.fetchCourseById(this.courseId).subscribe(res => {
        this.courseDetails = res;
        this.teacherService.fetchTeacherById(this.courseDetails.teacherId).subscribe(teacher => {
          this.setCourseFormValue(res, teacher.fullName);
        })
      });
    }
  }

  initCourseForm(): void {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseCode: ['', Validators.required],
      credit: ['', Validators.required],
      teacherName: ['', Validators.required]
    });
  }

  setCourseFormValue(data: any, teacherName: string): void {
    this.courseForm.controls['courseName'].setValue(data.courseName);
    this.courseForm.controls['courseCode'].setValue(data.courseCode);
    this.courseForm.controls['credit'].setValue(data.courseCredit);
    this.courseForm.controls['teacherName'].setValue(teacherName);
  }

  onSubmit() {
    let courseName = this.courseForm.get('courseName').value;
    let courseCode = this.courseForm.get('courseCode').value;
    let credit = this.courseForm.get('credit').value;
    let teacherName = this.courseForm.get('teacherName').value;
    if (this.updateMode) {
      this.updateCourse(courseName, courseCode, credit, teacherName)
    }
    else {
      this.addCourse(courseName, courseCode, credit, teacherName)
    }
  }

  addCourse(courseName: string, courseCode: string, credit: number, teachername: string): void {
    this.teacherService.getTeachersByName(teachername).subscribe(res => {
      if (res.length === 0) {
        alert('This teacher doesn\'t exist!');
      }
      else {
        this.courseService.addCourse(courseCode, courseName, credit, res[0].id).subscribe(res => {
          alert('Course created successfully!');
        }, error => {
          alert('Course creation failed!');
        })
      }
    })
  }

  updateCourse(courseName: string, courseCode: string, credit: number, teachername: string): void {
    this.teacherService.getTeachersByName(teachername).subscribe(res => {
      if (res.length === 0) {
        alert('This teacher doesn\'t exist!');
      }
      else {
        this.courseService.updateCourse(this.courseId, courseCode, courseName, credit, res[0].id).subscribe(res => {
          alert('Course updated successfully!');
        }, error => {
          alert('Course update failed!');
        })
      }
    })
  }
}
