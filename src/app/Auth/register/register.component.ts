import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserService } from '../../Services/user.service';
import { vars } from '../../env';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  //constructor
  constructor(private router: Router, private userService: UserService) {
    document.body.style.backgroundColor = 'white';
  }
  //properties
  env = vars;
  response: any = {
    ok: true,
    message: '',
  };
  file: any;
  isAvailableName: boolean = false;
  user: User = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePhoto: this.env.apiUri + '/default_user.png',
    theme: 'white',
  };

  //methods
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
  //check availablity of name
  checkNameAvailablity(): void {
    this.userService.isAvailableName(this.user.name!).subscribe((res) => {
      this.isAvailableName = res;
    });
  }

  register() {
    //checking exeptions
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
    //register user
    this.userService.register(this.user).subscribe((createdUser) => {
      if (createdUser == null) {
        this.response.ok = false;
        this.response.message = 'Email alredy used !';
      } else {
        //set user in the store
        this.userService.setUser(createdUser);
        //upload the profile photo if necessary
        if (this.file !== undefined) {
          this.userService
            .uploadProfilePhoto(this.file, createdUser.id)
            .subscribe((updatedUser: User) => {
              //set user in the store
              this.userService.setUser(updatedUser);
              //redirect to dashbord
              setTimeout(() => {
                this.router.navigate(['/admin/dashbord']);
              }, 1000);
            });
        } else {
          this.router.navigate(['/admin/dashbord']);
        }
      }
    });
  }
  changeFile(event: any) {
    const input = document.getElementById(
      'profilephotoInput'
    ) as HTMLInputElement;
    const imagePreview = document.getElementById(
      'imagePreview'
    ) as HTMLImageElement;
    const file = event.target!.files[0];
    //set the global file variable
    this.file = file;

    // Create a FileReader object to read the file
    const reader = new FileReader();

    // Set up the FileReader to display the image when loaded
    reader.onload = function (e) {
      // Update the src attribute of the image tag with the data URL of the selected image
      let str: string = e.target?.result as string;
      imagePreview!.src = str;
    };

    // Read the selected file as a data URL (base64 encoded string)
    reader.readAsDataURL(file);
  }
  clickPhoto() {
    document.getElementById('profilephotoInput')?.click();
  }
}
