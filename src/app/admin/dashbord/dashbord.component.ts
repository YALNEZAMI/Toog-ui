import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ProjectService } from '../../Services/project.service';
import { Project } from '../../models/Project';
import { TeamService } from '../../Services/team.service';
import { Team } from '../../models/Team';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../models/Task';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent {
  //constructor
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private teamService: TeamService,
    private taskService: TaskService,
    private router: Router
  ) {
    //set theme
    if (this.userService.getUser().theme == 'black') {
      document.body.style.backgroundColor = 'black';
    }
    //get initial projects
    this.projectService.getProjects().subscribe((p: any) => {
      this.projects = p;
    });
    //get initial teams
    this.teamService
      .getTeamsWithMemberId(this.userService.getUser().id!)
      .subscribe((teams: any) => {
        this.teams = teams;
      });
    //get initial tasks
    this.taskService
      .getTeamsWithMemberId(this.userService.getUser().id!)
      .subscribe((tasks: any) => {
        this.tasks = tasks;
      });
  }
  //attributes
  projects: Project[] = [];
  teams: Team[] = [];
  tasks: Task[] = [];
  name = '';

  //methods
  getName() {
    return this.userService.getUser().name;
  }
  goTo(route: string) {
    this.router.navigate([route]);
  }
}
