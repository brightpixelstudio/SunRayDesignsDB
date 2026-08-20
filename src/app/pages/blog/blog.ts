import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from '../../services/serviceblog';
import { BlogType } from '../../enums/blogtype';
import type { GetAllBlogPosts } from '../../models/getallblogposts';
import type { GetAllPostsCountByYear } from '../../models/getallpostscountbyyear';
import type { GetBlogPostsBasedOnTypeAndYear } from '../../models/getblogpostsbasedontypeandyear';

@Component({
  selector: 'blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  blogtypeid = BlogType.Design;
  year: number = new Date().getFullYear();
  isContentLoaded: boolean = false;
  allPostList: GetAllBlogPosts[] = [];
  getAllPostsCountByYear: GetAllPostsCountByYear[] = [];
  getBlogPostsBasedOnTypeAndYear: GetBlogPostsBasedOnTypeAndYear[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    // call of API calls
    this.apiService.getAllBlogPosts().subscribe((data: GetAllBlogPosts[]) => {
      this.allPostList = data;
      console.log(this.allPostList);

      // Force Angular to run change detection on this component
      this.isContentLoaded = true;
      this.cdr.detectChanges();
    });

    /*
    const user$ = this.http.get(`https://typicode.com{userId}`);
    const posts$ = this.http.get(`https://typicode.com{userId}`);

    // Combine requests using a dictionary object
    return forkJoin({
      user: user$,
      posts: posts$
    });
    */

    /*
    this.apiService.getWork(worktypeid).subscribe((data: Work[]) => {
      this.workList = data;
      this.myHtmlContent = this.workList[0].content;

      // 2. Force Angular to run change detection on this component
      this.cdr.detectChanges();
      if (worktypeid == WorkType.Web) {
        this.setSources();
      }
    });
    */
  }
}
