import { Component, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: Task = {};
  constructor(private router: Router) {}
  goTo() {
    this.router.navigate(['/admin/tasks/' + this.task.id]);
  }
}
