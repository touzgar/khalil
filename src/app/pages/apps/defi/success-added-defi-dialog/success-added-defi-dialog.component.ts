import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-added-defi-dialog',
 
  templateUrl: './success-added-defi-dialog.component.html',
  styleUrl: './success-added-defi-dialog.component.scss'
})
export class SuccessAddedDefiDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessAddedDefiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
