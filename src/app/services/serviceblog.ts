// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { GetBlogPost } from '../models/getblogpost';
import { GetAllPostsCountByYearByMonth } from '../models/getallpostscountbyyearbymonth';

@Injectable({
  providedIn: 'root', // Makes the service a global singleton
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:7099/SunrayBlog'; // LOCAL ONLY

  // get ALL Blog information
  getBlogInformation(
    yearparam: number,
    monthparam: number | undefined,
    typeparam: number | undefined,
  ): Observable<any> {
    // NOTE - you dont need models for this architecture
    //  const allposts$ = this.http.get(this.apiUrl + '/GetAllBlogPosts');
    const getallpostscountbyyearbymonth$ = this.http.get(
      this.apiUrl + `/GetAllPostsCountByYearByMonth?yearparam=${yearparam}`,
    );

    // is there a blog type?
    let typequeryparam: string = '';
    if (typeparam != undefined) {
      typequeryparam = `&typeparam=${typeparam}`;
    }

    // is there a month?
    let monthqueryparam: string = '';
    if (monthparam != undefined) {
      monthqueryparam = `&monthparam=${monthparam}`;
    }
    const postsbasedontypeandyear$ = this.http.get(
      this.apiUrl +
        `/GetBlogPostsBasedOnTypeAndYear?&yearparam=${yearparam}` +
        typequeryparam +
        monthqueryparam,
    );
    const getallblogpostyears$ = this.http.get(this.apiUrl + '/GetAllBlogPostYears');
    const getallblogtypes$ = this.http.get(this.apiUrl + '/GetAllBlogTypes');
    const getlatestblogposts$ = this.http.get(this.apiUrl + '/GetLatestBlogPosts');
    const getallpostscountbyyearbycategory$ = this.http.get(
      this.apiUrl + `/getallpostscountbyyearbycategory?yearparam=${yearparam}`,
    );
    return forkJoin({
      //allposts: allposts$,
      getallpostscountbyyearbymonth: getallpostscountbyyearbymonth$,
      postsbasedontypeandyear: postsbasedontypeandyear$,
      getallblogpostyears: getallblogpostyears$,
      getallblogtypes: getallblogtypes$,
      getlatestblogposts: getlatestblogposts$,
      getallpostscountbyyearbycategory: getallpostscountbyyearbycategory$,
    });
  }

  getBlogPost(url: string): Observable<GetBlogPost[]> {
    const queryParams = new HttpParams().set('url', url);

    return this.http.get<GetBlogPost[]>(this.apiUrl + '/GetBlogPost', {
      params: queryParams,
    });
  }

  // POST request to send data
  //createWork: Omit<Post, 'id'>): Observable<Work> {
  //  return this.http.post<Work>(this.apiUrl, post);
  //}
}
