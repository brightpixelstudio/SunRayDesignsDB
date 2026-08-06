import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Technology } from '../../models/technology';
import { TechnologyType } from '../../enums/technologytypes';
import { ApiService } from '../../services/services';

@Component({
  selector: 'technologybanner',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './technologybanner.html',
  styleUrl: './technologybanner.css',
})
export class Technologybanner implements OnInit {
  technologyList: Technology[] = [];
  technologytypeid = TechnologyType.Black;
  maxAllowedAmount = 6;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTechnologies(this.technologytypeid);
  }

  private loadTechnologies(technologytypeid: number): void {
    this.apiService.getTechnology(technologytypeid).subscribe((data: Technology[]) => {
      //this.technologyList = data.slice(0, this.maxAllowedAmount);
      this.technologyList = data;

      this.cdr.detectChanges();
    });
  }
}
