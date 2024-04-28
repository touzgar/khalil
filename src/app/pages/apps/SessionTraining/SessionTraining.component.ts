import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddSessionTrainingComponent } from './add/add.component';
import { Session } from './session.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './session.service';
import { Player } from '../player/player';
import { User } from '../../authentication/model/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionErrorDialogComponent } from './session-error-dialog/session-error-dialog.component';
import { SessionSuccessDialogComponent } from './session-success-dialog/session-success-dialog.component';
import { Scrims } from '../Scrims/Scrims.model';
import { ScrimsDialogComponent } from './scrims-dialog/scrims-dialog.component';
import { Team } from '../team/team.model';
import { CalendarEvent } from 'angular-calendar';
import { add } from 'date-fns';





@Component({
  templateUrl: './SessionTraining.component.html',
  styleUrls:['./SessionTraining.component.scss']
})
export class AppSessionTrainingComponent implements AfterViewInit {
  session:Session[];
  titleSession!:string;
  allSession!:Session[];
  searchTerm!:string;
  coaches: User[] = [];
  players: Player[] = [];
  sessions: Session[] = [];
  teams:Team[];
  view: 'month' | 'week' | 'day' = 'month'; // default to month view
  viewDate: Date = new Date();
  event = [];
  scrims:Scrims[] = [];
  // viewDate: Date = new Date(); // Today's date for calendar
   events: CalendarEvent[] = []; // Events to be shown on the calendar
  @ViewChild(MatTable, { static: false }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'sessionName',
    'dateStart',
    'dateEnd',
    'objectifs',
    'feedbacksEntraineurs',
    'coachName',
    'playerName',
    'action'
  ];
  

  dataSource = new MatTableDataSource<Session>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  activeDayIsOpen: boolean;
  displaySessionDetails: any = null; // Holds details for the session to be displayed

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private sessionService:SessionService,private snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerSession();
    this.loadAllData();
  }
  loadAllData() {
    this.loadSessions();
    this.loadScrims(); // Load scrims data
    this.loadCoaches();
    this.loadPlayers();
    this.loadTeams();
  }
  loadScrims(): void {
    this.sessionService.listeScrims().subscribe(
      scrims => {
        this.scrims = scrims; // Now we only set scrims
      },
      error => console.error('Error loading scrims', error)
    );
  }

  previousClick(): void {
    const amount = this.view === 'month' ? { months: -1 } : this.view === 'week' ? { weeks: -1 } : { days: -1 };
    this.viewDate = add(this.viewDate, amount);
  }

  // Navigate to today's date
  todayClick(): void {
    this.viewDate = new Date();
  }

  // Navigate to the next view based on the current view
  nextClick(): void {
    const amount = this.view === 'month' ? { months: 1 } : this.view === 'week' ? { weeks: 1 } : { days: 1 };
    this.viewDate = add(this.viewDate, amount);
  }
  
  loadSessions() {
    this.sessionService.listeSession().subscribe(sessions => {
      this.events = sessions.map(session => ({
        title: session.sessionName,  // shown on the calendar
        start: new Date(session.dateStart),
        end: new Date(session.dateEnd),
        color: {
          primary: '#ad2121', // example color
          secondary: '#FAE3E3'
        },
        meta: {  // Store all session details here
          sessionName: session.sessionName,
          dateStart: session.dateStart,
          dateEnd: session.dateEnd,
          objectifs: session.objectifs,
          feedbacksEntraineurs: session.feedbacksEntraineurs,
          coachName: session.user.username,
          playerName: session.presencePlayer?.map(player => player.leagalefullname).join(', ') || 'No Players',
          // Add other necessary session attributes here
        }
      }));
    });
  }
  
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (events.length > 0) {
      this.activeDayIsOpen = !this.activeDayIsOpen; // Toggle day view
      this.viewDate = date; // Update view date to clicked date
      this.displaySessionDetails = events[0].meta; // Take the first event's meta data for display
    } else {
      this.activeDayIsOpen = false;
      this.displaySessionDetails = null; // Clear any previously shown details
    }
  } 
  
  
  eventClicked(event: CalendarEvent): void {
    // Open a dialog to display session details
    this.openDialog('Update', event.meta);  // passing all session data
  }
  
  
  
  



  loadCoaches(): void {
    this.sessionService.getCoaches().subscribe((data: User[]) => {
      this.coaches = data;
    }, error => {
      console.error('Failed to load coaches', error);
    });
  }
  loadTeams(): void {
    this.sessionService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
    }, error => {
      console.error('Failed to load teams', error);
    });
  }

  loadPlayers(): void {
    this.sessionService.getPlayers().subscribe((data: Player[]) => {
      this.players = data;
    }, error => {
      console.error('Failed to load players', error);
    });
  }


  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    obj.coaches = this.coaches; // Add coaches to the object
    obj.players = this.players;
    obj.teams=this.teams; // Add players to the object
    const dialogRef = this.dialog.open(AppSessionTrainingDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this. addSession(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierSession(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteSession(result.data);
        this.deleteRowData(result.data);
      }
    });
  }
  // Assuming you have a method in your component to handle the scrim creation response
