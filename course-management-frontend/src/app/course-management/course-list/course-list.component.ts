import {Component, OnInit} from '@angular/core';
import {CourseModel} from "../models/course-model";
import {CourseService} from "../services/course.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courseList: CourseModel[] = [];

  constructor(private courseService: CourseService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.fetchCourseList();
  }

  fetchCourseList(): void {
    this.courseService.fetchCourseList().subscribe(response => {
      this.courseList = response;
    });
  }

  onAddCourse() {
    this.router.navigate(['/course-create']);
  }

  onUpdateCourse(course: any) {
    this.router.navigate(['/course-update', course.id]);
  }

  onManageCourse(course: CourseModel) {
    this.router.navigate(['/course-manage', course.id]);
  }

  onDeleteCourse(course: any) {
    this.courseService.deleteCourse(course.id).subscribe(response => {
      alert("Course deleted successfully!");
      this.fetchCourseList();
    },error => {
      alert("Course deletion failed!");
    });
  }
}
