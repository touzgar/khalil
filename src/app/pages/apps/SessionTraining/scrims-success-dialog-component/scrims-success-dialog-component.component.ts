import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-scrims-success-dialog-component',
  templateUrl: './scrims-success-dialog-component.component.html',
  styleUrl: './scrims-success-dialog-component.component.scss'
})
export class ScrimsSuccessDialogComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<ScrimsSuccessDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
