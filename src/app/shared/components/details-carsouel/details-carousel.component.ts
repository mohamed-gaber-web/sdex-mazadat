import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {
  SwiperConfigInterface,
  SwiperPaginationInterface,
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-details-carousel',
  templateUrl: './details-carousel.component.html',
  styleUrls: ['./details-carousel.component.scss'],
})
export class DetailsCarouselComponent implements OnInit, AfterViewInit {
  @Input() details: Array<string>;

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
  };

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      speed: 500,
      effect: 'slide',
    };
  }
}
