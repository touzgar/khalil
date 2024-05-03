import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-remove-team-from-tournament',
  templateUrl: './success-remove-team-from-tournament.component.html',
  styleUrl: './success-remove-team-from-tournament.component.scss'
})
export class SuccessRemoveTeamFromTournamentComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessRemoveTeamFromTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
