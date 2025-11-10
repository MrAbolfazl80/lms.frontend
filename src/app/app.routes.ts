import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login';
import { CoursesComponent } from './courses/courses';
import { AdminCoursesComponent } from './admin/courses/admin-courses';
import { AdminLayout } from './layouts/admin/admin-layout';
import { MainLayout } from './layouts/main/main-layout';
import { AdminHomeComponent } from './admin/home/admin-home';
import { MyCoursesComponent } from './admin/myCourses/my-enrolled-courses';
import { AuthAccess } from './services/authorization.service';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'courses', component: CoursesComponent },
      { path: '', redirectTo: '/courses', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: 'courses',
        component: AdminCoursesComponent,
        canActivate: [AuthAccess],
        data: { roles: ['admin'] } 
      },
      {
        path: 'home',
        component: AdminHomeComponent,
        canActivate: [AuthAccess],
        data: { roles: ['admin','student'] } 
      },
      {
        path: 'myCourses',
        component: MyCoursesComponent,
        canActivate: [AuthAccess],
        data: { roles: ['admin', 'student'] }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
    {
    path: 'user',
    component: AdminLayout,
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
        canActivate: [AuthAccess],
        data: { roles: ['student'] } 
      },
      {
        path: 'myCourses',
        component: MyCoursesComponent,
        canActivate: [AuthAccess],
        data: { roles: ['student'] }
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'unauthorized', loadComponent: () => import('./unauthorized/unauthorized').then(m => m.UnauthorizedComponent) }
];
