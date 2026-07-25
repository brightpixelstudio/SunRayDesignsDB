import { Component } from '@angular/core';
import { FsLightbox } from 'fslightbox-angular';

@Component({
  selector: 'samplebanner',
  imports: [FsLightbox],
  templateUrl: './samplebanner.html',
  styleUrl: './samplebanner.css',
})
export class Samplebanner {
  // Controller variables
  toggler = false;
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
}
