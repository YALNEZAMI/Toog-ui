import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  //constructor
  constructor(private router: Router, private userService: UserService) {}
  //properties
  response = {
    ok: true,
    message: '',
  };
  user: User = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  //methods
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
  register() {
    //checkings
    if (
      this.user.email == '' ||
      this.user.password == '' ||
      this.user.confirmPassword == '' ||
      this.user.name == ''
    ) {
      this.response.ok = false;
      this.response.message = 'Please fill all fields !';
    }
    if (this.user.password!.length < 6) {
      this.response.ok = false;
      this.response.message = 'Short password ! Make it longer than 6 chars';
      return;
    }
    if (this.user.password != this.user.confirmPassword) {
      this.response.ok = false;
      this.response.message = 'Passwords not match !';
      return;
    }
    this.userService.register(this.user).subscribe((res) => {
      if (res == null) {
        this.response.ok = false;
        this.response.message = 'Email alredy used !';
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
