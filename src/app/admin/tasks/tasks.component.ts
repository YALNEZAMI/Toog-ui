import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { Task } from '../../models/Task';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  //constructor
  constructor(
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) {
    //get initial tasks
    this.taskService
      .getTeamsWithMemberId(this.userService.getUser().id!)
      .subscribe((tasks: any) => {
        this.tasks = tasks;
      });
  }

  //attributes
  tasks: Task[] = [];
  //methods
  //return to dashbord method
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
}
