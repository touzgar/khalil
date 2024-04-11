import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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


  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Data passed when the dialog is called
  ) {
    // If data is passed to the dialog, initialize userData with it
    if (data) {
      this.userData = { ...data };
    }
  }

  // Method to handle form submission
  onSubmit() {
    // Close the dialog and return the updated userData
    this.dialogRef.close(this.userData);
  }

  // Method to handle dialog cancellation
  onCancel(): void {
    // Close the dialog without returning any data
    this.dialogRef.close();
  }
}
