import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/course-list',
    pathMatch: 'full'
  },
  {
    path: 'course-list',
    loadChildren: () =>
      import('./course-management/course-management.module').then(
        (m) => m.CourseManagementModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
