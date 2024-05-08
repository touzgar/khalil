import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorAddedTeamToTournamentComponent } from '../error-added-team-to-tournament/error-added-team-to-tournament.component';
import { SuccessAddedTeamToTournamentComponent } from '../success-added-team-to-tournament/success-added-team-to-tournament.component';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../Tournament.model';
import { Team } from '../../team/team.model';

@Component({
  selector: 'app-add-teams-to-tournament',
  templateUrl: './add-teams-to-tournament.component.html',
  styleUrls: ['./add-teams-to-tournament.component.scss']
})
export class AddTeamsToTournamentComponent {
  tournaments: Tournament[] = [];
  teams: Team[] = [];
  filteredTournaments: Tournament[] = [];
  selectedTeams: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTeamsToTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private tournamentService: TournamentService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.data.tournamentName && this.selectedTeams.length > 0) {
      this.tournamentService.addTeamsToTournament(this.data.tournamentName, this.selectedTeams).subscribe({
        next: (response) => {
          this.dialog.open(SuccessAddedTeamToTournamentComponent, {
            width: '300px',
            data: { message: "Teams added to tournament successfully!" }
          });
          this.dialogRef.close(this.data);
        },
        error: (error) => {
          console.error("Error adding teams to tournament", error);
          this.openErrorDialog("Teams or tournament not found. Error: " + error.error);
        }
      });
    } else {
      this.openErrorDialog("Please ensure all fields are filled correctly.");
    }
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorAddedTeamToTournamentComponent, {
      width: '300px',
      data: { errorMessage: errorMessage }
    });
  }

  loadTournaments(): void {
    this.tournamentService.listeTournament().subscribe((tournaments) => {
      this.tournaments = tournaments;
      this.filteredTournaments = tournaments;
    });
  }

  loadTeams(): void {
    this.tournamentService.listeTeam().subscribe((teams) => {
      this.teams = teams;
    });
  }

  filterTournaments(value: string): void {
    this.filteredTournaments = this.tournaments.filter(t => t.tournamentName.toLowerCase().includes(value.toLowerCase()));
  }
}
