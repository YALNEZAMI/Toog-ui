import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../Services/project.service';
import { Project } from '../../models/Project';
import { Task } from '../../models/Task';
import { TaskService } from '../../Services/task.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectViewComponent {
  //constructor
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {
    //retrieve the project from the api
    let projectId = this.route.snapshot.paramMap.get('id') || '';
    this.projectService.getProjectById(projectId).subscribe((p: any) => {
      this.project = p;
      //retrieve project tasj from api
      this.taskService
        .getTasksByProjectId(this.project.id!)
        .subscribe((tasks: any) => {
          this.tasks = tasks;
        });
    });
  }
  //attributes
  project: Project = { name: '', description: '', deadLine: '' };
  tasks: Task[] = [];
  onlyMyTasks: boolean = false;
  //methods
  // seeMoreDescription() {}
  // seeLessDescription() {}
  // seeMoreDescriptionBool(): boolean {
  //   console.log('see less');

  //   const desc = document.getElementById(
  //     'descriptionParagraphe'
  //   ) as HTMLDivElement;
  //   let displayedText = desc.innerText;
  //   console.log(displayedText.length);

  //   if (displayedText.length < this.project.description!.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // seeLessDescriptionBool(): boolean {
  //   const desc = document.getElementById(
  //     'descriptionParagraphe'
  //   ) as HTMLParagraphElement;
  //   let displayedText = desc.innerText;
  //   console.log(displayedText.length);

  //   if (displayedText.length > this.project.description!.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  getDeadLine() {
    return this.project.deadLine.replace('T', ' at ').substring(0, 22);
  }
  getTasks() {
    if (!this.onlyMyTasks) {
      return this.tasks;
    } else {
      return this.tasks.filter((t) => {
        for (let p of t.participants!) {
          if (p.id == this.userService.getUser().id) {
            return true;
          }
        }
        return false;
      });
    }
  }
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
}
