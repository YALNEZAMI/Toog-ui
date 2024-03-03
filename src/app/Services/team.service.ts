import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { vars } from '../env';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private httpClient: HttpClient) {}

  createTeam(team: Team) {
    return this.httpClient.post(vars.apiUri + '/team', team);
  }
  getTeamsWithMemberId(memberId: string) {
    return this.httpClient.get(vars.apiUri + '/team/withMemberId/' + memberId);
  }
  uploadTeamPhoto(file: File, teamId: string) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('teamId', teamId);
    return this.httpClient.post(vars.apiUri + '/team/uploadTeamPhoto', fd);
  }
}
