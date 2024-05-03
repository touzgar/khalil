import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-added-achivement',
    templateUrl: './error-added-achivement.component.html',
  styleUrl: './error-added-achivement.component.scss'
})
export class ErrorAddedAchivementComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorAddedAchivementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
