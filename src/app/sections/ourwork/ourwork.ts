import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FsLightbox } from 'fslightbox-angular';
import { ApiService } from '../../services/services';
import type { Work } from '../../models/work';
import { WorkType } from '../../enums/worktypes';

@Component({
  selector: 'ourwork',
  imports: [FsLightbox],
  templateUrl: './ourwork.html',
  styleUrl: './ourwork.css',
})
export class Ourwork implements OnInit {
  workList: Work[] = [];
  toggler: boolean = false;
  sources: string[] = [];
  worktypeid = WorkType.Web;

  isVisableWebsiteContent: boolean = true;
  isVisablePrintContent: boolean = false;
  isVisableMobileContent: boolean = false;
  isVisableLatestContent: boolean = false;
  currentImageOver: string = 'images/bluebarnov.png';
  currentImageDis: string = 'images/barndis.png';
  currentImageWebsite: string = this.currentImageOver;
  currentImagePrint: string = this.currentImageDis;
  currentImageMobile: string = this.currentImageDis;
  currentImageLatest: string = this.currentImageDis;

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
    this.toggler = false;
    this.sources = [];
    this.workList.forEach((workItem) => {
      this.sources.push(`/images/ourwork/web/large/${workItem.number}_Image.jpg`);
    });
  }

  toggleWebsiteContent(): void {
    this.worktypeid = WorkType.Web;
    this.isVisableWebsiteContent = true;
    this.isVisablePrintContent = false;
    this.isVisableMobileContent = false;
    this.isVisableLatestContent = false;
    this.currentImageWebsite = this.currentImageOver;
    this.currentImagePrint = this.currentImageDis;
    this.currentImageMobile = this.currentImageDis;
    this.currentImageLatest = this.currentImageDis;
    this.loadWork(this.worktypeid);
  }

  toggleMobileContent() {
    this.worktypeid = WorkType.Mobile;
    this.isVisableWebsiteContent = false;
    this.isVisablePrintContent = false;
    this.isVisableMobileContent = true;
    this.isVisableLatestContent = false;
    this.currentImageWebsite = this.currentImageDis;
    this.currentImagePrint = this.currentImageDis;
    this.currentImageMobile = this.currentImageOver;
    this.currentImageLatest = this.currentImageDis;
    this.loadWork(this.worktypeid);
  }

  togglePrintContent() {
    this.worktypeid = WorkType.Print;
    this.isVisableWebsiteContent = false;
    this.isVisablePrintContent = true;
    this.isVisableMobileContent = false;
    this.isVisableLatestContent = false;
    this.currentImageWebsite = this.currentImageDis;
    this.currentImagePrint = this.currentImageOver;
    this.currentImageMobile = this.currentImageDis;
    this.currentImageLatest = this.currentImageDis;
    this.loadWork(this.worktypeid);
  }
  toggleLatestContent() {
    this.worktypeid = WorkType.Latest;
    this.isVisableWebsiteContent = false;
    this.isVisablePrintContent = false;
    this.isVisableMobileContent = false;
    this.isVisableLatestContent = true;
    this.currentImageWebsite = this.currentImageDis;
    this.currentImagePrint = this.currentImageDis;
    this.currentImageMobile = this.currentImageDis;
    this.currentImageLatest = this.currentImageOver;
    this.loadWork(this.worktypeid);
  }
}
