import { Injectable } from '@angular/core';
import {Observable, ObservedValueOf} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CourseModel} from "../models/course-model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  localURL = 'http://localhost:5000/';
  constructor(private http: HttpClient ) { }

  addCourse(courseCode: string, courseName: string, courseCredit: number, teacherId: number): Observable<any> {
    const requestBody = {
      courseCode: courseCode,
      courseName: courseName,
      courseCredit: courseCredit,
      teacherId: teacherId
    }
    return this.http.post(this.localURL + 'Course/AddCourse', requestBody);
  }

  updateCourse(courseId: string, courseCode: string, courseName: string, courseCredit: number, teacherId: number): Observable<any> {
    const requestBody = {
      id: courseId,
      courseCode: courseCode,
      courseName: courseName,
      courseCredit: courseCredit,
      teacherId: teacherId
    }
    return this.http.post(this.localURL + 'Course/UpdateCourse', requestBody);
  }

  fetchCourseList(): Observable<any> {
    return this.http.get(this.localURL + 'Course/GetCourses');
  }

  deleteCourse(courseId: string): Observable<any> {
    let params = new HttpParams().set("id", courseId);
    return this.http.get(this.localURL + 'Course/DeleteCourse', {params});
  }

  fetchCourseById(courseId: string): Observable<any> {
    let params = new HttpParams().set("id", courseId);
    return this.http.get(this.localURL + 'Course/GetCourseById', {params});
  }

  fetchStudentsByCourseId(courseId: string): Observable<any> {
    let params = new HttpParams().set("courseId", courseId);
    return this.http.get(this.localURL + 'ManageCourse/GetStudentsByCourse', {params});
  }

  addStudentInCourse(courseId: string, studentId: string): Observable<any> {
    const requestBody = {
      courseId: courseId,
      studentId: studentId
    }
    return this.http.post(this.localURL + 'ManageCourse/AddStudent', requestBody);
  }

  removeStudentFromCourse(courseId: string, studentId: string): Observable<any> {
    const requestBody = {
      courseId: courseId,
      studentId: studentId
    }
    return this.http.post(this.localURL + 'ManageCourse/RemoveStudent', requestBody);
  }
}
