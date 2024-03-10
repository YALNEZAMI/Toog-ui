import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../Services/project.service';
import { Project } from '../../models/Project';
import { Task } from '../../models/Task';
import { TaskService } from '../../Services/task.service';
import { UserService } from '../../Services/user.service';
import { vars } from '../../env';
import { User } from '../../models/User';

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
    //set the project id to the initial task
    this.task.projectId = projectId;
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
  deleteConfirm: boolean = false;
  task: Task = {
    name: '',
    description: '',
    order: 0,
    deadLine: new Date(),
    participants: [
      // { name: 'yaser' }, { name: 'munir' }
    ],
    photo: vars.apiUri + '/default_task.png',
    projectId: this.project.id,
  }; //task to add
  taskResponse: {
    error: boolean;
    message: string;
  } = {
    error: false,
    message: '',
  };
  taskPhoto: any;
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
  deleteProject() {
    this.projectService.deleteProject(this.project.id!).subscribe((n) => {
      this.return();
    });
  }
  //task methods
  addTask() {
    //check required fields

    if (this.task.name == '') {
      this.taskResponse = {
        error: true,
        message: 'Project name is required !',
      };
      return;
    }

    //add task request
    this.taskService.createTask(this.task).subscribe((t) => {
      console.log(t);

      //add the created task to the project tasks array
      this.tasks.push(t);
      //hide the add form
      this.displayAddTaskForm();
    });
    //reset task
    this.task = {
      name: '',
      description: '',
      order: 0,
      deadLine: new Date(),
      participants: [
        // { name: 'yaser' }, { name: 'munir' }
      ],
      photo: vars.apiUri + '/default_task.png',
      projectId: this.project.id,
    };
    //reset default img
    const photo = document.getElementById(
      'taskPhotoPreview'
    ) as HTMLImageElement;
    photo.src = vars.apiUri + '/default_task.png';
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
      return p != participant;
    });
  }
  isInculdedInTaskParticipants(participant: User): boolean {
    const singleton =
      this.task.participants?.filter((p) => {
        return (participant.id = p.id);
      }) || [];
    if ((singleton.length = 0)) {
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
  displayAddTaskForm() {
    let addTaskForm = document.getElementById('addTaskForm') as HTMLDivElement;
    if (addTaskForm.style.display == 'flex') {
      addTaskForm.style.display = 'none';
    } else {
      addTaskForm.style.display = 'flex';
    }
  }
  goToUpdateProject() {
    this.router.navigate(['/admin/addProject'], {
      queryParams: { update: true, projectId: this.project.id! },
    });
  }
}
