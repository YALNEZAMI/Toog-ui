import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { ProjectService } from '../../Services/project.service';
import { Project } from '../../models/Project';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css',
})
export class DashbordComponent {
  //constructor
  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {
    this.projectService.getProjects().subscribe((p: any) => {
      this.projects = p;
      console.log(p);
    });
  }
  //attributes
  projects: Project[] = [];
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
