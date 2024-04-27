import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-materiel-sucess-dialog',
  templateUrl: './materiel-sucess-dialog.component.html',
  styleUrl: './materiel-sucess-dialog.component.scss'
})
export class MaterielSucessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MaterielSucessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
