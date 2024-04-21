import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/pages/authentication/model/login.model';
import { Player } from '../../player/player';
import { Scrims } from '../../Scrims/Scrims.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-scrims-dialog',
  templateUrl: './scrims-dialog.component.html'
})
export class ScrimsDialogComponent implements OnInit {
  coaches: User[] = [];
  players: Player[] = [];

  constructor(
    public dialogRef: MatDialogRef<ScrimsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loadCoaches();
    this.loadPlayers();
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

  doAction(): void {
    // Create a new instance of Scrims from the form data
    const scrimsData = new Scrims();
    scrimsData.sessionName = this.data.sessionName;
    scrimsData.dateStart = new Date(this.data.dateStart).toISOString(); // Ensure date is in ISO format
    scrimsData.dateEnd = new Date(this.data.dateEnd).toISOString();     // Ensure date is in ISO format
    scrimsData.feedbacksEntraineurs = this.data.feedbacksEntraineurs;
    scrimsData.niveau = this.data.niveau;
    scrimsData.mode = this.data.mode;
    scrimsData.description = this.data.description;
    scrimsData.username = this.data.username;
    scrimsData.playerNames = this.data.playerNames;
    scrimsData.specialObjectives = Array.isArray(this.data.specialObjectives) ? this.data.specialObjectives : [this.data.specialObjectives];

    console.log("Sending data to server:", scrimsData); // Debugging: log data to console

    // Send data to the server
    this.sessionService.createScrims(scrimsData).subscribe({
        next: (response) => {
            console.log('Scrims created successfully', response);
            this.dialogRef.close({ event: 'Submit', data: response });
        },
        
        error: (error) => {
            console.error('Failed to create scrims', error);
            this.dialogRef.close({ event: 'Failed', error: error });
        }
    });
    
}


  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
