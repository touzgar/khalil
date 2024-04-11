import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/pages/authentication/model/login.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-add-user-manager-popup',
  templateUrl: './add-user-manager-popup.component.html',
  styleUrl: './add-user-manager-popup.component.scss'
})
export class AddUserManagerPopupComponent {
  userData: User = new User(); 
  constructor(
    public dialogRef: MatDialogRef<AddUserManagerPopupComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    
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
      }
    });
  }
  
    
  
  onCancel(): void {
    this.dialogRef.close();
  }

}
