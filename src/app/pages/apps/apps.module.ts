import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { NgxPaginationModule } from 'ngx-pagination';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgScrollbarModule } from 'ngx-scrollbar';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Chat
import { AppChatComponent } from './chat/chat.component';
//Contact
import { AppContactDialogContentComponent } from './contact/contact.component';
import { AppContactComponent } from './contact/contact.component';
//Courses
import { AppCoursesComponent } from './courses/courses.component';
import { AppCourseDetailComponent } from './courses/course-detail/course-detail.component';

//Notes
import { AppNotesComponent } from './notes/notes.component';
//Todo
import { AppTodoComponent } from './todo/todo.component';
// Permission
import { AppPermissionComponent } from './permission/permission.component';
//Mailbox
import {
  ListingComponent,
  ListingDialogDataExampleDialogComponent,
} from './email/listing/listing.component';
import { DetailComponent } from './email/detail/detail.component';
import { AppEmailComponent } from './email/email.component';

//Taskboard
import { AppTaskboardComponent } from './taskboard/taskboard.component';
import { TaskDialogComponent } from './taskboard/task-dialog.component';
import { OkAppTaskComponent } from './taskboard/ok-task/ok-task.component';
import { DeleteAppTaskComponent } from './taskboard/delete-task/delete-task.component';

