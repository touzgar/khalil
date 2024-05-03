import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorAddedTeamToTournamentComponent } from '../error-added-team-to-tournament/error-added-team-to-tournament.component';
import { SuccessAddedTeamToTournamentComponent } from '../success-added-team-to-tournament/success-added-team-to-tournament.component';

@Component({
  selector: 'app-add-teams-to-tournament',
  templateUrl: './add-teams-to-tournament.component.html',
  styleUrl: './add-teams-to-tournament.component.scss'
})
export class AddTeamsToTournamentComponent {

  constructor(
    public dialogRef: MatDialogRef<AddTeamsToTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    // Assuming data contains { teamName: '', coachName: '' }
    if (this.data.tournamentName && this.data.teamName) {
      // Data is valid
      this.dialogRef.close(this.data);
     // this.openSuccessDialog();
    }else {
      this.openErrorDialog("Please ensure all fields are filled correctly.");
    }
  }
  private openSuccessDialog(): void {
    this.dialog.open(SuccessAddedTeamToTournamentComponent, {
      width: '300px',
      data: { message: "Team added to tournament successfully!" }
    });
  }
  private openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorAddedTeamToTournamentComponent, {
      width: '300px',
      data: { errorMessage: errorMessage }
    });
  }


}
