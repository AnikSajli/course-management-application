import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsListComponent} from './studentsList/studentsList.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {FlexLayoutModule} from "@angular/flex-layout";
import { CourseDetailsComponent } from './course-details/course-details.component';
import {HttpClientModule} from "@angular/common/http";
import { StudentDetailsComponent } from './student-details/student-details.component';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ManageCourseComponent } from './manage-course/manage-course.component';



@NgModule({
  declarations: [
    StudentsListComponent,
    TeachersListComponent,
    CourseListComponent,
    HeaderComponent,
    CourseDetailsComponent,
    StudentDetailsComponent,
    TeacherDetailsComponent,
    ManageCourseComponent,

  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    RouterModule.forChild([
      // {
      //   path: '',
      //   redirectTo: '/course-list',
      //   pathMatch: 'full'
      // },
      {
        path: '',
        component: CourseListComponent,
      },
      {
        path: 'course-list',
        component: CourseListComponent,
        children: [
          {
            path: 'course-details',
            component: CourseDetailsComponent
          }
        ]
      },
      {
        path: 'students-list',
        component: StudentsListComponent,
      },
      {
        path: 'teachers-list',
        component: TeachersListComponent,
      },
      {
        path: 'student-create',
        component: StudentDetailsComponent
      },
      {
        path: 'student-update/:id',
        component: StudentDetailsComponent
      },
      {
        path: 'teacher-create',
        component: TeacherDetailsComponent
      },
      {
        path: 'teacher-update/:id',
        component: TeacherDetailsComponent
      },
      {
        path: 'course-create',
        component: CourseDetailsComponent
      },
      {
        path: 'course-update/:id',
        component: CourseDetailsComponent
      },
      {
        path: 'course-manage/:id',
        component: ManageCourseComponent
      }
    ]),
  ]
})
export class CourseManagementModule { }
