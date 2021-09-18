import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  teacherDetails: any;
  teacherId: string;
  teacherForm: FormGroup;
  isUpdate: boolean;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.initTeacherForm();
    this.getIdFromRouteAndFetchStudent();
  }

  getIdFromRouteAndFetchStudent(): void {
    if (this.actRoute.snapshot.params['id']) {
      this.teacherId = this.actRoute.snapshot.params['id'];
      this.teacherService.fetchTeacherById(this.teacherId).subscribe(res => {
        this.teacherDetails = res;
        this.setTeacherFormValue(res);
      });
    }
  }

  initTeacherForm(): void {
    this.teacherForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  setTeacherFormValue(data: any): void {
    this.teacherForm.controls['firstname'].setValue(data.firstName);
    this.teacherForm.controls['lastname'].setValue(data.lastName);
    this.teacherForm.controls['username'].setValue(data.username);
    this.teacherForm.controls['email'].setValue(data.email);
    this.teacherForm.controls['phonenumber'].setValue(data.phoneNumber);
    this.teacherForm.controls['department'].setValue(data.department);
  }

  onSubmit() {
    let firstName = this.teacherForm.get('firstname').value;
    let lastName = this.teacherForm.get('lastname').value;
    let userName = this.teacherForm.get('username').value;
    let phoneNumber = this.teacherForm.get('phonenumber').value;
    let email = this.teacherForm.get('email').value;
    let department = this.teacherForm.get('department').value;

    this.addTeacher(firstName,lastName,userName,email ,phoneNumber,department);
  }

  addTeacher(firstname: string, lastname: string, username: string, email: string,
             phoneno: string, dept: string): void {
    this.teacherService.addTeacher(firstname, lastname, username,
      email, phoneno, dept).subscribe(res => {
      console.log('Teacher created');
    }, error => {
      alert('Update failed')
    });
  }

  updateTeacher(id: string, firstname: string, lastname: string, username: string, email: string,
                phoneno: string, dept: string): void {
    this.teacherService.updateTeacher(id, firstname, lastname, username,
      email, phoneno, dept).subscribe(res => {
      alert('Teacher updated successfully!');
    }, error => {
      alert('Teacher Update failed!')
    });
  }
}
