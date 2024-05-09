import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddAchievementPlayerComponent } from '../achievementplayer/add/add.component';
import {  AchievementTeam } from './AchivementTeam.model';
import { AchivementTeamService } from './achivement-team.service';
import { SucessManagerDeleteComponent } from '../manager/sucess-manager-delete/sucess-manager-delete.component';
import { AppAchievementTeamDeleteDialogComponent } from './app-achievement-team-delete-dialog/app-achievement-team-delete-dialog.component';
import { Team } from '../team/team.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';




// export interface Achivment {
//   idAchivementsTeam: number;
//   tournamentName: string;
//   Trophie: string[];
//   dateAchived: Date;
//   achievementRank: string;
// teamname?:string;
// }

// const achivments = [
//   {
//     idAchivementsTeam: 1,
//     tournamentName: 'lol',
//     Trophie: ['First Place Trophy', 'Second Place Trophy'],
//     dateAchived: new Date('2023-01-15'),
//     achievementRank: 'bronze2',
//   },
//   {
//     idAchivementsTeam: 2,
//     tournamentName: 'valo',
//     Trophie: ['First Place Trophy', 'Second Place Trophy'],
//     dateAchived: new Date('2023-01-15'),
//     achievementRank: 'bronze2',
//   },
//   {
//     idAchivementsTeam: 3,
//     tournamentName: 'csgo',
//     Trophie: ['First Place Trophy', 'Second Place Trophy'],
//     dateAchived: new Date('2023-01-15'),
//     achievementRank: 'bronze2',
//   },
//   {
//     idAchivementsTeam: 4,
//     tournamentName: 'wow',
//     Trophie: ['First Place Trophy', 'Second Place Trophy'],
//     dateAchived: new Date('2023-01-15'),
//     achievementRank: 'bronze2',
//   },
// ];

@Component({
  templateUrl: './achievementteam.component.html',
  styleUrls:['./achievementteam.component.scss'],
})
export class AppAchievementTeamComponent implements AfterViewInit {
  achivement:AchievementTeam[];
 
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
   
    'teamName',
    'Trophie',
    'dateAchived',
    'achievementRank',
    'action'
  ];
  
  
  dataSource = new MatTableDataSource<AchievementTeam>([]) 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private achivementService:AchivementTeamService
    ,  private changeDetectorRefs: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.chargerAchivementTeam();
     }

  
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AppAchievementTeamDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addAchivement(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this. modifierAchivementTeam(result.data);
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
       
        this.deleteRowData(result.data);
      }
    });
  }
  openDeleteDialog(element: AchievementTeam): void {
    const dialogRef = this.dialog.open(AppAchievementTeamDeleteDialogComponent, {
      data: { action: 'Delete', element }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Delete') {
        this.deleteAchivementTeam(element);
      }
    });
  }
  chargerAchivementTeam() {
    this.achivementService.listeAchievementTeam().subscribe(achivements => {
      console.log(achivements); // Check the console to make sure 'coach' is populated
      this.achivement = achivements;
      this.dataSource.data = this.achivement; // Update the table's data source
      this.changeDetectorRefs.detectChanges(); // Trigger change detection
    });
  }
  deleteAchivementTeam(achivement: AchievementTeam){
    this.achivementService.supprimerAchievementTeam(achivement.achivementId).subscribe(() => {
      console.log('AchivementTeam supprimé');
      this.chargerAchivementTeam();
      this.dialog.open(SucessManagerDeleteComponent, {
        width: '300px',
        data: { message: "Delete Successfully" }
      });

   });
  }
  modifierAchivementTeam(achievementTeam: AchievementTeam): void {
    const updateData = {
      ...achievementTeam,
      dateAchived: new Date(achievementTeam.dateAchived).toISOString().split('T')[0], // Format date as "yyyy-MM-dd"
      trophies: Array.isArray(achievementTeam.trophies) ? achievementTeam.trophies : (achievementTeam.trophies as unknown as string).split(','), // Ensure Trophie is an array
    };
  
    // Construct the payload with the correct field names
    const payload = {
      achievementRank: updateData.achievementRank,
      trophies: updateData.trophies,
      dateAchived: updateData.dateAchived
    };
  
    this.achivementService.updateAchievementTeam(achievementTeam.achivementId, payload).subscribe({
      next: (response) => {
        console.log('AchievementTeam updated successfully', response);
        this.chargerAchivementTeam();
      },
      error: (error) => {
        console.error('Error updating AchievementTeam', error);
      }
    });
  }
  
  
  addAchivement(achivement: AchievementTeam): void {
    // Convert Trophie from string to array
    achivement.trophies = achivement.trophies.toString().split(',');

    this.achivementService.addAchievementTeam(achivement).subscribe({
      next: (newAchivement) => {
        console.log("Achievement Team added successfully", newAchivement);
        this.chargerAchivementTeam();
        this.table.renderRows();
      },
      error: (error) => {
        console.error("Error adding Achievement Team", error);
      }
    });
  }
  
  // tslint:disable-next-line - Disables all
  addRowData(row_obj:AchievementTeam): void {
      
     
 //   this.dialog.open(AppAddAchievementPlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: AchievementTeam): boolean | any {
    }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: AchievementTeam): boolean | any {
    
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'achievementteam-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppAchievementTeamDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  teams: Team[] = [];
  filteredTeams: Observable<Team[]>;
  teamControl = new FormControl();


  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppAchievementTeamDialogContentComponent>,private achivementService:AchivementTeamService,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AchievementTeam
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;

    // Convert Trophie array to a comma-separated string
    if (Array.isArray(this.local_data.trophies)) {
      this.local_data.trophies = this.local_data.trophies.join(',');
    }

    // Convert date to the correct format if it exists
    if (this.local_data.dateAchived !== undefined) {
      this.local_data.dateAchived = this.datePipe.transform(
        new Date(this.local_data.dateAchived),
        'yyyy-MM-dd'
      );
    }
  }
  
  doAction(): void {
    // Convert Trophie back to an array before passing it back
    // if (typeof this.local_data.trophies === 'string') {
    //   this.local_data.trophies = this.local_data.trophies.split(',').map((t: string) => t.trim());
    // }

    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  } 
}