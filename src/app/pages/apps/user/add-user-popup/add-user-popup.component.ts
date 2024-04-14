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
  loading: boolean = false;
  progress: number = 0;
  constructor(
    public dialogRef: MatDialogRef<AddUserPopupComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;  // Set loading to true to show spinner

    const payload = {
      username: this.userData.username,
      password: this.userData.password,
      email: this.userData.email,
      role: this.userData.roleName.toLowerCase(),
    };

    this.userService.addUserWithRole(payload).subscribe({
      next: (newUser) => {
        console.log("User added successfully", newUser);
        this.dialogRef.close(newUser); // Close dialog after successful operation
      },
      error: (error) => {
        console.error('There was an error adding the user:', error);
        this.loading = false; // Reset loading on error
      },
      complete: () => this.loading = false // Ensure loading is reset when operation is complete
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
