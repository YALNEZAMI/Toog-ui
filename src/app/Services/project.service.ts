import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { vars } from '../env';
import { Observable, Subject } from 'rxjs';
import { Project } from '../models/Project';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  createProject(project: Project) {
    return this.httpClient.post(vars.apiUri + '/project', project);
  }
  uploadProjectPhoto(file: File, projectId: string) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('projectId', projectId);
    return this.httpClient.post(
      vars.apiUri + '/project/uploadProjectPhoto',
      fd
    );
  }
  getProjects() {
    return this.httpClient.get(
      vars.apiUri + '/project/withParticipant/' + this.userService.getUser().id
    );
  }
}
