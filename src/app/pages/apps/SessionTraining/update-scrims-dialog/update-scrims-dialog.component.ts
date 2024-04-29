import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  FormGroup, Validators } from '@angular/forms';
import { ScrimsService } from '../../Scrims/scrims.service';
import { Scrims } from '../../Scrims/Scrims.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-scrims-dialog',
  templateUrl: './update-scrims-dialog.component.html',
  styleUrls: ['./update-scrims-dialog.component.scss']
})
export class UpdateScrimsDialogComponent implements OnInit {
  scrimsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private scrimsService: ScrimsService,
    public dialogRef: MatDialogRef<UpdateScrimsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Scrims
  ) {
    this.scrimsForm = this.fb.group({
      sessionName: [data.sessionName, Validators.required],
      dateStart: [data.dateStart, Validators.required],
      dateEnd: [data.dateEnd, Validators.required],
      description: [data.description, Validators.required],
      niveau: [data.niveau, Validators.required],
      mode: [data.mode, Validators.required],
      specialObjectives: [data.specialObjectives, Validators.required],
      playerNames: [data.playerNames, Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic can be done here
  }

  onSubmit(): void {
    if (this.scrimsForm.valid) {
      const updatedScrims: Scrims = {
        ...this.data, // Spread the existing data
        ...this.scrimsForm.value // Overwrite with updated form values
      };
      this.modifierScrims(updatedScrims);
    }
  }

  modifierScrims(scrims: Scrims): void {
    this.scrimsService.updateScrims(scrims.idSession, scrims).subscribe({
      next: (response) => {
        console.log('Scrims updated successfully', response);
        this.dialogRef.close('update');
      },
      error: (error) => {
        console.error('Error updating Scrims', error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
