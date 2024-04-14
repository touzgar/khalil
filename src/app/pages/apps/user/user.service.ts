import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { User } from '../../authentication/model/login.model';
import { Role } from '../../authentication/model/Role.model';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL:string='http://localhost:8089/users'
  constructor(private http: HttpClient,private authService:AuthServiceService) { }
role!:Role[];
image:Image[];


  listeUser():Observable<User[]>{
    let jwt = this.authService.getToken();
    console.log("JWT Token:", jwt); // Debug: Log the JWT token
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<User[]>(this.apiURL+"/manager-admin-roles",{headers:httpHeaders});
  }
  
  getAllRoles():Observable<Role[]> {
    let jwt=this.authService.getToken();
    console.log("JWT Token:", jwt); // Debug: Log the JWT token
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
     return this.http.get<Role[]>(this.apiURL + '/allRoles',{headers:httpHeaders});
  }
 
  addUserWithRole(user: any): Observable<User> { // Adjust `any` to your `User` type or the specific type you're using for payload
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<User>(`${this.apiURL}/addUserWithRole`, user, { headers: headers });
  }
  addManagerWithRole(user: any): Observable<User> { // Adjust `any` to your `User` type or the specific type you're using for payload
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<User>(`${this.apiURL}/addUserss`, user, { headers: headers })
    .pipe(
      catchError(error => {
        // Convert server error to user-friendly message if needed
        const message = error.error.message || "An unexpected error occurred.";
        return throwError(() => new Error(message));
      })
    );
  }
  

  deleteUser(userId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.apiURL}/deleteUser/${userId}`, { headers: headers });
  }
  updateUser(userId: number, userData: any): Observable<User> {
    const token = this.authService.getToken(); // Use getToken() from AuthServiceService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<User>(`${this.apiURL}/updateUser/${userId}`, userData, { headers });
  }
  listeUsers():Observable<User[]>{
    let jwt = this.authService.getToken();
    console.log("JWT Token:", jwt); // Debug: Log the JWT token
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});
    return this.http.get<User[]>(this.apiURL+"/specific-roles",{headers:httpHeaders});
  }
  uploadImage(file:File,filename:string):Observable<any>{
    const imageFormData=new FormData();
    imageFormData.append('image', file , filename) ;
    const url= `${this.apiURL+'/api/image/upload'}`;
    return this.http.post(url,imageFormData);
  }
  loadImage(id:number):Observable<Image>{
    const url =`${this.apiURL+'/api/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
  
  
  
}
