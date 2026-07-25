import { Component, ChangeDetectorRef } from '@angular/core';
import { FsLightbox } from 'fslightbox-angular';
import type { Work } from '../../models/work';
import { WorkType } from '../../enums/worktypes';
import { ApiService } from '../../services/services';

@Component({
  selector: 'samplebanner',
  imports: [FsLightbox],
  templateUrl: './samplebanner.html',
  styleUrl: './samplebanner.css',
})
export class Samplebanner {
  toggler: boolean = false;
  workList: Work[] = [];
  sources: string[] = [];
  worktypeid = WorkType.Web;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadWork(this.worktypeid);
  }

  private loadWork(worktypeid: number): void {
    this.apiService.getWork(worktypeid).subscribe((data: Work[]) => {
      this.workList = data;

      // 2. Force Angular to run change detection on this component
      this.cdr.detectChanges();
      if (worktypeid == WorkType.Web) {
        this.setSources();
      }
    });
  }

  private setSources(): void {
    this.sources = [];
    this.workList.forEach((workItem) => {
      this.sources.push(`/images/ourwork/web/large/${workItem.number}_Image.jpg`);
    });
  }

  // Controller variables
  /*
  sources = [
    '/images/ourwork/web/large/1_Image.jpg',
    '/images/ourwork/web/large/2_Image.jpg',
    '/images/ourwork/web/large/3_Image.jpg',
    '/images/ourwork/web/large/4_Image.jpg',
    '/images/ourwork/web/large/5_Image.jpg',
    '/images/ourwork/web/large/6_Image.jpg',
    '/images/ourwork/web/large/7_Image.jpg',
    '/images/ourwork/web/large/8_Image.jpg',
    '/images/ourwork/web/large/9_Image.jpg',
    '/images/ourwork/web/large/10_Image.jpg',
  ];
  */
}
