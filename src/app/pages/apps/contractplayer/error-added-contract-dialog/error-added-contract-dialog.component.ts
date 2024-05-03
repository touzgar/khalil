import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-added-contract-dialog',
   templateUrl: './error-added-contract-dialog.component.html',
  styleUrl: './error-added-contract-dialog.component.scss'
})
export class ErrorAddedContractDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorAddedContractDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
