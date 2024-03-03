import { Component, Input } from '@angular/core';
import { Team } from '../../models/Team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  constructor() {}
  @Input() team: Team = {};
}
