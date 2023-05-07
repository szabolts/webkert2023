import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  images = [
    { src: 'assets/images/running1.jpg', alt: 'Image 1' },
    { src: 'assets/images/running2.jpg', alt: 'Image 2' },
    { src: 'assets/images/running3.jpg', alt: 'Image 3' },
    { src: 'assets/images/running4.jpg', alt: 'Image 1' },
    { src: 'assets/images/running5.jpg', alt: 'Image 2' }
  ];

  constructor() {}

  ngOnInit(): void{

  }
}
