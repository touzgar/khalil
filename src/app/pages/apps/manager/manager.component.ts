import { Component, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Role } from '../../authentication/model/Role.model';
import { User } from '../../authentication/model/login.model';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

import { DeleteUserDialogComponent } from '../user/delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from '../user/edit-user-dialog/edit-user-dialog.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { AddUserManagerPopupComponent } from './add-user-manager-popup/add-user-manager-popup.component';
export interface Manager {
  idManager: number;
  managerName: string;
}

const managers = [
  {
    idManager: 1,
    managerName: 'John Doe',
  },
  {
    idManager: 2,
    managerName: 'John Doe',
  },
  {
    idManager: 3,
    managerName: 'John Doe',
  },
  {
    idManager: 4,
    managerName: 'John Doe',
  },
  {
    idManager: 5,
    managerName: 'John Doe',
  },
  {
    idManager: 6,
    managerName: 'John Doe',
  },
  
];

@Component({
  
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
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
export class AppManagerComponent implements AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  searchText: any;
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
    this.refreshUserList();
    this.dataSource.paginator = this.paginator; // Make sure paginator is assigned
  }
  refreshUserList(): void {
    this.userService.listeUsers().subscribe((users: User[]) => {
      this.dataSource.data = users; // Update your MatTableDataSource data
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserManagerPopupComponent, {
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

  // listeUser(): void {
  //   this.userService.listeUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   });
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-dialog-content',
  templateUrl: 'manager-dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class AppManagerDialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<AppManagerDialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Manager,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd',
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    }
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
}