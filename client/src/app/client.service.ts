import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fighter } from './fighter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FighterService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getFighters(): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${this.apiServerUrl}/fighter/all`);
  }

  public addFighter(fighter: Fighter): Observable<Fighter> {
    return this.http.post<Fighter>(`${this.apiServerUrl}/fighter/add`, fighter);
  }

  public updateFighter(fighter: Fighter): Observable<Fighter> {
    return this.http.put<Fighter>(`${this.apiServerUrl}/fighter/update`, fighter);
  }

  public deleteFighter(fighterId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/fighter/delete/${fighterId}`);
  }
}