handleScrimCreated(newScrim: Scrims): void {
  this.scrims = [newScrim]; // Replaces the current array with the new scrim only
  // Or use this to append: this.scrims.push(newScrim);
}

  openScrimsDialog(action: string, scrim: any): void {
    const dialogRef = this.dialog.open(ScrimsDialogComponent, {
      width: '600px',
      data: { action: action, ...scrim }
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Submit') {
        this.handleScrimCreated(result.data);
        console.log('Data submitted:', result.data);
        this.loadScrims();
        // Additional logic to handle submitted data
      } else if (result.event === 'Cancel') {
        console.log('Dialog was cancelled');
      }
    });
    // this.chargerSession(); 
  }
  
  // Add, Update, Delete methods to handle the response
  
  addErrorSession(errorMessage: string): void {
    this.dialog.open(SessionErrorDialogComponent, {
      data: errorMessage,
      width: '400px'
    });
  }

  chargerSession(): void {
    this.sessionService.listeSession().subscribe(sessions => {
      this.dataSource.data = sessions.map(session => ({
        ...session,
        username: session.user.username || 'No Coach',
        playerNames: session.presencePlayer?.map(player => player.leagalefullname).join(', ') || 'No Players'
      }));
     
    });
  }
  
    
  
  deleteSession(session:Session){
    this.sessionService.supprimerSession(session.idSession).subscribe(() => {
      console.log('Session supprimé');
      this.chargerSession();
   });
  }

  modifierSession(session: any): void {
    const id = session.idSession;
  
    // Format dates to ISO string or the expected format by your backend
    const formattedDateStart = new Date(session.dateStart).toISOString();
    const formattedDateEnd = new Date(session.dateEnd).toISOString();
    
    // Prepare the rest of the data as arrays
    const playerNamesArray = typeof session.playerNames === 'string'
      ? session.playerNames.split(',').map((name: string) => name.trim())
      : session.playerNames;
    const objectifsArray = typeof session.objectifs === 'string'
      ? session.objectifs.split(',').map((name: string) => name.trim())
      : session.objectifs;
  
    // Prepare the updated session data
    const updateData: Session = {
      ...session,
      dateStart: formattedDateStart,
      dateEnd: formattedDateEnd,
      playerNames: playerNamesArray,
      objectifs: objectifsArray,
    };
  
    // Call the service to update the session
    this.sessionService.updateSession(id, updateData).subscribe({
      next: (response) => {
        console.log('SessionTraining updated successfully', response);
        this.chargerSession(); // Refresh the list
      },
      error: (error) => {
        console.error('Error updating SessionTraining', error);
        alert('There was an error updating the session: ' + error.error);
      }
    });
  }
  

  // AppSessionTrainingComponent.component.ts

// Inside your component class

// Inside AppSessionTrainingComponent.component.ts
// Add this method to the class
handleDialogClose(response: any) {
  // Logic to check if the operation was successful
  if (response && response.success) {
    // Show success dialog only if response indicates success
    this.dialog.open(AppAddSessionTrainingComponent, {
      data: { message: "Session Successfully Added" }
    });
  }
}

// Revised addSession method
  addSession(sessionData: any): void {
    if (!this.isValidSession(sessionData)) {
      // Show error dialog and stop further execution
      this.addErrorSession("Invalid session data.");
      return;
    }

    const payload = this.prepareSessionPayload(sessionData);
    this.sessionService.addSession(payload).subscribe({
      next: (response) => {
        // Instead of AppAddSessionTrainingComponent, use SessionSuccessDialogComponent
        this.dialog.open(SessionSuccessDialogComponent, {
          width: '400px',
          data: { message: "Session Successfully Added" }
        });
        this.chargerSession(); // Refresh the session list
      },
      error: (error) => {
        console.error("Error adding session", error);
        this.addErrorSession(`Error adding the session: ${error.error}`);
      }
    });
  }


  prepareSessionPayload(sessionData: any): any {
    const dateStartISO = sessionData.dateStart instanceof Date ? sessionData.dateStart.toISOString() : new Date(sessionData.dateStart).toISOString();
    const dateEndISO = sessionData.dateEnd instanceof Date ? sessionData.dateEnd.toISOString() : new Date(sessionData.dateEnd).toISOString();
    const playerNamesFormatted = Array.isArray(sessionData.playerNames) ? sessionData.playerNames : sessionData.playerNames.split(',').map((name:string) => name.trim());
    const objectifsFormatted = Array.isArray(sessionData.objectifs) ? sessionData.objectifs : sessionData.objectifs.split(',').map((objective: string) => objective.trim());

    return {
      username: sessionData.username,
      playerNames: playerNamesFormatted,
      sessionName: sessionData.sessionName,
      dateStart: dateStartISO,
      dateEnd: dateEndISO,
      objectifs: objectifsFormatted,
      feedbacksEntraineurs: sessionData.feedbacksEntraineurs
    };
  }

