import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../Tournament.model';
import { Team } from '../../team/team.model';

@Component({
  selector: 'app-remove-teams-to-tournament',
  templateUrl: './remove-teams-to-tournament.component.html',
  styleUrls: ['./remove-teams-to-tournament.component.scss']
})
export class RemoveTeamsToTournamentComponent {
  tournaments: Tournament[] = [];
  teams: Team[] = [];
  filteredTournaments: Tournament[] = [];
  selectedTeams: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<RemoveTeamsToTournamentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tournamentService: TournamentService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRemoveClick(): void {
    if (this.data.tournamentName && this.selectedTeams.length > 0) {
      this.dialogRef.close({
        tournamentName: this.data.tournamentName,
        teamNames: this.selectedTeams
      });
    }
  }

  loadTournaments(): void {
    this.tournamentService.listeTournament().subscribe((tournaments) => {
      this.tournaments = tournaments;
      this.filteredTournaments = tournaments;
    });
  }

  onTournamentChange(): void {
    if (this.data.tournamentName) {
      this.tournamentService.getTeamsByTournament(this.data.tournamentName).subscribe((teams) => {
        this.teams = teams;
        this.selectedTeams = []; // Clear selected teams when tournament changes
      });
    }
  }

  filterTournaments(value: string): void {
    this.filteredTournaments = this.tournaments.filter(t => t.tournamentName.toLowerCase().includes(value.toLowerCase()));
  }
}
