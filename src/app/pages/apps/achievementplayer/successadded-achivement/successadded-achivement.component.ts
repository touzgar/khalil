import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-successadded-achivement',
  templateUrl: './successadded-achivement.component.html',
  styleUrl: './successadded-achivement.component.scss'
})
export class SuccessaddedAchivementComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessaddedAchivementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
