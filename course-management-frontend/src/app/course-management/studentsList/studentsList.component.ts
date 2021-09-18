import { Component, OnInit } from '@angular/core';
import {StudentService} from "../services/student.service";
import {StudentModel} from "../models/student-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-list',
  templateUrl: './studentsList.component.html',
  styleUrls: ['./studentsList.component.scss']
})
export class StudentsListComponent implements OnInit {

  studentList: StudentModel[] = [];
  constructor(private studentService: StudentService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchStudentList();
  }

  fetchStudentList(): void {
    this.studentService.fetchStudentList().subscribe(response => {
      this.studentList = response;
    });
  }

  onAddStudent() {
    this.router.navigate(['/student-create']);
  }

  onUpdate(student: StudentModel) {
    this.router.navigate(['/student-update', student.id]);
  }

  onDelete(student: StudentModel) {
    this.studentService.deleteStudentById(student.id).subscribe(res => {
      alert("Student deleted successfully!")
    },error => {
      alert("Student deletion failed!")
    })
  }
}
