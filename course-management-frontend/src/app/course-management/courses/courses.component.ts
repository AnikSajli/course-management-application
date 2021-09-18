import { Component, OnInit } from '@angular/core';
import {CourseModel} from "../models/course-model";
import {CourseService} from "../services/course.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courseList: CourseModel[] = [
    {
      id: '1',
      courseCode: 'SWE-102',
      courseCredit: 2,
      teacherId: '1',
      courseName: 'Data Strcuture'
    },
    {
      id: '1',
      courseCode: 'SWE-102',
      courseCredit: 2,
      teacherId: '1',
      courseName: 'Data Structure'
    },
    {
      id: '1',
      courseCode: 'SWE-102',
      courseCredit: 2,
      teacherId: '1',
      courseName: 'Data Strcuture'
    }
  ]
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    // this.fetchCourseList();
  }

  // fetchCourseList(): void {
  //   this.courseService.fetchCourseList().subscribe(response => {
  //     this.courseList = response;
  //   });
  // }
  //
  // addCourse(): void {
  //   this.courseService.addCourse().subscribe(response => {
  //     console.log("Created Course");
  //   });
  // }
  //
  // deleteCourse(): void {
  //   this.courseService.deleteCourse().subscribe(response => {
  //     console.log("Course deleted");
  //   });
  // }
}
