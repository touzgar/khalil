import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sucess-added-player-dialog',
  
  templateUrl: './sucess-added-player-dialog.component.html',
  styleUrl: './sucess-added-player-dialog.component.scss'
})
export class SucessAddedPlayerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SucessAddedPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
