import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Task } from '../../models/Task';
import { Project } from '../../models/Project';
import { ProjectService } from '../../Services/project.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskViewComponent {
  //constructor
  constructor(
    private taskService: TaskService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {
    //retrieve task from api
    let taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskService.getTaskById(taskId!).subscribe((t: Task) => {
      this.task = t;
      //retrieve relative project tasks
      this.taskService
        .getTasksByProjectId(t.projectId!)
        .subscribe((ts: any) => {
          this.tasks = ts;
        });
    });
  }
  //attributes
  task: Task = { deadLine: '' };
  tasks: Task[] = [];
  //methods
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
  getDeadLine() {
    return this.task.deadLine.replace('T', ' at ').substring(0, 22);
  }
  isUrgentTask(): boolean {
    //if there is only one task, it is urgent
    if (this.tasks.length == 1) {
      return true;
    }
    //check if there is some more urgent tasks
    for (let task of this.tasks) {
      if (task.order! < this.task.order!) {
        console.log(task.order);
        console.log(this.task.order);
        return false;
      }
    }
    return true;
  }
  goToProject() {
    this.router.navigate([`/admin/projects/${this.task.projectId}`]);
  }
}
