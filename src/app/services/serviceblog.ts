// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllBlogPosts } from '../models/getallblogposts';
import { GetAllPostsCountByYear } from '../models/getallpostscountbyyear';
import { GetBlogPostsBasedOnTypeAndYear } from '../models/getblogpostsbasedontypeandyear';

@Injectable({
  providedIn: 'root', // Makes the service a global singleton
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7099/SunrayBlog'; // LOCAL ONLY

  // GET request to fetch data
  getAllBlogPosts(): Observable<GetAllBlogPosts[]> {
    return this.http.get<GetAllBlogPosts[]>(this.apiUrl + '/GetAllBlogPosts');
  }

  getAllPostsCountByYear(yearparam: number): Observable<GetAllPostsCountByYear[]> {
    const queryParams = new HttpParams().set('worktypeid', yearparam.toString());

    return this.http.get<GetAllPostsCountByYear[]>(this.apiUrl + '/GetAllPostsCountByYear', {
      params: queryParams,
    });
  }

  getBlogPostsBasedOnTypeAndYear(
    typeparam: number,
    yearparam: number,
  ): Observable<GetBlogPostsBasedOnTypeAndYear[]> {
    let queryParams = new HttpParams()
      .set('typeparam', typeparam.toString())
      .set('yearparam', yearparam.toString());

    return this.http.get<GetBlogPostsBasedOnTypeAndYear[]>(
      this.apiUrl + '/GetBlogPostsBasedOnTypeAndYear',
      {
        params: queryParams,
      },
    );
  }

  // POST request to send data
  //createWork: Omit<Post, 'id'>): Observable<Work> {
  //  return this.http.post<Work>(this.apiUrl, post);
  //}
}
