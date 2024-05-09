import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-app-achievement-team-delete-dialog',
  
  templateUrl: './app-achievement-team-delete-dialog.component.html',
  styleUrl: './app-achievement-team-delete-dialog.component.scss'
})
export class AppAchievementTeamDeleteDialogComponent {
  local_data: any;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<AppAchievementTeamDeleteDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
