import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { AddTeamComponent } from './admin/add-team/add-team.component';
import { TeamsComponent } from './admin/teams/teams.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { ProjectComponent } from './components/project/project.component';
import { TeamComponent } from './components/team/team.component';
import { ProjectViewComponent } from './admin/project/project.component';
import { TaskViewComponent } from './admin/task/task.component';
import { TeamViewComponent } from './admin/team/team.component';

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
      {
        path: 'teams',
        component: TeamsComponent,
      },
      {
        path: 'teams/:id',
        component: TeamViewComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'projects/:id',
        component: ProjectViewComponent,
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'tasks/:id',
        component: TaskViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
