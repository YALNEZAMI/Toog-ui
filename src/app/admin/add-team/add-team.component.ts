import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from '../../models/Team';
import { vars } from '../../env';
import { User } from '../../models/User';
import { UserService } from '../../Services/user.service';
import { TeamService } from '../../Services/team.service';
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css',
})
export class AddTeamComponent {
  //constructor
  constructor(
    private router: Router,
    private userService: UserService,
    private teamService: TeamService
  ) {}
  //attributes
  team: Team = {
    name: '',
    members: [this.userService.getUser()],
    photo: vars.apiUri + '/teamPhoto/default_team.png',
  };
  teamPhoto: any;
  searchParticipantsKey: string = '';
  resultingParticipants: User[] = [];
  teamResponse: { error: boolean; message: string } = {
    error: false,
    message: '',
  };
  //methods
  createTeam() {
    //check exeptions
    if (this.team.name == '') {
      this.teamResponse = {
        error: true,
        message: 'Name field is required !',
      };
      return;
    }
    //create team
    this.teamService.createTeam(this.team).subscribe((t: Team) => {
      //upload team photo if exist
      if (this.teamPhoto != undefined) {
        this.teamService
          .uploadTeamPhoto(this.teamPhoto, t.id!)
          .subscribe((t2) => {
            //redirect to dashboard
            this.router.navigate(['/admin/dashbord']);
          });
      }
    });
  }
  return() {
    this.router.navigate(['/admin/dashbord']);
  }
  //project photo
  clickTeamPhoto() {
    document.getElementById('projectPhotoInput')?.click();
  }
  teamPhotoChange(e: any) {
    const imagePreview = document.getElementById(
      'teamPhotoPreview'
    ) as HTMLImageElement;
    const file = e.target!.files[0];
    //set the global file variable
    this.teamPhoto = file;

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
  //participant methods
  searchParticipant() {
    //empty key case
    if (this.searchParticipantsKey == '') {
      this.resultingParticipants = [];
      return;
    }
    this.userService
      .searchUserByName(this.searchParticipantsKey)
      .subscribe((users: any) => {
        this.resultingParticipants = users;
      });
  }
  addParticipantToTeam(member: User) {
    //reset the search key and result to empty
    this.searchParticipantsKey = '';
    this.resultingParticipants = [];
    //check if already selected
    for (let i = 0; i < this.team.members!.length; i++) {
      const m = this.team.members![i];
      if (m.id == member.id) {
        return;
      }
    }
    //add the participant to the participants array
    this.team.members!.push(member);
  }
  popTeamMember(member: User) {
    this.team.members = this.team.members?.filter((m) => {
      return m != member;
    });
  }
}
