import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ProjectService } from '../../Services/project.service';
import { Project } from '../../models/Project';
import { TeamService } from '../../Services/team.service';
import { Team } from '../../models/Team';
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
    private teamService: TeamService
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
  }
  //attributes
  projects: Project[] = [];
  teams: Team[] = [];
  //methods
  getName() {
    return this.userService.getUser().name;
  }
  changeName() {
    const user1 = this.userService.getUser();
    user1.name = this.name;
    this.userService.setUser(user1);
  }
  name = '';
}
