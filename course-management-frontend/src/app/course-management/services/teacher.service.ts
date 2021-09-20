import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {TeacherModel} from "../models/teacher-model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  localURL = 'http://localhost:5000/';
  constructor(private http: HttpClient ) { }

  fetchTeachersList(): Observable<any> {
    return this.http.get(this.localURL + 'Teacher/GetTeachers');
  }

  fetchTeachersListForCourseCreation(): Observable<any> {
    return this.http.get(this.localURL + 'Teacher/GetTeachers');
  }

  fetchTeacherById(teacherId: string): Observable<any> {
    let params = new HttpParams().set("id", teacherId);
    return this.http.get(this.localURL + 'Teacher/GetTeacherById', {params});
  }

  getTeachersByName(teacherName: any): Observable<any> {
    let params = new HttpParams().set("name", teacherName);
    return this.http.get(this.localURL + 'Teacher/GetTeacherByName', {params});
  }

  addTeacher(firstname: string, lastname: string, username: string, email: string,
             phoneno: string, dept: string): Observable<any> {
    const requestBody = {
      firstName: firstname,
      lastName: lastname,
      username: username,
      email: email,
      phoneNumber: phoneno,
      department: dept
    };

    return this.http.post(this.localURL + 'Teacher/AddTeacher', requestBody);
  }

  updateTeacher(id: string, firstname: string, lastname: string, username: string, email: string,
             phoneno: string, dept: string): Observable<any> {
    const requestBody = {
      id: id,
      firstName: firstname,
      lastName: lastname,
      username: username,
      email: email,
      phoneNumber: phoneno,
      department: dept
    };

    return this.http.post(this.localURL + 'Teacher/UpdateTeacher', requestBody);
  }

  deleteTeacherById(teacherId: string): Observable<any> {
    let params = new HttpParams().set("id", teacherId);
    return this.http.delete(this.localURL + 'Teacher/DeleteTeacher', {params});
  }
}
