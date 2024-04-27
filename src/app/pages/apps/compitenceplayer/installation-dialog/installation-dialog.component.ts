import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../../team/team.model';
import { InstallationSuccessDialogComponent } from '../installation-success-dialog/installation-success-dialog.component';
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
    private resourceService: ResourceService,public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }

  onSaveClick(insData: Installation): void {
    if (typeof insData.disponibilite === 'string') {
      insData.disponibilite = insData.disponibilite === 'true'; // Convert string to boolean
    }
  
    console.log("Sending data to server:", insData);
    this.resourceService.addInstallation(insData).subscribe({
      next: (newInstallation) => {
        console.log("Installation added successfully", newInstallation);
        this.installationAdded.emit(); // Emit event after successful addition
        this.dialogRef.close({ event: 'Submit', data: newInstallation }); // Close the current dialog
        
        // Open success dialog
        this.dialog.open(InstallationSuccessDialogComponent, {
          width: '400px',
          data: { message: "Installation Successfully Added" }
        });
      },
      error: (error) => {
        console.error("Error adding installation", error);
      }
    });
  
    // Removed the premature dialog close line from here
  }
  

  onCancelClick(): void {
    this.dialogRef.close();
  }
  // Inside your InstallationDialogComponent

// onSaveClick(insData: Installation): void {
//   if (typeof insData.disponibilite === 'string') {
//     insData.disponibilite = insData.disponibilite.toLowerCase() === 'true';
//   }

//   this.resourceService.addInstallation(insData).subscribe({
//     next: (newInstallation) => {
//       console.log("Installation added successfully", newInstallation);
//       this.installationAdded.emit();
//       this.dialogRef.close({ event: 'Submit', data: newInstallation });
//     },
//     error: (error) => {
//       console.error("Error adding installation", error);
//       this.dialogRef.close({ event: 'Error', data: null });
//     }
//   });
// }

}
