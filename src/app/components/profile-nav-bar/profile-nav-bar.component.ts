import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-nav-bar',
  templateUrl: './profile-nav-bar.component.html',
  styleUrl: './profile-nav-bar.component.css',
})
export class ProfileNavBarComponent {
  //constructor
  constructor(private userService: UserService, private router: Router) {}
  //methods

  logout = () => {
    this.userService.setUser({});
    this.router.navigate(['/auth/login']);
  };
  myProjects = () => {};
  myTasks = () => {};

  //items
  items: item[] = [
    {
      name: 'logout',
      classes: {
        'bg-red-500': true,
        'p-2': true,
      },
      method: this.logout,
    },
    {
      name: 'projects',
      classes: {
        'bg-blue-500': true,
      },
      method: this.myProjects,
    },

    {
      name: 'teams',
      classes: {
        'bg-green-500': true,
      },
      method: this.myTasks,
    },
  ];
}
interface item {
  name: string;
  classes: any;
  method: any;
}
