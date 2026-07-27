import { Component, OnInit, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { Quote } from '../../models/quote';
import { ApiService } from '../../services/services';

@Component({
  selector: 'quotebanner',
  imports: [],
  templateUrl: './quotebanner.html',
  styleUrl: './quotebanner.css',
})
export class Quotebanner implements OnInit {
  quoteList: Quote[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  private loadQuotes(): void {
    this.apiService.getQuotes().subscribe((data: Quote[]) => {
      this.quoteList = data;

      this.cdr.detectChanges();
    });
  }
}
