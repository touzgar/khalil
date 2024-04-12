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





@Component({
  templateUrl: './SessionTraining.component.html',
})
export class AppSessionTrainingComponent implements AfterViewInit {
  session:Session[];
  titleSession!:string;
  allSession!:Session[];
  searchTerm!:string;
  // coaches: User[] = [];
  // players: Player[] = [];

  
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'sessionName',
    'dateStart',
    'dateEnd',
    'objectifs',
    'feedbacksEntraineurs',
    
    'playerName',
    
    'action'
  ];
  

  dataSource = new MatTableDataSource<Session>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private sessionService:SessionService,
    private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerSession();
    // this.sessionService.getCoaches().subscribe(coaches => this.coaches = coaches);
    // this.sessionService.getPlayers().subscribe(players => this.players = players);
  
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
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

  chargerSession(): void {
    this.sessionService.listeSession().subscribe(sessions => {
      this.dataSource.data = sessions.map(session => ({
        ...session,
        coachName: session.coach?.nameCoach || 'No Coach',
        playerNames: session.presencePlayer?.map(player => player.leagalefullname).join(', ') || 'No Players'
      }));
      this.table.renderRows();
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
addSession(sessionData: any): void {
  // Convert dates to ISO strings (if not already done)
  const dateStartISO = sessionData.dateStart instanceof Date ? sessionData.dateStart.toISOString() : new Date(sessionData.dateStart).toISOString();
  const dateEndISO = sessionData.dateEnd instanceof Date ? sessionData.dateEnd.toISOString() : new Date(sessionData.dateEnd).toISOString();

  // Ensure 'playerNames' and 'objectifs' are arrays
  const playerNamesFormatted = Array.isArray(sessionData.playerNames) ? sessionData.playerNames : sessionData.playerNames.split(',').map((name: string) => name.trim());
  const objectifsFormatted = Array.isArray(sessionData.objectifs) ? sessionData.objectifs : sessionData.objectifs.split(',').map((objective: string) => objective.trim());

  // Construct the payload ensuring structure aligns with backend expectations
  const payload = {
    username: sessionData.username,  // Make sure this is correctly set from the dialog form
    playerNames: playerNamesFormatted,  // Use the formatted array
    sessionName: sessionData.sessionName,
    dateStart: dateStartISO,
    dateEnd: dateEndISO,
    objectifs: objectifsFormatted,  // Use the formatted array
    feedbacksEntraineurs: sessionData.feedbacksEntraineurs
  };

  console.log("Payload being sent to backend:", payload);

  // Use the service to send the payload to the backend
  this.sessionService.addSession(payload).subscribe({
    next: (response) => {
      console.log("Session added successfully", response);
      this.chargerSession();  // Refresh the data grid or list
    },
    error: (error) => {
      console.error("Error adding session", error);
      alert('There was an error adding the session: ' + error.error);
    }
  });
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
    this.table.renderRows();
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
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppSessionTrainingDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Session,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    }
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
}
