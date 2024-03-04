import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ProfileNavBarComponent } from './components/profile-nav-bar/profile-nav-bar.component';
import { AddProjectComponent } from './admin/add-project/add-project.component';
import { ProjectComponent } from './components/project/project.component';
import { AddTeamComponent } from './admin/add-team/add-team.component';
import { TeamComponent } from './components/team/team.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { TeamsComponent } from './admin/teams/teams.component';
import { ProjectViewComponent } from './admin/project/project.component';
import { TaskViewComponent } from './admin/task/task.component';
import { TeamViewComponent } from './admin/team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashbordComponent,
    NavBarComponent,
    ProfileComponent,
    ProfileNavBarComponent,
    AddProjectComponent,
    ProjectComponent,
    AddTeamComponent,
    TeamComponent,
    TaskComponent,
    TasksComponent,
    ProjectsComponent,
    TeamsComponent,
    ProjectViewComponent,
    TaskViewComponent,
    TeamViewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
