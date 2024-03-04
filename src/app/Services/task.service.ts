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

  createTask(task: Task) {
    return this.httpClient.post(vars.apiUri + '/task', task);
  }
  getTeamsWithMemberId(participantId: string) {
    return this.httpClient.get(
      vars.apiUri + '/task/withParticipantId/' + participantId
    );
  }
  uploadTaskPhoto(file: File, taskId: string) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('taskId', taskId);
    return this.httpClient.post(vars.apiUri + '/task/uploadTaskPhoto', fd);
  }
  getTasksByProjectId(projectId: string) {
    return this.httpClient.get(
      vars.apiUri + '/task/getTasksByProjectId/' + projectId
    );
  }
}
