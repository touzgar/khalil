import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-manager-dialog',
  templateUrl: './error-manager-dialog.component.html',
  styleUrl: './error-manager-dialog.component.scss'
})
export class ErrorManagerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data: { errorMessage: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
