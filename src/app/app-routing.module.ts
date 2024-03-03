import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { AddTeamComponent } from './admin/add-team/add-team.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'dashbord',
        component: DashbordComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'addProject',
        component: AddProjectComponent,
      },
      {
        path: 'addTeam',
        component: AddTeamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
