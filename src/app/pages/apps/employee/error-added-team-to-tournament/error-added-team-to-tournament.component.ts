import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-added-team-to-tournament',
  templateUrl: './error-added-team-to-tournament.component.html',
  styleUrl: './error-added-team-to-tournament.component.scss'
})
export class ErrorAddedTeamToTournamentComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorAddedTeamToTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
