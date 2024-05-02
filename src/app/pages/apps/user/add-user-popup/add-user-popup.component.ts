import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/pages/authentication/model/login.model';
import { ErrorManagerDialogComponent } from '../../manager/error-manager-dialog/error-manager-dialog.component';
import { SuccessManagerDialogComponent } from '../../manager/success-manager-dialog/success-manager-dialog.component';
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
  @ViewChild('emailField') emailField: NgModel
  constructor(
    public dialogRef: MatDialogRef<AddUserPopupComponent>,
    private userService: UserService, public dialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.emailField && !this.emailField.valid) {
      // Open the error dialog with the message
      this.dialog.open(ErrorManagerDialogComponent, {
        width: '300px',
        data: {
          errorMessage: 'Please enter a valid email address.'
        }
      });
      return; // Stop further execution
    }
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
        this.dialogRef.close(newUser); 
        this.dialog.open(SuccessManagerDialogComponent, {
          width: '300px',
          data: { message: "User added successfully" }
        });
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
