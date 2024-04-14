import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/pages/authentication/model/login.model';
import { UserService } from '../../user/user.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-user-manager-popup',
  templateUrl: './add-user-manager-popup.component.html',
  styleUrl: './add-user-manager-popup.component.scss'
})
export class AddUserManagerPopupComponent {
  userData: User = new User(); 
  loading: boolean = false;
  progress: number = 0;
  constructor(
    public dialogRef: MatDialogRef<AddUserManagerPopupComponent>,
    private userService: UserService,private dialog: MatDialog 
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    const payload = {
      username: this.userData.username,
      password: this.userData.password,
      email: this.userData.email,
      role: this.userData.roleName
    };

    this.userService.addManagerWithRole(payload).subscribe({
      next: (newUser) => {
        console.log("User added successfully", newUser);
        this.dialogRef.close(newUser);
      },
      error: (error) => {
        console.error('There was an error adding the user:', error);
        this.displayError(error.error.message || 'Unknown error');  // Ensure backend error message or a default
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }

  displayError(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: { message: message }
    });
  }

    
  
  onCancel(): void {
    this.dialogRef.close();
  }

}
