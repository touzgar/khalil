import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-club-dialog-added',
  templateUrl: './success-club-dialog-added.component.html',
  styleUrl: './success-club-dialog-added.component.scss'
})
export class SuccessClubDialogAddedComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessClubDialogAddedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
