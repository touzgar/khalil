import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-remove-team-from-tournament',
  templateUrl: './error-remove-team-from-tournament.component.html',
  styleUrl: './error-remove-team-from-tournament.component.scss'
})
export class ErrorRemoveTeamFromTournamentComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorRemoveTeamFromTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