isValidSession(sessionData: any): boolean {
  // Add validation logic here based on your application's needs
  return sessionData.sessionName && sessionData.dateStart && sessionData.dateEnd;
}


// Inside your component.ts file

// Method to call when the form is submitted
submitScrimsForm(formValues: any) {
  // Convert your form values to the Scrims model if necessary
  const scrimsData = this.mapFormValuesToScrimsModel(formValues);

  this.sessionService.createScrims(scrimsData).subscribe({
    next: (response) => {
      console.log('Scrims created successfully', response);
      // Handle successful creation (e.g., navigate to a different page or show a message)
    },
    error: (error) => {
      console.error('Error creating scrims', error);
      // Handle errors here (e.g., show an error message)
    }
  });
}

// Helper method to map form values to your Scrims model
private mapFormValuesToScrimsModel(formValues: any): Scrims {
  // Create a new Scrims object and populate it with form values
  // Ensure the structure matches what your backend expects
  const scrimsData = new Scrims();
  scrimsData.sessionName = formValues.sessionName;
  scrimsData.dateStart = formValues.dateStart;
  scrimsData.dateEnd = formValues.dateEnd;
  scrimsData.feedbacksEntraineurs = formValues.feedbacksEntraineurs;
  scrimsData.objectivesNames = formValues.objectivesNames;
  scrimsData.username = formValues.username;
  scrimsData.playerNames = formValues.playerNames;
  scrimsData.specialObjectives = formValues.specialObjectives;
  scrimsData.niveau = formValues.niveau;
  scrimsData.description = formValues.description;
  scrimsData.mode = formValues.mode;
  
  // ... populate the rest of the properties
  return scrimsData;
}







 
  
// Add this method in your component class
getCoachNamesForSession(session: Session): string {
  return session.username; // This should now be valid
}

getPlayerNamesForSession(session: Session): string {
  return session.playerNames; // And this too
}

searchSession(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const searchTerm = inputElement.value.trim().toLowerCase();

  if (searchTerm) {
    this.sessionService.rechercheParNameSession(searchTerm).subscribe({
      next: (sessions) => {
        // Assuming 'players' is an array of Player objects. If not, adjust accordingly.
        this.dataSource.data = sessions;

        // For debugging, log the players to see if the data is as expected.
        console.log(sessions);
      },
      error: (error) => {
        console.error('Search error:', error);
        this.dataSource.data = [];
      }
    });
  } else {
    // If the search term is cleared, reload all players.
    this.chargerSession();
  }
}
  // Inside AppPlayerComponent



onkeyUp(filterText:string){
  this.session=this.allSession.filter(item=>item.sessionName.toLowerCase().includes(filterText));
}


 
 
 

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Session): void {
    
    this.dialog.open(AppAddSessionTrainingComponent);
    
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Session): boolean | any {
    
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Session): boolean | any {
    
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'SessionTraining-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppSessionTrainingDialogContentComponent {
  coaches: User[];
  players: Player[];
  
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    private sessionService:SessionService,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppSessionTrainingDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef
  ) {
   
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd',
      );
    }
    // if (this.local_data.imagePath === undefined) {
    //   this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    // }
  }

  onTeamChange(teamName: string): void {
    console.log("Selected teamName:", teamName);  // Log for debugging
    if (teamName) {
      this.sessionService.getPlayersByTeamNames([teamName]).subscribe({
        next: (players) => {
          console.log("Players loaded:", players);
          this.local_data.players = players;  // Update the local data with the loaded players
          this.cdr.detectChanges();  // Trigger change detection to update the UI
        },
        error: (error) => {
          console.error('Error loading players:', error);
          this.local_data.players = [];  // Clear players if there is an error
        }
      });
    } else {
      this.local_data.players = [];  // Clear players if no team name is selected
    }
}
  
  
  
  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  // selectFile(event: any): void {
  //   if (!event.target.files[0] || event.target.files[0].length === 0) {
  //     // this.msg = 'You must select an image';
  //     return;
  //   }
  //   const mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     // this.msg = "Only images are supported";
  //     return;
  //   }
  //   // tslint:disable-next-line - Disables all
  //   const reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   // tslint:disable-next-line - Disables all
  //   reader.onload = (_event) => {
  //     // tslint:disable-next-line - Disables all
  //     this.local_data.imagePath = reader.result;
  //   };
  // }
}
