// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Work } from '../models/work';

@Injectable({
  providedIn: 'root', // Makes the service a global singleton
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7099/SunrayWork'; // LOCAL ONLY

  // GET request to fetch data
  getWork(worktypeid: number): Observable<Work[]> {
    const queryParams = new HttpParams().set('worktypeid', worktypeid.toString());

    //return this.http.get<Work[]>(this.apiUrl, { params: queryParams });
    return this.http.get<Work[]>('', { params: queryParams });
  }

  // POST request to send data
  //createWork: Omit<Post, 'id'>): Observable<Work> {
  //  return this.http.post<Work>(this.apiUrl, post);
  //}
}
