import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-session-success-dialog',
  templateUrl: './session-success-dialog.component.html',
  styleUrls:['./session-success-dialog.component.scss']
})
export class SessionSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SessionSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
