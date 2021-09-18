import { Component, OnInit } from '@angular/core';
import {StudentModel} from "../models/student-model";
import {TeacherService} from "../services/teacher.service";
import {Router} from "@angular/router";
import {TeacherModel} from "../models/teacher-model";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  teachersList: StudentModel[] = [];
  constructor(private teacherService: TeacherService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchTeacherList();
  }

  fetchTeacherList(): void {
    this.teacherService.fetchTeachersList().subscribe(response => {
      this.teachersList = response;
    });
  }

  onAddTeacher() {
    this.router.navigate(['/teacher-create']);
  }

  onUpdate(teacher: TeacherModel) {
    this.router.navigate(['/teacher-update', teacher.id]);
  }

  onDelete(teacher: TeacherModel) {
    this.teacherService.deleteTeacherById(teacher.id).subscribe(res => {
      alert("Teacher deleted successfully!")
    },error => {
      alert("Teacher deletion failed!")
    })
  }

}
