import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-added-defi-to-tournament',
  
  templateUrl: './error-added-defi-to-tournament.component.html',
  styleUrl: './error-added-defi-to-tournament.component.scss'
})
export class ErrorAddedDefiToTournamentComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorAddedDefiToTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
