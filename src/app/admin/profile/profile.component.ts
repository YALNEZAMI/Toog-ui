import { Component } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../Services/user.service';
import { vars } from '../../env';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  //constructor
  constructor(private userService: UserService, private router: Router) {}
  //properties
  env = vars;
  response: any = {
    error: false,
    success: false,
    message: '',
  };
  file: any;
  isAvailableName: boolean = true;
  currentName = this.userService.getUser().name;
  user: User = {
    id: this.userService.getUser().id,
    name: this.userService.getUser().name,
    email: this.userService.getUser().email,
    password: '',
    confirmPassword: '',
    profilePhoto: this.userService.getUser().profilePhoto,
    theme: this.userService.getUser().theme,
  };
  //methods
  changeFile(event: any) {
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
  update() {
    //exeptions
    if (this.user.password != this.user.confirmPassword) {
      this.response.error = true;
      this.response.message = 'Passwords do not match !';
      return;
    }
    if (this.user.password!.length < 6 && this.user.password! != '') {
      this.response.error = true;
      this.response.message = 'Passwords is so short !';
      return;
    }
    //update the theme locally
    if (this.user.theme == 'white') {
      document.body.style.backgroundColor = 'white';
    } else {
      document.body.style.backgroundColor = 'black';
    }
    const usertoUpdate: User = this.user;

    this.userService.updateUser(usertoUpdate).subscribe((userUpdated: User) => {
      //set new user in store
      this.userService.setUser(userUpdated);
      //update profile photo
      if (this.file !== undefined) {
        this.userService
          .uploadProfilePhoto(this.file, userUpdated.id!)
          .subscribe((updatedUser: User) => {
            //set user in the store
            this.userService.setUser(updatedUser);
          });
      }
      //success message
      this.response.success = true;
      this.response.message = 'Your profile has been updated successfully !';
    });
  }
  //check availablity of name
  checkNameAvailablity(): void {
    this.userService.isAvailableName(this.user.name!).subscribe((res) => {
      this.isAvailableName = res;
    });
  }
  //return to dashbord method
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
}
