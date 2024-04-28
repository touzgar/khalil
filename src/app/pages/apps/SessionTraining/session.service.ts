import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../authentication/auth-service.service';
import { User } from '../../authentication/model/login.model';
import { Player } from '../player/player';
import { Scrims } from '../Scrims/Scrims.model';
import { Team } from '../team/team.model';
import { Session } from './session.model';


@Injectable({
  providedIn: 'root'
})


export class SessionService {
session:Session[];
baseUrl = 'http://localhost:8089/users/api/session';
apiUrl='http://localhost:8089/users'
url='http://localhost:8089/users/api/player'
api='http://localhost:8089/users/api/scrims'
team='http://localhost:8089/users/api/team'

  constructor(private http:HttpClient, private authService:AuthServiceService) { }
  listeSession():Observable<Session[]>{
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
    return this.http.get<Session[]>(this.baseUrl+"/getAll",{headers:httpHeaders});
  }
  supprimerSession(id:number){
    const url=`${this.baseUrl}/delete/${id}`;
    let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.delete(url,{headers:httpHeaders});
}
updateSession(id: number, sessionData: Session): Observable<Session> {
  const url = `${this.baseUrl}/update/${id}`;
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  // No change is needed here if the Session object is already in the right structure
  return this.http.put<Session>(url, sessionData, { headers });
}

addSession(sessionData: any): Observable<any> {
  const headers = this.getHeaders();
  // Assuming the structure matches the backend expectations
  return this.http.post<any>(`${this.baseUrl}/add`, sessionData, { headers });
}

// Helper method to construct headers
private getHeaders(): HttpHeaders {
  let jwt = this.authService.getToken();
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwt}`
  });
}

rechercheParNameSession(sessionName: string): Observable<Session[]> {
  const url = `${this.baseUrl}/search?name=${sessionName}`;
  let jwt = this.authService.getToken();
  let httpHeaders = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Session[]>(url, { headers: httpHeaders });
}
getCoaches(): Observable<User[]> {
  let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.get<User[]>(`${this.apiUrl}/getCoach`, { headers: this.getHeaders() });
}

getPlayers(): Observable<Player[]> {
  let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.get<Player[]>(`${this.url}/getAll`, { headers: this.getHeaders() });
}
createScrims(scrimsData: Scrims): Observable<Scrims> {
  return this.http.post<Scrims>(`${this.api}/add`, scrimsData, { headers: this.getHeaders() });
}

listeScrims(): Observable<Scrims[]> {
  let jwt = this.authService.getToken();
  jwt = "Bearer " + jwt;
  let httpHeaders = new HttpHeaders({"Authorization": jwt});
  return this.http.get<Scrims[]>(`${this.api}/getAll`, {headers: httpHeaders});
}
getTeams(): Observable<Team[]> {
  let jwt=this.authService.getToken();
    jwt="Bearer "+jwt;
    let httpHeaders=new HttpHeaders({"Authorization":jwt});
  return this.http.get<Team[]>(`${this.team}/getAll`, { headers: this.getHeaders() });
}
getPlayersByTeamNames(teamNames: string[]): Observable<Player[]> {
  let jwt = this.authService.getToken();
  let headers = new HttpHeaders({
    'Authorization': `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  });

  // Use HTTPParams for query parameters
  const params = new HttpParams({
    fromObject: { teamNames: teamNames } // This will correctly format `teamNames` as `teamNames[]=team1&teamNames[]=team2`, etc.
  });

  return this.http.get<Player[]>(`${this.team}/getPlayersByTeamNames`, { headers, params });
}




}
