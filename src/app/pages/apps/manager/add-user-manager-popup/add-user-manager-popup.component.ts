import { Component, Inject, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/pages/authentication/model/login.model';
import { UserService } from '../../user/user.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ErrorManagerDialogComponent } from '../error-manager-dialog/error-manager-dialog.component';
import { SuccessManagerDialogComponent } from '../success-manager-dialog/success-manager-dialog.component';

@Component({
  selector: 'app-add-user-manager-popup',
  templateUrl: './add-user-manager-popup.component.html',
  styleUrl: './add-user-manager-popup.component.scss'
})
export class AddUserManagerPopupComponent {
  userData: User = new User(); 
  loading: boolean = false;
  progress: number = 0;
  existingUsernames: Set<string>;
  existingEmails: Set<string>;
  @ViewChild('emailField') emailField: NgModel
  constructor(
    public dialogRef: MatDialogRef<AddUserManagerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private userService: UserService,private dialog: MatDialog,
   
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Check if the email field is valid
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
  
    this.loading = true;
    const payload = {
      username: this.userData.username,
      password: this.userData.password,
      email: this.userData.email,
      role: this.userData.roleName
    };
  
    // Proceed with form submission logic
    this.userService.addManagerWithRole(payload).subscribe({
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
        this.displayError('Failed to add user: ' + (error.error.message || 'Unknown error'));
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }
    displayError(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: { message: message }
    });
  }

    
  
  onCancel(): void {
    this.dialogRef.close();
  }

}
