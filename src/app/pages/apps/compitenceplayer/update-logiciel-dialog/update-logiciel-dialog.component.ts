import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Logiciel } from '../logiciel.model';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-update-logiciel-dialog',
    templateUrl: './update-logiciel-dialog.component.html',
  styleUrl: './update-logiciel-dialog.component.scss'
})
export class UpdateLogicielDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<UpdateLogicielDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Logiciel,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    // Optional: Load necessary data or perform initialization logic
  }

  onUpdateClick(updatedLogiciel: Logiciel): void {
    // Implement logic to update the installation
    console.log("Updating Logiciel with data:", updatedLogiciel);
    // Call the appropriate service method to update the installation
    this.resourceService.updateLogiciel(updatedLogiciel).subscribe({
      next: (updatedLogiciel) => {
        console.log("Logiciel updated successfully", updatedLogiciel);
      },
      error: (error) => {
        console.error("Error updating Logiciel", error);
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
