import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eror-manager-edit-dialog',
  templateUrl: './eror-manager-edit-dialog.component.html',
  styleUrl: './eror-manager-edit-dialog.component.scss'
})
export class ErorManagerEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErorManagerEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data: { errorMessage: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
