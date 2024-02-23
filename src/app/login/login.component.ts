import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //constructor
  constructor(private router: Router, private userService: UserService) {}

  //properties
  response = {
    ok: true,
    message: '',
  };
  user: User = {
    email: '',
    password: '',
  };
  //methods
  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
  login() {
    //checking
    if (this.user.email == '' || this.user.password == '') {
      this.response.ok = false;
      this.response.message = 'Please fill all fields !';
    }
    //request
    this.userService.login(this.user).subscribe((res) => {
      console.log(res);

      if (res == null) {
        this.response.ok = false;
        this.response.message = 'Email or password is incorrect !';
        // setTimeout(() => {
        //   this.response.ok = true;
        //   console.log(true);
        // }, 3000);
      } else {
        this.router.navigate(['/admin/dashbord']);
      }
    });
  }
}
