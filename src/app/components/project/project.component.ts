import { Component, Input } from '@angular/core';
import { Project } from '../../models/Project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  @Input() project: Project = {};
  //constructor
  constructor() {
    console.log(this.project);
  }
}
