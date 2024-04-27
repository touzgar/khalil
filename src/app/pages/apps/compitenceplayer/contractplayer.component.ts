import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddCompitencePlayerComponent } from './add/add.component';
import { Materiel } from './materielmodel';
import { ResourceService } from './resource.service';
import { Team } from '../team/team.model';
import { Observable } from 'rxjs';
import { InstallationDialogComponent } from './installation-dialog/installation-dialog.component';
import { LogicielDialogComponent } from './logiciel-dialog/logiciel-dialog.component';
import { Installation } from './installationmodel';
import { Logiciel } from './logiciel.model';
import { UpdateInstallationDialogComponent } from './update-installation-dialog/update-installation-dialog.component';
import { UpdateLogicielDialogComponent } from './update-logiciel-dialog/update-logiciel-dialog.component';
import { MaterielSucessDialogComponent } from './materiel-sucess-dialog/materiel-sucess-dialog.component';




// export interface Compitence {
//   idCompetence: number;
//   competence: string;
//   historiquePerformence: string;
//   kdRiot: number;
//   winPorsontage: string;
//   leagalefullname?: string;
// }

// const Compitences = [
//   {
//     idCompetence: 1,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,
//     winPorsontage: '70%'
//   },
 
//   {
//     idCompetence: 2,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,
//     winPorsontage: '70%.'
//   },
//   {
//     idCompetence: 3,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,
  
//     winPorsontage: '70%.'
//   },
//   {
//     idCompetence: 4,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,
 
//     winPorsontage: '70%.'
//   },
//   {
//     idCompetence: 5,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,

//     winPorsontage: '70%.'
//   },
//   {
//     idCompetence: 6,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,
  
//     winPorsontage: '70%.'
//   },
//   {
//     idCompetence: 7,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,

//     winPorsontage: '70%.'
//   },
//   {
//     idCompetence: 8,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,
 
//     winPorsontage: '70%.'
//   },
//   {
//     idCompetence: 9,
//     competence: ' competence',
//     historiquePerformence: "silver , Goled ,iron",
//     kdRiot: 50,

//     winPorsontage: '70%.'
//   },
// ];

