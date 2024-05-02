import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-edit-player-dialog',
  templateUrl: './success-edit-player-dialog.component.html',
  styleUrl: './success-edit-player-dialog.component.scss'
})
export class SuccessEditPlayerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessEditPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
