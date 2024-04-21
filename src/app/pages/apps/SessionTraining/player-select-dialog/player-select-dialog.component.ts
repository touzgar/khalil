import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-player-select-dialog',
  templateUrl: './player-select-dialog.component.html',
  styleUrls: ['./player-select-dialog.component.scss']
})
export class PlayerSelectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PlayerSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