//Calendar
import { AppFullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { CalendarDialogComponent } from './fullcalendar/fullcalendar.component';
import { CalendarFormDialogComponent } from './fullcalendar/calendar-form-dialog/calendar-form-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppEmployeeComponent } from './employee/employee.component';
import { AppEmployeeDialogContentComponent } from './employee/employee.component';
import { AppAddEmployeeComponent } from './employee/add/add.component';

import { AppsRoutes } from './apps.routing';
import { MatNativeDateModule } from '@angular/material/core';
import {
  AppTicketlistComponent,
  AppTicketDialogContentComponent,
} from './ticketlist/ticketlist.component';

//Invoice
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { OkDialogComponent } from './invoice/edit-invoice/ok-dialog/ok-dialog.component';
import { AddedDialogComponent } from './invoice/add-invoice/added-dialog/added-dialog.component';

// blog
import { AppBlogsComponent } from './blogs/blogs.component';
import { AppBlogDetailsComponent } from './blogs/details/details.component';
import { AppPlayerComponent, AppPlayerDialogContentComponent } from './player/player.component';
import { AppAddPlayerComponent } from './player/add/add.component';
import { AppContractPlayerComponent, AppContractPlayerDialogContentComponent } from './contractplayer/contractplayer.component';
import { AppAddContractPlayerComponent } from './contractplayer/add/add.component';
import { AppAchievementPlayerComponent, AppAchievementPlayerDialogContentComponent } from './achievementplayer/achievementplayer.component';
import { AppAddAchievementPlayerComponent } from './achievementplayer/add/add.component';
import { AppUserComponent, AppUserDialogContentComponent } from './user/user.component';
import { AppAddUserComponent } from './user/add/add.component';
import { AppCompitencePlayerComponent, AppCompitencePlayerDialogContentComponent } from './compitenceplayer/contractplayer.component';
import { AppAddCompitencePlayerComponent } from './compitenceplayer/add/add.component';
import { AppTeamComponent, AppTeamDialogContentComponent } from './team/team.component';
import { AppAddTeamComponent } from './team/add/add.component';
import { AppAchievementTeamComponent, AppAchievementTeamDialogContentComponent } from './achievementteam/achievementteam.component';
import { AppAddAchievementTeamComponent } from './achievementteam/add/add.component';
import { AppManagerComponent, AppManagerDialogContentComponent } from './manager/manager.component';
import { AppAddManagerComponent } from './manager/add/add.component';
import { AppCoachComponent, AppCoachDialogContentComponent } from './coach/coach.component';
import { AppAddCoachComponent } from './coach/add/add.component';
import { AppClubComponent, AppClubDialogContentComponent } from './club/clubs.component';
import { AppAddClubComponent } from './club/add/add.component';
import { AppDefiComponent, AppDefiDialogContentComponent } from './defi/defi.component';
import { AppAddDefiComponent } from './defi/add/add.component';
import { AppTournamentComponent, AppTournamentDialogContentComponent } from './Tournament/tournament.component';
import { AppAddTournamentComponent } from './Tournament/add/add.component';
import { AppScrimsComponent, AppScrimsDialogContentComponent } from './Scrims/scrims.component';
import { AppAddScrimsComponent } from './Scrims/add/add.component';
import { AppSessionTrainingComponent, AppSessionTrainingDialogContentComponent } from './SessionTraining/SessionTraining.component';
import { AppAddSessionTrainingComponent } from './SessionTraining/add/add.component';
import { AddCoachToTeamDialogComponent } from './team/add-coach-to-team-dialog/add-coach-to-team-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RemoveCoachFromTeamDialogComponent } from './team/remove-coach-from-team-dialog/remove-coach-from-team-dialog.component';
import { AddPlayersToTeamDialogComponent } from './team/add-players-to-team-dialog/add-players-to-team-dialog.component';
import { RemovePlayersFromTeamDialogComponent } from './team/remove-players-from-team-dialog/remove-players-from-team-dialog.component';
import { TournamentService } from './employee/tournament.service';
import { AddTeamsToTournamentComponent } from './employee/add-teams-to-tournament/add-teams-to-tournament.component';
import { RemoveTeamsToTournamentComponent } from './employee/remove-teams-to-tournament/remove-teams-to-tournament.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddUserPopupComponent } from './user/add-user-popup/add-user-popup.component';
import { DeleteUserDialogComponent } from './user/delete-user-dialog/delete-user-dialog.component';
import { EditUserDialogComponent } from './user/edit-user-dialog/edit-user-dialog.component';
import { AuthInterceptor } from './user/auth.interceptor';
import { AddUserManagerPopupComponent } from './manager/add-user-manager-popup/add-user-manager-popup.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionErrorDialogComponent } from './SessionTraining/session-error-dialog/session-error-dialog.component';
import { SessionSuccessDialogComponent } from './SessionTraining/session-success-dialog/session-success-dialog.component';
import { ErrorDialogComponent } from './manager/error-dialog/error-dialog.component';
import { ScrimsDialogComponent } from './SessionTraining/scrims-dialog/scrims-dialog.component';
import { PlayerSelectDialogComponent } from './SessionTraining/player-select-dialog/player-select-dialog.component';
import { AddDepenseDialogComponent } from './Scrims/add-depense-dialog/add-depense-dialog.component';
import { AddRevenusDialogComponentComponent } from './Scrims/add-revenus-dialog-component/add-revenus-dialog-component.component';
import { InstallationDialogComponent } from './compitenceplayer/installation-dialog/installation-dialog.component';
import { LogicielDialogComponent } from './compitenceplayer/logiciel-dialog/logiciel-dialog.component';
import { UpdateInstallationDialogComponent } from './compitenceplayer/update-installation-dialog/update-installation-dialog.component';
import { UpdateLogicielDialogComponent } from './compitenceplayer/update-logiciel-dialog/update-logiciel-dialog.component';
import { InstallationSuccessDialogComponent } from './compitenceplayer/installation-success-dialog/installation-success-dialog.component';
import { LogicielSuccessDialogComponent } from './compitenceplayer/logiciel-success-dialog/logiciel-success-dialog.component';
import { MaterielSucessDialogComponent } from './compitenceplayer/materiel-sucess-dialog/materiel-sucess-dialog.component';
import { UpdateScrimsDialogComponent } from './SessionTraining/update-scrims-dialog/update-scrims-dialog.component';
import { ScrimsSuccessDialogComponentComponent } from './SessionTraining/scrims-success-dialog-component/scrims-success-dialog-component.component';
import { SuccessManagerDialogComponent } from './manager/success-manager-dialog/success-manager-dialog.component';
import { ErrorManagerDialogComponent } from './manager/error-manager-dialog/error-manager-dialog.component';
import { SucessManagerDeleteComponent } from './manager/sucess-manager-delete/sucess-manager-delete.component';
import { SucessManagerEditComponent } from './manager/sucess-manager-edit/sucess-manager-edit.component';
import { ErorManagerEditDialogComponent } from './manager/eror-manager-edit-dialog/eror-manager-edit-dialog.component';
import { SuccessClubDialogAddedComponent } from './club/success-club-dialog-added/success-club-dialog-added.component';
import { SuccessEditClubDialogComponent } from './club/success-edit-club-dialog/success-edit-club-dialog.component';
import { SucessAddedPlayerDialogComponent } from './player/sucess-added-player-dialog/sucess-added-player-dialog.component';
import { SuccessEditPlayerDialogComponent } from './player/success-edit-player-dialog/success-edit-player-dialog.component';
import { SuccessTournamentAddedDialogComponent } from './employee/success-tournament-added-dialog/success-tournament-added-dialog.component';
import { SuccessAddedTeamToTournamentComponent } from './employee/success-added-team-to-tournament/success-added-team-to-tournament.component';
import { ErrorAddedTeamToTournamentComponent } from './employee/error-added-team-to-tournament/error-added-team-to-tournament.component';
import { ErrorRemoveTeamFromTournamentComponent } from './employee/error-remove-team-from-tournament/error-remove-team-from-tournament.component';
import { SuccessRemoveTeamFromTournamentComponent } from './employee/success-remove-team-from-tournament/success-remove-team-from-tournament.component';
import { SuccessAddedDefiDialogComponent } from './defi/success-added-defi-dialog/success-added-defi-dialog.component';
import { ErrorAddedDefiToTournamentComponent } from './defi/error-added-defi-to-tournament/error-added-defi-to-tournament.component';
import { SuccessAddedTeamDialogComponent } from './team/success-added-team-dialog/success-added-team-dialog.component';
import { ErrorAddedTeamDialogComponent } from './team/error-added-team-dialog/error-added-team-dialog.component';
import { ErrorEditTeamDialogComponent } from './team/error-edit-team-dialog/error-edit-team-dialog.component';
import { SuccessRemovePlayerDialogComponent } from './team/success-remove-player-dialog/success-remove-player-dialog.component';
import { ErrorRemovePlayerDialogComponent } from './team/error-remove-player-dialog/error-remove-player-dialog.component';
import { SuccessAddedPlayerDialogComponent } from './team/success-added-player-dialog/success-added-player-dialog.component';
import { ErrorAddedPlayerDialogComponent } from './team/error-added-player-dialog/error-added-player-dialog.component';
import { SuccesAddedContractComponent } from './contractplayer/succes-added-contract/succes-added-contract.component';
import { ErrorAddedContractDialogComponent } from './contractplayer/error-added-contract-dialog/error-added-contract-dialog.component';
import { ErrorEditContractDialogComponent } from './contractplayer/error-edit-contract-dialog/error-edit-contract-dialog.component';
import { SuccessaddedAchivementComponent } from './achievementplayer/successadded-achivement/successadded-achivement.component';
import { ErrorAddedAchivementComponent } from './achievementplayer/error-added-achivement/error-added-achivement.component';



@NgModule({
  imports: [
    // MatFormFieldModule,
    // MatInputModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
     MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
    RouterModule.forChild(AppsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    NgApexchartsModule,
    TablerIconsModule.pick(TablerIcons),
    DragDropModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatNativeDateModule,
    NgScrollbarModule,
  ],
  exports: [TablerIconsModule],
  declarations: [
    AppChatComponent,
    AppPermissionComponent,
    AppNotesComponent,
    AppTodoComponent,
    AppTaskboardComponent,
    TaskDialogComponent,
    OkAppTaskComponent,
    DeleteAppTaskComponent,
    ListingDialogDataExampleDialogComponent,
    ListingComponent,
    DetailComponent,
    AppEmailComponent,
    AppFullcalendarComponent,
    CalendarDialogComponent,
    CalendarFormDialogComponent,
    AppTicketlistComponent,
    AppTicketDialogContentComponent,
    AppContactComponent,
    AppContactDialogContentComponent,
    AppClubComponent,
    AppAddClubComponent,
    AppClubDialogContentComponent,
    AppCoursesComponent,
    AppCourseDetailComponent,
    AppEmployeeComponent,
    AppEmployeeDialogContentComponent,
    AppAddEmployeeComponent,
    AppPlayerComponent,
    AppAddPlayerComponent,
    AppPlayerDialogContentComponent,
    AppDefiComponent,
    AppAddDefiComponent,
    AppDefiDialogContentComponent,
  AppContractPlayerComponent,
  AppContractPlayerDialogContentComponent,
  AppAddContractPlayerComponent,
  AppTournamentComponent,
  AppAddTournamentComponent,
  AppTournamentDialogContentComponent,
AppUserComponent,
AppAddUserComponent,
AppUserDialogContentComponent,
AppManagerComponent,
AppAddManagerComponent,
AppManagerDialogContentComponent,
  AppAddAchievementPlayerComponent,
  AppAchievementPlayerComponent,
  AppAchievementPlayerDialogContentComponent,
  AppScrimsComponent,
  AppAddScrimsComponent,
  AppScrimsDialogContentComponent,
  AppSessionTrainingComponent,
  AppAddSessionTrainingComponent,
  AppSessionTrainingDialogContentComponent,
AppTeamComponent,
AppTeamDialogContentComponent,
AppAddTeamComponent,
AppCompitencePlayerComponent,
AppAddCompitencePlayerComponent,
AppCompitencePlayerDialogContentComponent,
AppAchievementTeamComponent,
AppAchievementTeamDialogContentComponent,
AppAddAchievementTeamComponent,
AppCoachComponent,
AppAddCoachComponent,
AppCoachDialogContentComponent,
 AppInvoiceListComponent,
    AppInvoiceViewComponent,
    AppAddInvoiceComponent,
    AppEditInvoiceComponent,
    AddedDialogComponent,
    OkDialogComponent,
    AppBlogsComponent,
    AppBlogDetailsComponent,
    AddCoachToTeamDialogComponent,
    RemoveCoachFromTeamDialogComponent,
    AddPlayersToTeamDialogComponent,
    RemovePlayersFromTeamDialogComponent,
    AddTeamsToTournamentComponent,
    RemoveTeamsToTournamentComponent,
    AddUserPopupComponent,
    DeleteUserDialogComponent,
    EditUserDialogComponent,
    AddUserManagerPopupComponent,
    SessionErrorDialogComponent,
    SessionSuccessDialogComponent,
    ErrorDialogComponent,
    ScrimsDialogComponent,
    PlayerSelectDialogComponent,
      AddDepenseDialogComponent ,
      AddRevenusDialogComponentComponent,
      InstallationDialogComponent,
      LogicielDialogComponent,
      UpdateInstallationDialogComponent,
      UpdateLogicielDialogComponent,
      InstallationSuccessDialogComponent,
      LogicielSuccessDialogComponent,
      MaterielSucessDialogComponent,
      UpdateScrimsDialogComponent,
      ScrimsSuccessDialogComponentComponent,
      SuccessManagerDialogComponent,
      ErrorManagerDialogComponent,
      SucessManagerDeleteComponent,
      SucessManagerEditComponent,
      ErorManagerEditDialogComponent,
      SuccessClubDialogAddedComponent,
      SuccessEditClubDialogComponent,
      SucessAddedPlayerDialogComponent,
      SuccessEditPlayerDialogComponent,
      SuccessTournamentAddedDialogComponent,
      SuccessAddedTeamToTournamentComponent,
      ErrorAddedTeamToTournamentComponent,
      ErrorRemoveTeamFromTournamentComponent,
      SuccessRemoveTeamFromTournamentComponent,
      SuccessAddedDefiDialogComponent,
      ErrorAddedDefiToTournamentComponent,
      SuccessAddedTeamDialogComponent,
      ErrorAddedTeamDialogComponent,
      ErrorEditTeamDialogComponent,
      SuccessRemovePlayerDialogComponent,
      ErrorRemovePlayerDialogComponent,
      SuccessAddedPlayerDialogComponent,
      ErrorAddedPlayerDialogComponent,
      SuccesAddedContractComponent,
      ErrorAddedContractDialogComponent,
      ErrorEditContractDialogComponent,
      SuccessaddedAchivementComponent,
      ErrorAddedAchivementComponent
    
     ],
     
  providers: [DatePipe,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],

})
export class AppsModule {}
