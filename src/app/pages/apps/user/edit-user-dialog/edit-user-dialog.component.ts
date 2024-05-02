import { Component, Inject, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErorManagerEditDialogComponent } from '../../manager/eror-manager-edit-dialog/eror-manager-edit-dialog.component';
import { ErrorManagerDialogComponent } from '../../manager/error-manager-dialog/error-manager-dialog.component';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'] // Ensure the path is correct
})
export class EditUserDialogComponent {
  // Define a userData property with a structure that matches your user data model
 // Define a userData property with a structure that matches your user data model
userData = {
  username: '',
  email: '',
  password: '', // Include the password field
  // roles: ''
};
@ViewChild('emailField') emailField: NgModel;


  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog:MatDialog
  ) {
    // If data is passed to the dialog, initialize userData with it
    if (data) {
      this.userData = { ...data };
    }
  }

  // Method to handle form submission
  onSubmit() {
    if (!this.emailField.valid) {
      this.dialog.open(ErorManagerEditDialogComponent, {
        data: { errorMessage: "Please enter a valid email address." }
      });
      return; // Prevent closing the dialog if the form is invalid
    }
    
    // Close the dialog and return the updated userData
    this.dialogRef.close(this.userData);
  }

  // Method to handle dialog cancellation
  onCancel(): void {
    // Close the dialog without returning any data
    this.dialogRef.close();
  }
}
