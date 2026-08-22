import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/serviceblog';
import { BlogType } from '../../enums/blogtype';
import type { GetBlogPost } from '../../models/getblogpost';

@Component({
  selector: 'blog',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit {
  blogtypeid: number = BlogType.Design;
  year: number = new Date().getFullYear();
  getBlogInformation: any = '';
  blogPost: GetBlogPost[] = [];
  isContentLoaded: boolean = false;
  noContent: boolean = true;
  blogpostid: number = 5;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  onCatagorySelect(selectedValue: any): void {
    this.blogtypeid = selectedValue;
    this.loadPosts();
  }

  onYearSelect(selectedValue: any): void {
    this.year = selectedValue;
    // this.getAllPostsCountByYearByMonth();
    this.loadPosts();
  }

  onCategoryLinkClick(event: MouseEvent, blogtypeid: number) {
    // Prevent the browser from navigating to the href URL
    event.preventDefault();

    // set the new catagory type and get contents
    this.blogtypeid = blogtypeid;
    this.loadPosts();
  }

  onArchiveLinkClick(event: MouseEvent, month: number) {
    // Prevent the browser from navigating to the href URL
    event.preventDefault();

    // set the new catagory type and get contents
    console.log(month);
    //    this.blogtypeid = blogtypeid;
    //    this.loadPosts();
  }

  truncateString(str: string, maxLength: number): string {
    // If the string is already short enough, return it as-is
    if (str.length <= maxLength) {
      return str;
    }

    // Account for the 3 characters of the ellipsis
    const ellipsis = '...';
    return str.slice(0, maxLength - ellipsis.length) + ellipsis;
  }

  private loadPosts(): void {
    // get ALL Blog information
    this.isContentLoaded = false;
    this.noContent = false;
    this.apiService.getBlogInformation(this.year, this.blogtypeid).subscribe({
      next: (data) => {
        // Data maps exactly to the keys defined in forkJoin
        this.getBlogInformation = data;
        console.log(this.getBlogInformation);

        // shorten the summary if needed
        for (const post of this.getBlogInformation.getlatestblogposts) {
          post.summary = this.truncateString(post.summary, 110);
        }

        // load a blog post
        this.isContentLoaded = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.noContent = true;
        this.cdr.detectChanges();
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
