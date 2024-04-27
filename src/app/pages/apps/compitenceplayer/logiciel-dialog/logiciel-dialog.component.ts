import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../../team/team.model';
import { LogicielSuccessDialogComponent } from '../logiciel-success-dialog/logiciel-success-dialog.component';
import { Logiciel } from '../logiciel.model';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-logiciel-dialog',
  templateUrl: './logiciel-dialog.component.html',
  styleUrl: './logiciel-dialog.component.scss'
})
export class LogicielDialogComponent implements OnInit {
  team: Team[] = []; // Initialize as an empty array
  @Output() logicielAdded: EventEmitter<void> = new EventEmitter<void>(); 
  constructor(
    public dialogRef: MatDialogRef<LogicielDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Logiciel,
    private resourceService: ResourceService,public dialog:MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  onSaveClick(logData: Logiciel): void {
    if (typeof logData.status === 'string') {
      // Convert the status field to boolean if it's a string
      logData.status = logData.status === 'true'; // Convert string to boolean
    }
    
    console.log("Sending data to server:", logData);
    this.resourceService.addLogiciel(logData).subscribe({
      next: (newLogiciel) => {
        console.log("Logiciel added successfully", newLogiciel);
        this.logicielAdded.emit(); // Emit event after successful addition
        this.dialogRef.close({ event: 'Submit', data: newLogiciel }); // Close the current dialog
         
        // Open success dialog
        this.dialog.open(LogicielSuccessDialogComponent, {
          width: '400px',
          data: { message: "Logiciel Successfully Added" }
        });
      },
      error: (error) => {
        console.error("Error adding logiciel", error);
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
