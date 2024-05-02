import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-edit-club-dialog',
   templateUrl: './success-edit-club-dialog.component.html',
  styleUrl: './success-edit-club-dialog.component.scss'
})
export class SuccessEditClubDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessEditClubDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
