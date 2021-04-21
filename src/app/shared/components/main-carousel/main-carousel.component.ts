import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  OnChanges,
  ChangeDetectionStrategy,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  SwiperConfigInterface,
  SwiperDirective,
  SwiperPaginationInterface,
} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss'],
})
export class MainCarouselComponent implements OnInit, AfterViewInit, OnChanges {
  slides: Array<any>;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  @Input() slidesInput: Array<any>;

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.slides =
      changes.slidesInput.currentValue || changes.slidesInput.previousValue;
  }

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
      observer: true,
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
