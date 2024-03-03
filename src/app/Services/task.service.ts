import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { vars } from '../env';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  createTask(Task: Task) {
    return this.httpClient.post(vars.apiUri + '/task', Task);
  }
  uploadTaskPhoto(file: File, taskId: string) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('taskId', taskId);
    return this.httpClient.post(vars.apiUri + '/task/uploadPhoto', fd);
  }
}
