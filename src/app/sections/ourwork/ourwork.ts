import { Component, OnInit, inject } from '@angular/core';
import { FsLightbox } from 'fslightbox-angular';
import { ApiService } from '../../services/services';
import type { Work } from '../../models/work';
import { Observable } from 'rxjs';

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
  worktypeid: number = 1;

  isVisableWebsiteContent: boolean = true;
  isVisablePrintContent: boolean = false;
  isVisableMobileContent: boolean = false;
  currentImageOver: string = 'images/bluebarnov.png';
  currentImageDis: string = 'images/barndis.png';
  currentImageWebsite: string = this.currentImageOver;
  currentImagePrint: string = this.currentImageDis;
  currentImageMobile: string = this.currentImageDis;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadWork(this.worktypeid);
    //console.log('after' + this.workList);
  }

  private loadWork(worktypeid: number): void {
    this.apiService.getWork(worktypeid).subscribe((res) => {
      this.workList = res;
      //this.workList = data;

      //if (worktypeid === 1) {
      //  this.setSources();
      //}
      //console.log(this.workList);
    });
  }

  private setSources(): void {
    this.toggler = false;
    this.sources = [];
    this.workList.forEach((workItem) => {
      this.sources.push(`/images/ourwork/web/large/${workItem.number}_Image.jpg`);
    });

    /*
    this.sourcesList = [
      '/images/ourwork/web/large/33_Image.jpg',
      '/images/ourwork/web/large/30_Image.jpg',
      '/images/ourwork/web/large/31_Image.jpg',
      '/images/ourwork/web/large/32_Image.jpg',
      '/images/ourwork/web/large/33_Image.jpg',
      '/images/ourwork/web/large/35_Image.jpg',
      '/images/ourwork/web/large/36_Image.jpg',
      '/images/ourwork/web/large/37_Image.jpg',
      '/images/ourwork/web/large/38_Image.jpg',
      '/images/ourwork/web/large/39_Image.jpg',
      '/images/ourwork/web/large/30_Image.jpg',
      '/images/ourwork/web/large/27_Image.jpg',
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
      '/images/ourwork/web/large/11_Image.jpg',
      '/images/ourwork/web/large/12_Image.jpg',
      '/images/ourwork/web/large/29_Image.jpg',
      '/images/ourwork/web/large/14_Image.jpg',
      '/images/ourwork/web/large/15_Image.jpg',
      '/images/ourwork/web/large/16_Image.jpg',
      '/images/ourwork/web/large/17_Image.jpg',
      '/images/ourwork/web/large/18_Image.jpg',
      '/images/ourwork/web/large/19_Image.jpg',
      '/images/ourwork/web/large/20_Image.jpg',
      '/images/ourwork/web/large/21_Image.jpg',
      '/images/ourwork/web/large/22_Image.jpg',
      '/images/ourwork/web/large/23_Image.jpg',
      '/images/ourwork/web/large/24_Image.jpg',
      '/images/ourwork/web/large/25_Image.jpg',
      '/images/ourwork/web/large/26_Image.jpg',
      '/images/ourwork/web/large/27_Image.jpg',
      '/images/ourwork/web/large/28_Image.jpg',
    ];
    */
  }

  toggleWebsiteContent(): void {
    this.worktypeid = 1;
    this.isVisableWebsiteContent = true;
    this.isVisablePrintContent = false;
    this.isVisableMobileContent = false;
    this.currentImageWebsite = this.currentImageOver;
    this.currentImagePrint = this.currentImageDis;
    this.currentImageMobile = this.currentImageDis;
    this.loadWork(this.worktypeid);
  }

  toggleMobileContent() {
    this.worktypeid = 2;
    this.isVisableWebsiteContent = false;
    this.isVisablePrintContent = false;
    this.isVisableMobileContent = true;
    this.currentImageWebsite = this.currentImageDis;
    this.currentImagePrint = this.currentImageDis;
    this.currentImageMobile = this.currentImageOver;
    this.loadWork(this.worktypeid);
  }

  togglePrintContent() {
    this.worktypeid = 3;
    this.isVisableWebsiteContent = false;
    this.isVisablePrintContent = true;
    this.isVisableMobileContent = false;
    this.currentImageWebsite = this.currentImageDis;
    this.currentImagePrint = this.currentImageOver;
    this.currentImageMobile = this.currentImageDis;
    this.loadWork(this.worktypeid);
  }
}
