import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-tournament-added-dialog',
  templateUrl: './success-tournament-added-dialog.component.html',
  styleUrl: './success-tournament-added-dialog.component.scss'
})
export class SuccessTournamentAddedDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessTournamentAddedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
