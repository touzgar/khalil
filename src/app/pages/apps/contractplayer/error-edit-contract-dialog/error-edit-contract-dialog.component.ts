import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-error-edit-contract-dialog',
  
  templateUrl: './error-edit-contract-dialog.component.html',
  styleUrl: './error-edit-contract-dialog.component.scss'
})
export class ErrorEditContractDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorEditContractDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
