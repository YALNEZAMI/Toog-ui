import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { Task } from '../../models/Task';
import { Project } from '../../models/Project';
import { ProjectService } from '../../Services/project.service';
import { User } from '../../models/User';

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

      this.taskToUpdate = t;
      //retrieve relative project tasks
      this.taskService
        .getTasksByProjectId(t.projectId!)
        .subscribe((ts: any) => {
          this.tasks = ts;
        });
      this.projectService.getProjectById(t.projectId!).subscribe((p: any) => {
        this.project = p;
      });
    });
  }
  //attributes
  updateFromBool: boolean = false;
  task: Task = { deadLine: '' };
  taskToUpdate: Task = {};
  project: Project = { name: '' };
  taskResponse: {
    error: boolean;
    message: string;
  } = {
    error: false,
    message: '',
  };
  taskPhoto: any;
  tasks: Task[] = [];
  deleteConfirm: boolean = false;
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
  deleteTask() {
    this.taskService.deleteTaskId(this.task.id!).subscribe((t) => {
      console.log(t);
      this.return();
    });
  }
  updateFrom() {
    if (this.updateFromBool) {
      //cancel update
      this.updateFromBool = false;
      //reset the iniitial task
      this.taskService.getTaskById(this.task.id!).subscribe((t) => {
        this.task = t;
      });
    } else {
      this.updateFromBool = true;
    }
    console.log(this.updateFromBool);
  }
  addParticipantToTask(participant: User) {
    //check if already selected
    if (this.task.participants?.includes(participant)) {
      return;
    }
    this.task.participants?.push(participant);
  }
  popTaskParticipant(participant: User) {
    this.task.participants = this.task.participants?.filter((p) => {
      console.log(p.id, participant.id);

      return p.id != participant.id;
    });
  }
  isInculdedInTaskParticipants(participant: User): boolean {
    const singleton =
      this.task.participants?.filter((p) => {
        return participant.id == p.id;
      }) || [];
    if (singleton.length == 0) {
      return false;
    } else {
      return true;
    }
  }
  //task photo
  clickTaskPhoto() {
    document.getElementById('taskPhotoInput')?.click();
  }
  TaskPhotoChange(e: any) {
    const imagePreview = document.getElementById(
      'taskPhotoPreview'
    ) as HTMLImageElement;
    const file = e.target!.files[0];
    //set the global file variable
    let currentTasksIndex = this.tasks.length;
    this.taskPhoto = file;

    // Create a FileReader object to read the file
    const reader = new FileReader();

    // Set up the FileReader to display the image when loaded
    reader.onload = function (e) {
      // Update the src attribute of the image tag with the data URL of the selected image
      let str: string = e.target?.result as string;
      imagePreview!.src = str;
    };

    // Read the selected file as a data URL (base64 encoded string)
    reader.readAsDataURL(file);
  }
  updateTask() {
    //update the task in the api
    this.taskService.createTask(this.task).subscribe((t: Task) => {
      //set the local task to the updated oen
      //update the file if exist
      if (this.taskPhoto) {
        this.taskService
          .uploadTaskPhoto(this.taskPhoto, t.id!)
          .subscribe((t2: Task) => {
            this.task = t2;
            //hide the update form
            this.updateFromBool = false;
          });
      } else {
        this.updateFromBool = false;
      }
    });
  }
}
