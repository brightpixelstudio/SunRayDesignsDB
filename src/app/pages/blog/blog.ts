import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/serviceblog';
import { BlogType } from '../../enums/blogtype';
import type { GetBlogPost } from '../../models/getblogpost';

@Component({
  selector: 'blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  blogtypeid = BlogType.Design;
  year: number = new Date().getFullYear();
  getBlogInformation: any = '';
  blogPost: GetBlogPost[] = [];
  isContentLoaded: boolean = false;
  blogpostid: number = 5;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    // get ALL Blog information
    this.apiService.getBlogInformation(2026, this.blogtypeid).subscribe({
      next: (data) => {
        // Data maps exactly to the keys defined in forkJoin
        this.getBlogInformation = data;

        // load a blog post
        this.loadPost();
      },
      error: (err) => {
        console.error('One or more requests failed:', err);
      },
    });
  }

  private loadPost(): void {
    // get ALL Blog information
    this.apiService.getBlogPost(this.blogpostid).subscribe({
      next: (data) => {
        this.blogPost = data;

        // Force Angular to run change detection on this component
        this.isContentLoaded = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('One or more requests failed:', err);
      },
    });
  }
}
