// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { GetBlogPost } from '../models/getblogpost';

@Injectable({
  providedIn: 'root', // Makes the service a global singleton
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7099/SunrayBlog'; // LOCAL ONLY

  // get ALL Blog information
  getBlogInformation(yearparam: number, typeparam: number): Observable<any> {
    const allposts$ = this.http.get(this.apiUrl + '/GetAllBlogPosts');
    const postsperyear$ = this.http.get(
      this.apiUrl + `/GetAllPostsCountByYear?yearparam=${yearparam}`,
    );
    const postsbasedontypeandyear$ = this.http.get(
      this.apiUrl + `/GetBlogPostsBasedOnTypeAndYear?yearparam=${yearparam}&typeparam=${typeparam}`,
    );
    return forkJoin({
      allposts: allposts$,
      postsperyear: postsperyear$,
      postsbasedontypeandyear: postsbasedontypeandyear$,
    });
  }

  getBlogPost(blogpostid: number): Observable<GetBlogPost[]> {
    const queryParams = new HttpParams().set('blogpostid', blogpostid.toString());

    return this.http.get<GetBlogPost[]>(this.apiUrl + '/GetBlogPost', {
      params: queryParams,
    });
  }

  // POST request to send data
  //createWork: Omit<Post, 'id'>): Observable<Work> {
  //  return this.http.post<Work>(this.apiUrl, post);
  //}
}
