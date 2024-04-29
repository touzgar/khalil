import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/pages/authentication/model/login.model';
import { Player } from '../../player/player';
import { Scrims } from '../../Scrims/Scrims.model';
import { Team } from '../../team/team.model';
import { ScrimsSuccessDialogComponentComponent } from '../scrims-success-dialog-component/scrims-success-dialog-component.component';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-scrims-dialog',
  templateUrl: './scrims-dialog.component.html'
})
export class ScrimsDialogComponent implements OnInit {
  coaches: User[] = [];
  players: Player[] = [];
  teams:Team[]=[];
  selectedTeam: string[] = [];
  isTeamSelected = false; 
  constructor(
    public dialogRef: MatDialogRef<ScrimsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private sessionService: SessionService,public dialog :MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCoaches();
    this.loadPlayers();
    this.loadTeams();
  }
  loadTeams(): void {
    this.sessionService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
    }, error => {
      console.error('Failed to load teams', error);
    });
  }
  loadCoaches(): void {
    this.sessionService.getCoaches().subscribe({
      next: (coaches) => this.coaches = coaches,
      error: (error) => console.error('Error fetching coaches', error)
    });
  }

  loadPlayers(): void {
    this.sessionService.getPlayers().subscribe({
      next: (players) => this.players = players,
      error: (error) => console.error('Error fetching players', error)
    });
  }
  onTeamChange() {
    if (this.selectedTeam && this.selectedTeam.length > 0) {
      this.isTeamSelected = true; // Enable player selection if one or more teams are selected
      this.sessionService.getPlayersByTeamNames(this.selectedTeam).subscribe({
        next: (players) => {
          this.players = players; // Update the players' dropdown with the new list
        },
        error: (error) => {
          console.error(`Error fetching players for selected teams:`, error);
          this.players = []; // Clear the players if there's an error
        }
      });
    } else {
      this.isTeamSelected = false; // Disable player selection if no team is selected
      this.players = []; // Clear the player list
    }
  }
  
  

  doAction(): void {
    const scrimsData = new Scrims();
    // populate scrimsData from this.data
    scrimsData.sessionName = this.data.sessionName;
    scrimsData.dateStart = new Date(this.data.dateStart).toISOString();
    scrimsData.dateEnd = new Date(this.data.dateEnd).toISOString();
    scrimsData.feedbacksEntraineurs = this.data.feedbacksEntraineurs;
    scrimsData.niveau = this.data.niveau;
    scrimsData.mode = this.data.mode;
    scrimsData.description = this.data.description;
    scrimsData.username = this.data.username;
    scrimsData.teamName = this.data.selectedTeam; 
    scrimsData.playerNames = this.data.playerNames;
    scrimsData.specialObjectives = Array.isArray(this.data.specialObjectives) ? this.data.specialObjectives : [this.data.specialObjectives];

    this.sessionService.createScrims(scrimsData).subscribe({
        next: (response) => {
            console.log('Scrims created successfully', response);
            this.dialogRef.close({ event: 'Submit', data: response });
            this.openSuccessDialog();
        },
        error: (error) => {
            console.error('Failed to create scrims', error);
            this.dialogRef.close({ event: 'Failed', error: error });
        }
    });
  }

  openSuccessDialog() {
    this.dialog.open(ScrimsSuccessDialogComponentComponent, {
      data: {
        message: 'Scrims Successfully Added'
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
