import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../Services/team.service';
import { Team } from '../../models/Team';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent {
  //constructor
  constructor(
    private router: Router,
    private teamService: TeamService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    const mine = this.route.snapshot.queryParamMap.get('mine');
    if (mine) {
      //get my teams where am owner
      this.teamService
        .getTeamsWithOwnerId(this.userService.getUser().id!)
        .subscribe((teams: any) => {
          this.teams = teams;
        });
    } else {
      //get initial teams
      this.teamService
        .getTeamsWithMemberId(this.userService.getUser().id!)
        .subscribe((teams: any) => {
          this.teams = teams;
        });
    }
  }
  //attributes
  teams: Team[] = [];
  //methods
  //return to dashbord method
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
}
