import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { Team } from '../team/team.model';
import { Installation } from './installationmodel';
import { Logiciel } from './logiciel.model';
import { Materiel } from './materielmodel';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  materiel:Materiel[];
  baseUrl = 'http://localhost:8089/users/api/materiel';
  apiUrl = 'http://localhost:8089/users/api/installation';
  api = 'http://localhost:8089/users/api/logiciel';
  team = 'http://localhost:8089/users/api/team';
  constructor(private http: HttpClient,private authService:AuthServiceService) { }
  addMateriel(materielData: Materiel): Observable<Materiel> {
   
    return this.http.post<Materiel>(`${this.baseUrl}/add`, materielData, { headers:this.getHeaders() });
  }
  addInstallation(installationData: Installation): Observable<Installation> {
   
    return this.http.post<Installation>(`${this.apiUrl}/add`, installationData, { headers:this.getHeaders() });
  }
  addLogiciel(logicielData: Logiciel): Observable<Logiciel> {
   
    return this.http.post<Logiciel>(`${this.api}/add`, logicielData, { headers:this.getHeaders() });
  }
 
  // Helper method to construct headers
  private getHeaders(): HttpHeaders {
    let jwt = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    });
  }
  getTeams(): Observable<Team[]> {
    let jwt=this.authService.getToken();
      jwt="Bearer "+jwt;
      let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Team[]>(`${this.team}/getAll`, { headers: this.getHeaders() });
  }
  getMateriel(): Observable<Materiel[]> {
    let jwt=this.authService.getToken();
      jwt="Bearer "+jwt;
      let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Materiel[]>(`${this.baseUrl}/getAll`, { headers: this.getHeaders() });
  }
  getInstallation(): Observable<Installation[]> {
    let jwt=this.authService.getToken();
      jwt="Bearer "+jwt;
      let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Installation[]>(`${this.apiUrl}/getAll`, { headers: this.getHeaders() });
  }
  getLogiciel(): Observable<Logiciel[]> {
    let jwt=this.authService.getToken();
      jwt="Bearer "+jwt;
      let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Logiciel[]>(`${this.api}/getAll`, { headers: this.getHeaders() });
  }
  supprimerMateriel(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
  supprimerInstallation(id:number){
    const url=`${this.apiUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
  supprimerLogiciel(id:number){
    const url=`${this.api}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
updateMateriel(mat: Materiel): Observable<Materiel> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.put<Materiel>(`${this.baseUrl}/update/${mat.materielId}`, mat, { headers: httpHeaders });
}
updateInstallation(ins: Installation): Observable<Installation> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.put<Installation>(`${this.apiUrl}/update/${ins.installationId}`, ins, { headers: httpHeaders });
}
updateLogiciel(log: Logiciel): Observable<Logiciel> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({ "Authorization": jwt });

  return this.http.put<Logiciel>(`${this.api}/update/${log.logicielId}`, log, { headers: httpHeaders });
}

}
