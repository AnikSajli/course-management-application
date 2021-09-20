import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  localURL = 'http://localhost:5000/';
  constructor(private http: HttpClient) { }

  fetchStudentList(): Observable<any> {
    return this.http.get(this.localURL + 'Student/GetStudents')
  }

  fetchStudentById(id: string): Observable<any> {
    let params = new HttpParams().set("id", id);
    return this.http.get(this.localURL + 'Student/GetStudentById', {params})
  }

  addStudent(firstname: string, lastname: string, username: string, email: string,
             roll: number, phoneno: string, dept: string): Observable<any> {
    const requestBody = {
      firstName: firstname,
      lastName: lastname,
      username: username,
      email: email,
      roll: roll,
      phoneNumber: phoneno,
      department: dept
    };

    return this.http.post(this.localURL + 'Student/AddStudent', requestBody);
  }

  updateStudent(id: string, firstname: string, lastname: string, username: string, email: string, roll: number, phoneno: string, dept: string) {
    const requestBody = {
      id: id,
      firstName: firstname,
      lastName: lastname,
      username: username,
      email: email,
      roll: roll,
      phoneNumber: phoneno,
      department: dept
    };
    return this.http.post(this.localURL + 'Student/UpdateStudent', requestBody);
  }

  deleteStudentById(studentId: string): Observable<any> {
    let params = new HttpParams().set("id", studentId);
    return this.http.get(this.localURL + 'Student/DeleteStudent', {params});
  }

  getStudentByName(studentName): Observable<any> {
    let params = new HttpParams().set("name", studentName);
    return this.http.get(this.localURL + 'Student/GetStudentByName', {params});
  }
}
