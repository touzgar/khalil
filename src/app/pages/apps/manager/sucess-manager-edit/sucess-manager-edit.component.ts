import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sucess-manager-edit',
  templateUrl: './sucess-manager-edit.component.html',
  styleUrl: './sucess-manager-edit.component.scss'
})
export class SucessManagerEditComponent {
  constructor(
    public dialogRef: MatDialogRef<SucessManagerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
