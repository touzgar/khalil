import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logiciel-success-dialog',
 
  templateUrl: './logiciel-success-dialog.component.html',
  styleUrl: './logiciel-success-dialog.component.scss'
})
export class LogicielSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogicielSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
