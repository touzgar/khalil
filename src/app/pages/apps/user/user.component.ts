import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from './user.service'; // Update path as necessary

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { User } from '../../authentication/model/login.model';
import { Role } from '../../authentication/model/Role.model';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AddUserPopupComponent } from './add-user-popup/add-user-popup.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { SucessManagerDeleteComponent } from '../manager/sucess-manager-delete/sucess-manager-delete.component';
import { SucessManagerEditComponent } from '../manager/sucess-manager-edit/sucess-manager-edit.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('itemEnter', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate('0.35s ease-out', 
          style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})

  

export class AppUserComponent implements AfterViewInit {
  displayedColumns: string[] = ['username', 'email','roles', 'action'];

  dataSource = new MatTableDataSource<User>();
  users? : User[];
  role?:Role[];
  totalLength: number = 0;
  pageSize: number = 10; // Set page size to match your UI
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 20,1000];
  pageNumbers: number[] = [];



  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,private router:Router,private dialog: MatDialog) {}


  ngAfterViewInit(): void {
    this.userService.listeUser().subscribe((users: User[]) => {
      this.users = users;
      this.totalLength = users.length;
      this.initializePageNumbers();
      this.loadPage();
      this.dataSource.paginator = this.paginator; // Make sure paginator is assigned
    });
   
  }
  refreshUserList(): void {
    this.userService.listeUser().subscribe((users: User[]) => {
      this.dataSource.data = users; // Update your MatTableDataSource data
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserPopupComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New user added', result);
        this.refreshUserList(); // Refresh the user list
      }
    });
  }
  openDeleteDialog(userId: number): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the method to delete the user if the user confirms deletion
        this.userService.deleteUser(userId).subscribe(() => {
          // After successful deletion, refresh the user list
          this.refreshUserList();
          this.dialog.open(SucessManagerDeleteComponent, {
            width: '300px',
            data: { message: "Delete Successfully" }
          });
        }, error => {
          // Handle error if deletion fails
          console.error('Error deleting user:', error);
        });
      }
    });
  }
  
  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(user.userId, result).subscribe(updatedUser => {
          console.log('Updated user:', updatedUser);
          // Refresh the user list or perform any necessary actions
          this.refreshUserList();
          this.dialog.open(SucessManagerEditComponent, {
            width: '300px',
            data: { message: "Edit Successfully" } // Pass the message you want to show
          });
        }, error => {
          console.error('Error updating user:', error);
        });
      }
    });
  }
  
  
  
  
  private initializePageNumbers() {
    const pageCount = Math.ceil(this.totalLength / this.pageSize);
    this.pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  loadPage(page: number = this.currentPage) {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    // Added non-null assertion operator (!) to assure that users is not undefined
    this.dataSource.data = this.users!.slice(startIndex, endIndex);
    this.currentPage = page;
  }

  setPageSize(size: number) {
    this.pageSize = size;
    this.initializePageNumbers();
    this.loadPage(1);
  }

  listeUser(): void {
    this.userService.listeUser().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: 'user-dialog-content.html',
})
export class AppUserDialogContentComponent {
  public get dialogRef(): MatDialogRef<AppUserDialogContentComponent> {
    return this._dialogRef;
  }
  public set dialogRef(value: MatDialogRef<AppUserDialogContentComponent>) {
    this._dialogRef = value;
  }
  public action: string;
  public local_data: any;

  constructor(
    public datePipe: DatePipe,
    private _dialogRef: MatDialogRef<AppUserDialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }
}
