import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Installation } from '../installationmodel';

import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-update-installation-dialog',
  templateUrl: './update-installation-dialog.component.html',
  styleUrls: ['./update-installation-dialog.component.scss']
})
export class UpdateInstallationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UpdateInstallationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Installation,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    // Optional: Load necessary data or perform initialization logic
  }

  onUpdateClick(updatedInstallation: Installation): void {
    // Implement logic to update the installation
    console.log("Updating installation with data:", updatedInstallation);
    // Call the appropriate service method to update the installation
    this.resourceService.updateInstallation(updatedInstallation).subscribe({
      next: (updatedInstallation) => {
        console.log("Installation updated successfully", updatedInstallation);
      },
      error: (error) => {
        console.error("Error updating installation", error);
      }
    });
    // Close the dialog after updating
    this.dialogRef.close();
  }

  onCancelClick(): void {
    // Close the dialog without performing any action
    this.dialogRef.close();
  }
}
