import { Component, Input } from '@angular/core';
import { Team } from '../../models/Team';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  @Input() team: Team = {};
  constructor(private router: Router) {}
  goTo() {
    this.router.navigate(['/admin/teams/' + this.team.id]);
  }
}
