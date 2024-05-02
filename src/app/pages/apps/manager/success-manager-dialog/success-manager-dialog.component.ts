import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-manager-dialog',
  templateUrl: './success-manager-dialog.component.html',
  styleUrl: './success-manager-dialog.component.scss'
})
export class SuccessManagerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
