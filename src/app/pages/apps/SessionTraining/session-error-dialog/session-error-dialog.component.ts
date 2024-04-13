// session-error-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-session-error-dialog',
  templateUrl: './session-error-dialog.component.html',
  styleUrls:['./session-error-dialog.component.scss']
})
export class SessionErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SessionErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public errorMessage: string
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
