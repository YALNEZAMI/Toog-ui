import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  //constructor
  constructor(private router: Router, private userService: UserService) {
    document.body.style.backgroundColor = 'white';

    this.userService.subscribeToUser().subscribe((user) => {});
  }

  //properties
  response = {
    ok: true,
    message: '',
  };
  user: User = {
    email: 'yaserAlnezami@gmail.com',
    password: '111111',
  };
  //methods
  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
  setUser(user: any) {
    user = {
      id: 'aaa',
      name: 'aaa',
    };
    this.userService.setUser(user);
  }

  login() {
    //checking
    if (this.user.email == '' || this.user.password == '') {
      this.response.ok = false;
      this.response.message = 'Please fill all fields !';
    }
    //request
    this.userService.login(this.user).subscribe((res) => {
      if (res == null) {
        this.response.ok = false;
        this.response.message = 'Email or password is incorrect !';
      } else {
        //set user in the store
        this.userService.setUser(res);
        //redirect to dashbord
        this.router.navigate(['/admin/dashbord']);
      }
    });
  }
}
