import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../services/student.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
  studentDetails: any;
  studentId: string;
  studentForm: FormGroup;
  updateMode: boolean;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initStudentForm();
    this.getIdFromRouteAndFetchStudent();
  }

  getIdFromRouteAndFetchStudent(): void {
    if (this.actRoute.snapshot.params['id']) {
      this.updateMode = true;
      this.studentId = this.actRoute.snapshot.params['id'];
      this.studentService.fetchStudentById(this.studentId).subscribe(res => {
        this.studentDetails = res;
        this.setStudentFormValue(res);
      });
    }
  }

  initStudentForm(): void {
    this.studentForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      phonenumber: ['', Validators.required],
      roll: ['', Validators.required],
      email: ['', Validators.required],
      department: ['', Validators.required],
    });
  }

  setStudentFormValue(data: any): void {
    this.studentForm.controls['firstname'].setValue('');
    this.studentForm.controls['lastname'].setValue(data.lastName);
    this.studentForm.controls['username'].setValue(data.username);
    this.studentForm.controls['roll'].setValue(data.roll);
    this.studentForm.controls['email'].setValue(data.email);
    this.studentForm.controls['phonenumber'].setValue(data.phoneNumber);
    this.studentForm.controls['department'].setValue(data.department);
  }

  onSubmit() {
    let firstName = this.studentForm.get('firstname').value;
    let lastName = this.studentForm.get('lastname').value;
    let userName = this.studentForm.get('username').value;
    let phoneNumber = this.studentForm.get('phonenumber').value;
    let roll = parseInt(this.studentForm.get('roll').value);
    let email = this.studentForm.get('email').value;
    let department = this.studentForm.get('department').value;

    if (this.updateMode) {
      this.updateS(this.studentDetails.id, firstName, lastName, userName, email, roll, phoneNumber, department);
    } else {
      this.addStudent( firstName, lastName, userName, email, roll, phoneNumber, department);
    }
  }

  addStudent(firstname: string, lastname: string, username: string, email: string,
             roll: number, phoneno: string, dept: string): void {
    this.studentService.addStudent(firstname, lastname, username,
      email, roll, phoneno, dept).subscribe(res => {
      alert('Student Created Successfully!');
    }, error => {
      alert('Student Creation Failed!')
    });
  }

  updateStudent(id: string, firstname: string, lastname: string, username: string, email: string,
             roll: number, phoneno: string, dept: string): void {
    this.studentService.updateStudent(id, firstname, lastname, username,
      email, roll, phoneno, dept).subscribe(res => {
      alert('Student Updated Successfully!');
    }, error => {
      alert('Student Update Failed!')
    });
  }
}
