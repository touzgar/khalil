import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../../team/team.model';
import { Installation } from '../installationmodel';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-installation-dialog',
  templateUrl: './installation-dialog.component.html',
  styleUrls: ['./installation-dialog.component.scss'] // Fix the styleUrl to styleUrls
})
export class InstallationDialogComponent implements OnInit {
  team: Team[] = []; // Initialize as an empty array
  @Output() installationAdded: EventEmitter<void> = new EventEmitter<void>(); // Declare the event emitter

  constructor(
    public dialogRef: MatDialogRef<InstallationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Installation,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    
  }

  onSaveClick(insData: Installation): void {
    if (typeof insData.disponibilite === 'string') {
      // Convert the status field to boolean if it's a string
      insData.disponibilite = insData.disponibilite === 'true'; // Convert string to boolean
    }
    
    console.log("Sending data to server:", insData);
    this.resourceService.addInstallation(insData).subscribe({
      next: (newInstallation) => {
        console.log("Installtion added successfully", newInstallation);
        this.installationAdded.emit(); // Emit event after successful addition
      },
      error: (error) => {
        console.error("Error adding installation", error);
      }
    });
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
