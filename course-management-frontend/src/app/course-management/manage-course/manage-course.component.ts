import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseService} from "../services/course.service";
import {FormControl, Validators} from "@angular/forms";
import {StudentService} from "../services/student.service";

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {
  courseId: string;
  studentIdList: any[];
  allStudentsList: any[];
  studentNameField: FormControl;
  courseStudentDetailsList: any[] = [];

  constructor(private actRoute: ActivatedRoute,
              private courseService: CourseService,
              private studentService: StudentService) {
    this.studentNameField = new FormControl('',[Validators.required]);
  }

  ngOnInit(): void {
    this.fetchAllStudents();
    this.getIdFromRouteAndFetchStudent();
  }

  fetchAllStudents(): void {
    this.studentService.fetchStudentList().subscribe(res => {
      this.allStudentsList = res;
    })
  }

  getIdFromRouteAndFetchStudent(): void {
    if (this.actRoute.snapshot.params['id']) {
      this.courseId = this.actRoute.snapshot.params['id'];
      this.courseService.fetchStudentsByCourseId(this.courseId).subscribe(res => {
        this.studentIdList = res;
        this.getCourseStudents();
      }, error => {
        alert('Error occured while fetching students!')
      });
    }
  }

  getCourseStudents():void {
    this.courseStudentDetailsList = [];
    this.allStudentsList.forEach(allStudent => {
      this.studentIdList.forEach(courseStudent => {
        if (courseStudent.studentId === allStudent.id) {
          this.courseStudentDetailsList.push(allStudent);
        }
      })
    });
  }

  addStudentInCourse(): void {
    this.studentService.getStudentByName(this.studentNameField.value).subscribe(studentDetails => {
      if (!studentDetails || studentDetails.length == 0) {
        alert("This student doesn't exist!")
      } else {
        this.courseService.addStudentInCourse(this.courseId, studentDetails[0].id).subscribe(res => {
          alert("Student added to this course successfully!")
          this.getIdFromRouteAndFetchStudent();
        },error => {
          alert("Student couldn't be added to this course!")
        });
      }
    }, error => {
      alert("Student couldn't be added to this course!")
    });
  }

  removeStudentFromCourse(student: any) {
    this.courseService.removeStudentFromCourse(this.courseId, student.id).subscribe(res => {
      alert('Student removed from course successfully!')
      this.getIdFromRouteAndFetchStudent();
    },error => {
      alert('Student remove from course failed!')
    })
  }
}
