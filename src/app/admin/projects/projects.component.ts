import { Component } from '@angular/core';
import { Project } from '../../models/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  //constructor
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    const mine = this.route.snapshot.queryParamMap.get('mine');

    if (mine) {
      //get only projects where am the owner
      this.projectService.getMyProjects().subscribe((p: any) => {
        this.projects = p;
      });
    } else {
      //get initial projects where am a participant
      this.projectService.getProjects().subscribe((p: any) => {
        this.projects = p;
      });
    }
  }

  //attributes
  projects: Project[] = [];

  //methods
  //return to dashbord method
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
}
