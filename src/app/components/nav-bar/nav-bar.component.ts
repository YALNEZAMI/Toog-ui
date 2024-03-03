import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { vars } from '../../env';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(private userService: UserService, private router: Router) {}
  env = vars;

  getUserName() {
    return this.userService.getUser().name;
  }
  getUserPhoto() {
    return this.userService.getUser().profilePhoto;
  }
  goToProfile() {
    this.router.navigate(['/admin/profile']);
  }
  formProject() {
    this.router.navigate(['/admin/addProject']);
  }
}
