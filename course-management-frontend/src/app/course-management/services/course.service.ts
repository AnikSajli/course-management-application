import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CourseModel} from "../models/course-model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // localURL = '';
  // constructor(private http: HttpClient ) { }
  //
  // addCourse(courseData: CourseModel): Observable<any> {
  //   const requestBody = {
  //     id: courseData.id,
  //     courseCode: courseData.courseCode,
  //     courseName: courseData.courseName,
  //     courseCredit: courseData.courseCredit,
  //     teacherId: courseData.teacherId
  //   }
  //   return this.http.post(this.localURL + '/Course/AddCourse', requestBody);
  // }
  //
  // fetchCourseList(): Observable<any> {
  //   const requestBody = {
  //
  //   };
  //   return this.http.get(this.localURL + '/Course/GetCourses');
  // }
  //
  // deleteCourse(): Observable<any> {
  //   return this.http.delete(this.localURL + '/Course/DeleteCourse', { });
  // }
  //
  // getCourseById(): Observable<any> {
  //   return this.http.get(this.localURL + '/Course/GetCourseById', { });
  // }
}
