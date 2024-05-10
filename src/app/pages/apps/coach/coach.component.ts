import { Component, Inject, Optional, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AppAddCoachComponent } from './add/add.component';
import { Coach } from './coach.model';
import { CoachService } from './coach.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractSponsor } from '../club/ContractSponsor.model';

export interface DialogData {
  sponsorContractName: string;
  dateStart: string;
  dateEnd: string;
  objectif: string;
  sponsorUsername: string;
  teamName: string;
  action: string;
}






@Component({
  templateUrl: './coach.component.html',
  styleUrls:['./coach.component.scss'],
})
export class AppCoachComponent implements AfterViewInit {
  coach:Coach[];
  
  currentCoach= new Coach();
  trainer:Coach=new  Coach();
  titleCoach!:string;
  allCoach!:Coach[];
  searchTerm!:string;

  contract:ContractSponsor[];
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
  displayedColumns: string[] = ['sponsorContractName', 'dateStart', 'dateEnd', 'objectif', 'teamName', 'action'];
  dataSource = new MatTableDataSource<ContractSponsor>([])
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,private coachService:CoachService,
    private changeDetectorRefs: ChangeDetectorRef,private router:Router, private activateRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadContracts();
    // this.coachService.consulterCoach(this.activateRoute.snapshot.params['id']).subscribe(coach => {
    //   this.currentCoach = coach;
    //   console.log(coach);
    // });
  }

  applyFilter(filterValue: string): void {
    
  }


  openDialog(action: string, obj: any): void {
    const dialogData: DialogData = {
      sponsorContractName: obj.sponsorContractName || '',
      dateStart: this.datePipe.transform(obj.dateStart, 'yyyy-MM-dd') || '',
      dateEnd: this.datePipe.transform(obj.dateEnd, 'yyyy-MM-dd') || '',
      objectif: obj.objectif || '',
      sponsorUsername: obj.sponsor?.sponsorName || '',
      teamName: obj.team?.teamName || '',
      action: action
    };

    const dialogRef = this.dialog.open(AppCoachDialogContentComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addSponsorContract(result.data);
      } else if (result.event === 'Update') {
        this.updateSponsorContract(obj.idSponsorContract, result.data);
      } else if (result.event === 'Delete') {
        this.deleteContract(obj);
      }
    });
  }


  chargerCoach() {
    this.coachService.listeCoach().subscribe(coachs => {
      console.log(coachs); // To see the exact structure right before assignment
      this.coach = coachs;
      this.dataSource.data = this.contract;
      this.changeDetectorRefs.detectChanges();
    });
    
  }
  loadContracts() {
    console.log(this.contract)
    this.coachService.listeContract().subscribe(contracts => {
      this.contract = contracts;
      this.dataSource.data = this.contract;
      this.changeDetectorRefs.detectChanges();
    });
  }  
  
  updateSponsorContract(id: number, data: DialogData) {
    const payload = {
      sponsorContractName: data.sponsorContractName,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      objectif: data.objectif,
      sponsorUsername: data.sponsorUsername,
      teamName: data.teamName
    };

    this.coachService.updateSponsorContract(id, payload).subscribe({
      next: () => this.loadContracts(),
      error: (error) => console.error("Error updating sponsor contract", error)
    });
  }

  addCoach(coach: Coach) {
    this.coachService.addCoach(coach).subscribe({
      next: (newCoach) => {
        console.log("Coach added successfully", newCoach);
        this.chargerCoach(); // Refresh the list
      },
      error: (error) => {
        console.error("Error adding coach", error);
      }
    });
  }
  addSponsorContract(data: DialogData) {
    const payload = {
      sponsorContractName: data.sponsorContractName,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      objectif: data.objectif,
      sponsorUsername: data.sponsorUsername,
      teamName: data.teamName
    };

    this.coachService.addSponsorContract(payload).subscribe({
      next: () => this.loadContracts(),
      error: (error) => console.error("Error adding sponsor contract", error)
    });
  }

  deleteCoach(coach:Coach){
    this.coachService.supprimerCoach(coach.idCoach).subscribe(() => {
      console.log('Coach supprimé');
      this.chargerCoach();
   });
  }
  
  deleteContract(contract:ContractSponsor){
    this.coachService.supprimerContract(contract.idSponsorContract).subscribe(() => {
      console.log('Contract supprimé');
      this.loadContracts();
   });
  }
  
  modifierCoach(coach: Coach): void {
    this.coachService.updateCoach(coach).subscribe(() => {
      console.log('Coach updated successfully');
      this.chargerCoach(); // Refresh the list
    }, error => {
      console.error('Error updating coach', error);
    });
  }
  
  rechercherCoach(event: Event) {
    const target = event.target as HTMLInputElement; // Type assertion
    const searchTerm = target.value; // Now safely access the value
  
    if (searchTerm) {
      this.coachService.rechercheParNameCoach(searchTerm).subscribe(coachs => {
       // this.dataSource.data = coachs;
      }, error => {
        console.error('Error during search:', error);
        this.dataSource.data = [];
      });
    } else {
      this.chargerCoach(); // Reload all coaches if the search term is cleared
    }
  }
   
  onkeyUp(filterText:string){
    this.coach=this.allCoach.filter(item=>item.nameCoach?.toLowerCase().includes(filterText));
  }
  
  
  






  // tslint:disable-next-line - Disables all
  addRowData(row_obj: Coach): void {
    this.dialog.open(AppAddCoachComponent);
    this.table.renderRows();
  }

  // tslint:disable-next-line - Disables all
  updateRowData(row_obj: Coach): boolean | any {
    
  }

  // tslint:disable-next-line - Disables all
  deleteRowData(row_obj: Coach): boolean | any {
     }
}
export interface DialogData {
  sponsorContractName: string;
  dateStart: string;
  dateEnd: string;
  objectif: string;
  sponsorUsername: string;
  teamName: string;
  action: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'coach-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppCoachDialogContentComponent {

  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
 
  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppCoachDialogContentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
