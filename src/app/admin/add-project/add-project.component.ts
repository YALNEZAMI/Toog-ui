import { Component } from '@angular/core';
import { Project } from '../../models/Project';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/User';
import { Task } from '../../models/Task';
import { Router } from '@angular/router';
import { ProjectService } from '../../Services/project.service';
import { vars } from '../../env';
import { TaskService } from '../../Services/task.service';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
})
export class AddProjectComponent {
  //constructor
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private router: Router
  ) {}
  //attributes
  project: Project = {
    name: '',
    description: '',
    owner: this.userService.getUser(),
    photo: vars.apiUri + '/projectPhoto/default_project.png',
    participants: [
      this.userService.getUser(),
      // { name: 'yaser' }, { name: 'munir' }
    ],
  };
  searchParticipantsKey: string = '';
  resultingParticipants: User[] = [
    // { name: 'yaser' }, { name: 'munir' }
  ];
  task: Task = {
    name: '',
    description: '',
    order: 0,
    deadLine: new Date(),
    participants: [
      // { name: 'yaser' }, { name: 'munir' }
    ],
    photo: vars.apiUri + '/taskPhoto/default_task.png',
  };
  tasks: Task[] = [];
  taskResponse: {
    error: boolean;
    message: string;
  } = {
    error: false,
    message: '',
  };
  projectResponse: {
    error: boolean;
    message: string;
  } = {
    error: false,
    message: '',
  };
  //methods
  getParticipants() {
    return this.project.participants;
  }
  addProject() {
    //check exeptions
    if (this.project.name == '') {
      this.projectResponse = {
        error: true,
        message: 'Project name is required !',
      };
      return;
    }
    this.projectService
      .createProject(this.project)
      .subscribe((project: Project) => {
        console.log(project);
        //add tasks
        for (let i = 0; i < this.tasks.length; i++) {
          const task = this.tasks[i];
          task.project_id = project.id;
          this.taskService.createTask(task).subscribe((t) => {
            console.log(t);
          });
        }
      });
  }
  searchParticipant() {
    //empty key case
    if (this.searchParticipantsKey == '') {
      this.resultingParticipants = [];
      return;
    }
    this.userService
      .searchUserByName(this.searchParticipantsKey)
      .subscribe((users: any) => {
        console.log(users);
        users = users.filter((u: User) => {
          u.id != this.userService.getUser().id;
        });

        this.resultingParticipants = users;
      });
  }
  addParticipantToProject(participant: User) {
    //check if already selected
    if (this.project.participants!.includes(participant)) {
      return;
    }
    //reset the search key and result to empty
    this.searchParticipantsKey = '';
    this.resultingParticipants = [];
    //add the participant to the participants array
    this.project.participants!.push(participant);
  }
  addTask() {
    //check required fields

    if (this.task.name == '') {
      this.taskResponse = {
        error: true,
        message: 'Project name is required !',
      };
      return;
    }
    console.log(this.task);

    const task = {
      name: this.task.name,
      description: this.task.description,
      deadLine: this.task.deadLine,
      participants: this.task.participants,
      order: this.task.order,
    };

    this.tasks.push(task);
    //reset task
    this.task = {
      name: '',
      description: '',
      order: 0,
      deadLine: new Date(),
      participants: [
        // { name: 'yaser' }, { name: 'munir' }
      ],
    };
  }
  addParticipantToTask(participant: User) {
    console.log('addprtto task');

    //check if already selected
    if (this.task.participants?.includes(participant)) {
      return;
    }
    this.task.participants?.push(participant);
  }
  popProjectParticipant(participant: User) {
    this.project.participants = this.project.participants?.filter((p) => {
      p != participant;
    });
    //pop it from current task
    this.popTaskParticipant(participant);
    //pop it from all tasks
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      task.participants = task.participants?.filter((p) => {
        p != participant;
      });
    }
  }
  popTaskParticipant(participant: User) {
    console.log('poptaskspart');

    this.task.participants = this.task.participants?.filter((p) => {
      p != participant;
    });
    console.log(this.task.participants);
  }
  isInculdedInTaskParticipants(participant: User): boolean {
    return this.task.participants!.includes(participant);
  }
  //return to dashbord method
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
  popTask(task: Task) {
    this.tasks = this.tasks.filter((t) => {
      t != task;
    });
  }
}
