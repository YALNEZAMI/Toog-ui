import { Component, Input } from '@angular/core';
import { Project } from '../../models/Project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  @Input() project: Project = {
    name: '',
  };
  //constructor
  constructor(private router: Router) {}
  goTo() {
    this.router.navigate(['/admin/projects/' + this.project.id]);
  }
}
