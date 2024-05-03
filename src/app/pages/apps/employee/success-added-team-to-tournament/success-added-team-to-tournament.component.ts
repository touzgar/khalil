import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-added-team-to-tournament',
  templateUrl: './success-added-team-to-tournament.component.html',
  styleUrl: './success-added-team-to-tournament.component.scss'
})
export class SuccessAddedTeamToTournamentComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessAddedTeamToTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
