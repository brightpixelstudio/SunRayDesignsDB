import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TechnologyType } from '../../enums/technologytypes';
import { Technology } from '../../models/technology';
import { ApiService } from '../../services/services';

@Component({
  selector: 'technologies',
  imports: [],
  templateUrl: './technologies.html',
  styleUrl: './technologies.css',
})
export class Technologies implements OnInit {
  technologyList: Technology[] = [];
  technologytypeid = TechnologyType.White;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTechnologies(this.technologytypeid);
  }

  private loadTechnologies(technologytypeid: number): void {
    this.apiService.getTechnology(technologytypeid).subscribe((data: Technology[]) => {
      this.technologyList = data;

      this.cdr.detectChanges();
    });
  }
}
