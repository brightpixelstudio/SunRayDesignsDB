import { Component, OnInit, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { Industry } from '../../models/industry';
import { ApiService } from '../../services/services';

@Component({
  selector: 'whowearebanner',
  imports: [],
  templateUrl: './whowearebanner.html',
  styleUrl: './whowearebanner.css',
})
export class Whowearebanner implements OnInit {
  industryList: Industry[] = [];
  isVisableWhoWeAreContent: boolean = true;
  isVisableCoreValuesContent: boolean = false;
  isVisableOurProcessContent: boolean = false;
  isVisableIndustriesContent: boolean = false;
  currentImageOver: string = 'images/bluebarnov.png';
  currentImageDis: string = 'images/barndis.png';
  currentImageWhoWeAre: string = this.currentImageOver;
  currentImageCoreValues: string = this.currentImageDis;
  currentImageOurProcess: string = this.currentImageDis;
  currentImageIndustries: string = this.currentImageDis;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  private loadQuotes(): void {
    this.apiService.getIndustries().subscribe((data: Industry[]) => {
      this.industryList = data;

      this.cdr.detectChanges();
    });
  }

  togglesWhoWeAreContent() {
    this.isVisableWhoWeAreContent = true;
    this.isVisableCoreValuesContent = false;
    this.isVisableOurProcessContent = false;
    this.isVisableIndustriesContent = false;
    this.currentImageWhoWeAre = this.currentImageOver;
    this.currentImageCoreValues = this.currentImageDis;
    this.currentImageOurProcess = this.currentImageDis;
    this.currentImageIndustries = this.currentImageDis;
  }

  toggleCoreValuesContent() {
    this.isVisableWhoWeAreContent = false;
    this.isVisableCoreValuesContent = true;
    this.isVisableOurProcessContent = false;
    this.isVisableIndustriesContent = false;
    this.currentImageWhoWeAre = this.currentImageDis;
    this.currentImageCoreValues = this.currentImageOver;
    this.currentImageIndustries = this.currentImageDis;
    this.currentImageOurProcess = this.currentImageDis;
  }

  toggleOurProcessContent() {
    this.isVisableWhoWeAreContent = false;
    this.isVisableCoreValuesContent = false;
    this.isVisableIndustriesContent = false;
    this.isVisableOurProcessContent = true;
    this.currentImageWhoWeAre = this.currentImageDis;
    this.currentImageCoreValues = this.currentImageDis;
    this.currentImageIndustries = this.currentImageDis;
    this.currentImageOurProcess = this.currentImageOver;
  }

  toggleIndustriesContent() {
    this.isVisableWhoWeAreContent = false;
    this.isVisableCoreValuesContent = false;
    this.isVisableOurProcessContent = false;
    this.isVisableIndustriesContent = true;
    this.currentImageWhoWeAre = this.currentImageDis;
    this.currentImageCoreValues = this.currentImageDis;
    this.currentImageOurProcess = this.currentImageDis;
    this.currentImageIndustries = this.currentImageOver;
  }
}