@Component({
  templateUrl: './compitenceplayer.component.html',
  styleUrls:['./compitenceplayer.component.scss'],
})
export class AppCompitencePlayerComponent implements AfterViewInit {
  materiel:Materiel[];
  installation:Installation[];
  logiciel:Logiciel[];
  team:Team[];
  installationDataSource = new MatTableDataSource<Installation>([]); 
  logicielDataSource = new MatTableDataSource<Logiciel>([]); 
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'materielName',
    'type',
    'status',
    'teamName',
    'action'

  ];
  
  dataSource = new MatTableDataSource<Materiel>([])
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  installationAdded: EventEmitter<void> = new EventEmitter<void>();
  hoveredInstallation: Installation | null = null; 
  constructor(public dialog: MatDialog, public datePipe: DatePipe,private resourceService:ResourceService,
    private changeDetectorRefs: ChangeDetectorRef) { }
  loadTeams(): void {
    this.resourceService.getTeams().subscribe((data: Team[]) => {
      this.team = data;
    }, error => {
      console.error('Failed to load teams', error);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadTeams();
    this.chargerMateriel();
    this.chargerInstallation(); // Refresh installation data
    this.chargerLogiciel();
  }
  onMouseEnter(installation: Installation): void {
    this.hoveredInstallation = installation;
  }

  // Method to handle mouse leave event
  onMouseLeave(): void {
    this.hoveredInstallation = null;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any): void {
    obj.action = action;
    obj.team=this.team;
    const dialogRef = this.dialog.open(AppCompitencePlayerDialogContentComponent, {
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addMatreil(result.data);
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.modifierMateriel(result.data);    
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteMateriel(result.data);
        this.deleteRowData(result.data);
      }
    });
  }
  addMatreil(matData: Materiel): void {
    if (typeof matData.status === 'string') {
        matData.status = matData.status === 'true'; // Ensure correct data type for status
    }

    console.log("Sending data to server:", matData);
    this.resourceService.addMateriel(matData).subscribe({
        next: (newMateriel) => {
            console.log("Materiel added successfully", newMateriel);
            this.dataSource.data.push(newMateriel); // Update the table dataSource
            this.dataSource._updateChangeSubscription(); // Ensure the table updates

            // Close any existing dialogs and open the success dialog
            this.dialog.closeAll();
            this.dialog.open( MaterielSucessDialogComponent, {
                width: '400px',
                data: { message: "Materiel Successfully Added" }
            });
        },
        error: (error) => {
            console.error("Error adding materiel", error);
        }
    });
}
  openAddInstallationDialog(action: string, data: any): void {
    data.team = this.team;
    
    const dialogRef = this.dialog.open(InstallationDialogComponent, {
      width: '400px',
      data: { action: action, ...data }
    });
  
    // Subscribe to the afterClosed event of the dialog
    dialogRef.afterClosed().subscribe(result => {
      // Check if the result is not null
      if (result !== undefined && result.event === 'Submit') {
        console.log('Data submitted:', result.data);
        // Update the installationDataSource with the new installation
        this.installationDataSource.data.push(result.data);
        // Reassign the data source to trigger Angular's change detection
        this.installationDataSource.data = [...this.installationDataSource.data];
      } else if (result !== undefined && result.event === 'Cancel') {
        console.log('Dialog was cancelled');
      }
    });
  }
   
  openDeleteInstallationDialog(action: string, installation: any): void {
    const dialogRef = this.dialog.open(AppCompitencePlayerDialogContentComponent, {
      data: { action: action, ...installation },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Delete') {
        this.deleteInstallation(result.data);
        this.deleteInsData(result.data);
      }
    });
  }
  openUpdateInstallationDialog(action: string, installation: any): void {
    const dialogRef = this.dialog.open(UpdateInstallationDialogComponent, {
      width: '400px',
      
      data: { action: action, ...installation },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions or events after the dialog is closed
      if (result === 'update') {
        // Logic for handling the update action if needed
      } else if (result === 'cancel') {
        // Logic for handling the cancel action if needed
      }
    });
  
  }
  openAddLogicielDialog(action: string, data: any): void {
    data.team=this.team;
    const dialogRef = this.dialog.open(LogicielDialogComponent, {
      width: '400px',
      data: { action: action, ...data }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.event === 'Submit') {
        console.log('Data submitted:', result.data);
        this.logicielDataSource.data.push(result.data);
        this.logicielDataSource.data=[...this.logicielDataSource.data];   
        // Additional logic to handle submitted data
      } else if (result !== undefined && result.event === 'Cancel') {
        console.log('Dialog was cancelled');
      }
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   // Check if the result is not null
    //   if (result !== undefined && result.event === 'Submit') {
    //     console.log('Data submitted:', result.data);
    //     // Update the installationDataSource with the new installation
    //     this.installationDataSource.data.push(result.data);
    //     // Reassign the data source to trigger Angular's change detection
    //     this.installationDataSource.data = [...this.installationDataSource.data];
    //   } else if (result !== undefined && result.event === 'Cancel') {
    //     console.log('Dialog was cancelled');
    //   }
    // });
  }  
  openDeleteLogicielDialog(action: string, logiciel: any): void {
    const dialogRef = this.dialog.open(AppCompitencePlayerDialogContentComponent, {
      data: { action: action, ...logiciel },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Delete') {
        this.deleteLogiciel(result.data);
        this.deleteLogData(result.data);
      }
    });
  }
  openUpdateLogicielDialog(action: string, logiciel: any): void {
    const dialogRef = this.dialog.open(UpdateLogicielDialogComponent, {
      width: '400px',
      data: { action: action, ...logiciel },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions or events after the dialog is closed
      if (result === 'update') {
        // Logic for handling the update action if needed
      } else if (result === 'cancel') {
        // Logic for handling the cancel action if needed
      }
    });
  
  }
  chargerMateriel(){
    this.resourceService.getMateriel().subscribe(mat=>{
      console.log(mat);
      this.materiel=mat;
      this.dataSource.data=this.materiel;
      this.changeDetectorRefs.detectChanges();
    })
  }
 
  chargerInstallation() {
    this.resourceService.getInstallation().subscribe(ins => {
      console.log(ins);
      this.installation = ins;
      this.installationDataSource.data = this.installation; // Populate the data source
      this.changeDetectorRefs.detectChanges();
    });
  }

  // Method to handle installation addition event
  handleInstallationAdded(): void {
    this.chargerInstallation(); // Refresh installation data
  }
   chargerLogiciel(){
    this.resourceService.getLogiciel().subscribe(log=>{
      console.log(log);
      this.logiciel=log;
      this.logicielDataSource.data=this.logiciel;
      this.changeDetectorRefs.detectChanges();
    })
  }
  deleteMateriel(mat:Materiel){
    this.resourceService.supprimerMateriel(mat.materielId).subscribe(() => {
      console.log('Materiel supprimé');
      this.chargerMateriel();
   });
  }
  deleteInstallation(ins: Installation): void {
    if (ins && ins.installationId) {
        this.resourceService.supprimerInstallation(ins.installationId).subscribe(
            () => {
                console.log('Installation supprimé');
                this.chargerInstallation();
            },
            (error) => {
                console.error('Error deleting installation:', error);
            }
        );
    } else {
        console.error('Invalid installation or installation ID');
    }
}
deleteLogiciel(log:Logiciel){
  this.resourceService.supprimerLogiciel(log.logicielId).subscribe(() => {
    console.log('Logiciel supprimé');
    this.chargerLogiciel();
 });
}
modifierMateriel(mat: Materiel): void {
  this.resourceService.updateMateriel(mat).subscribe(() => {
    console.log('Materiel updated successfully');
    this.chargerMateriel(); // Refresh the list
  }, error => {
    console.error('Error updating materiel', error);
  });
}
modifierInstallation(ins: Installation): void {
  this.resourceService.updateInstallation(ins).subscribe(() => {
    console.log('Installation updated successfully');
    this.chargerInstallation(); // Refresh the list
  }, error => {
    console.error('Error updating installation', error);
  });
}

  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Materiel): void {
    
    this.dialog.open(AppAddCompitencePlayerComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Materiel): boolean | any {
    
  }
  updateInsData(row_obj: Installation): boolean | any {
    
  }
  updateLogData(row_obj: Logiciel): boolean | any {
    
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Materiel): boolean | any {
   
  }
  deleteInsData(row_obj: Installation): boolean | any {
   
  }
  deleteLogData(row_obj: Logiciel): boolean | any {
   
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'compitenceplayer-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppCompitencePlayerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppCompitencePlayerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Materiel,
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
