import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/pages/authentication/model/login.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss']
})
export class AddUserPopupComponent implements OnInit {
  userData: User = new User(); // Initialize userData
  uploadedImage:File;
  imagePath:any;

  constructor(
    public dialogRef: MatDialogRef<AddUserPopupComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Create the payload with the role in lowercase
    const payload = {
      username: this.userData.username,
      password: this.userData.password,
      email: this.userData.email,
      role: this.userData.roleName, // Assuming 'role' is the correct property name and it contains 'Admin' or 'Manager'
     
    };

    
    this.userService.addUserWithRole(payload).subscribe({
      next: (newUser) => {
        console.log("User added successfully", newUser);
        this.dialogRef.close(newUser);
      },
      error: (error) => {
        console.error('There was an error adding the user:', error);
      }
    });
  }
  onImageUpload(event:any){
    this.uploadedImage=event.target.files[0];
    var reader=new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload=(_event)=> {this.imagePath=reader.result;}  
  }
  
    
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
