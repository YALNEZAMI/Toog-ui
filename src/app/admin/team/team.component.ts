import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { UserService } from '../../Services/user.service';
import { Team } from '../../models/Team';
import { TeamService } from '../../Services/team.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-team-view',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamViewComponent {
  //constructor
  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService,
    private router: Router
  ) {
    //retrieve the team from the api
    const teamId = this.route.snapshot.paramMap.get('id') || '';
    this.teamService.getTeamById(teamId).subscribe((t) => {
      console.log(t);
      this.team = t;
    });
  }
  //attributes
  team: Team = { name: '' };
  currentUser: User = this.userService.getUser();
  searchParticipantsKey: string = '';
  resultingMembers: User[] = [];
  deleteConfirm: boolean = false;
  //methods
  //return to dashbord method
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
  deleteMember(member: User) {
    this.teamService.deleteMember(this.team.id!, member.id!).subscribe((t) => {
      console.log(t);
      this.team = t;
    });
  }
  //participant methods
  searchParticipant() {
    //empty key case
    if (this.searchParticipantsKey == '') {
      this.resultingMembers = [];
      return;
    }
    this.userService
      .searchUserByName(this.searchParticipantsKey)
      .subscribe((users: any) => {
        this.resultingMembers = users;
      });
  }
  addToTeam(member: User) {
    //reset the search key and result to empty
    this.searchParticipantsKey = '';
    this.resultingMembers = [];
    //check if already selected
    for (let i = 0; i < this.team.members!.length; i++) {
      const m = this.team.members![i];
      if (m.id == member.id) {
        return;
      }
    }
    //add the participant to the participants array
    this.teamService.addToTeam(this.team.id!, member.id!).subscribe((t) => {
      console.log(t);
      this.team = t;
    });
  }
  popTeamMember(member: User) {
    this.team.members = this.team.members?.filter((m) => {
      return m != member;
    });
  }
  deleteTeam() {
    this.teamService.deleteTeam(this.team.id!).subscribe((n) => {
      this.return();
    });
  }
  makeProject() {
    this.router.navigate(['/admin/addProject'], {
      queryParams: { teamId: this.team.id! },
    });
  }
  goToUpdateTeam() {
    this.router.navigate(['/admin/addTeam'], {
      queryParams: { update: true, teamId: this.team.id },
    });
  }
}
