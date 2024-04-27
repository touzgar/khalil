import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-installation-success-dialog',
  templateUrl: './installation-success-dialog.component.html',
  styleUrl: './installation-success-dialog.component.scss'
})
export class InstallationSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InstallationSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
