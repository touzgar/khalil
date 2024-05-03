import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-succes-added-contract',
 
  templateUrl: './succes-added-contract.component.html',
  styleUrl: './succes-added-contract.component.scss'
})
export class SuccesAddedContractComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccesAddedContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
