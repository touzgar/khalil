import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../../team/team.model';
import { Logiciel } from '../logiciel.model';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-logiciel-dialog',
  templateUrl: './logiciel-dialog.component.html',
  styleUrl: './logiciel-dialog.component.scss'
})
export class LogicielDialogComponent implements OnInit {
  team: Team[] = []; // Initialize as an empty array

  constructor(
    public dialogRef: MatDialogRef<LogicielDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Logiciel,
    private resourceService: ResourceService
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
      },
      error: (error) => {
        console.error("Error adding logiciel", error);
      }
    });
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
