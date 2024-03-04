import { Component } from '@angular/core';
import { Project } from '../../models/Project';
import { Router } from '@angular/router';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  //constructor
  constructor(private router: Router, private projectService: ProjectService) {
    //get initial projects
    this.projectService.getProjects().subscribe((p: any) => {
      this.projects = p;
    });
  }

  //attributes
  projects: Project[] = [];

  //methods
  //return to dashbord method
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
}
