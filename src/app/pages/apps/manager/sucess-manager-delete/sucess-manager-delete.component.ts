import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sucess-manager-delete',
  templateUrl: './sucess-manager-delete.component.html',
  styleUrl: './sucess-manager-delete.component.scss'
})
export class SucessManagerDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<SucessManagerDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
