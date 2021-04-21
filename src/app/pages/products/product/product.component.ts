import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { Meta } from '@angular/platform-browser';import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Product>;

  constructor(public appService:AppService, 
              private activatedRoute: ActivatedRoute, 
              public dialog: MatDialog, 
              public formBuilder: FormBuilder,
              private meta: Meta,
              @Inject(DOCUMENT) private document) {

    this.meta.addTags([
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@themeseason' },
      { name: 'twitter:title', content: 'Product Name' },
      { name: 'twitter:description', content: 'Product description' },
      { name: 'twitter:image', content: 'https://fakeimg.pl/600x400/' },
      { name: 'og:title', content: 'Product Name' },
      { name: 'og:description', content: 'Product description' },
      { name: 'og:image', content: 'https://fakeimg.pl/600x400/' },
      { name: 'og:url', content: 'http://themeseason.com' },
      { name: 'og:site_name', content: 'Emporium' },
      { name: 'og:type', content: 'website' }
    ]);

  }

  ngOnInit() {      
    this.sub = this.activatedRoute.params.subscribe(params => { 
      this.getProductById(params['id']); 
    }); 
    this.form = this.formBuilder.group({ 
      'review': [null, Validators.required],            
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    }); 
    this.getRelatedProducts();    
  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,      
      keyboard: true,
      navigation: true,
      pagination: false,       
      loop: false, 
      preloadImages: false,
      lazy: true, 
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.meta.removeTag('name="twitter:card"');
    this.meta.removeTag('name="twitter:site"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('name="twitter:image"');
    this.meta.removeTag('name="og:title"');
    this.meta.removeTag('name="og:description"');
    this.meta.removeTag('name="og:image"');
    this.meta.removeTag('name="og:url"');
    this.meta.removeTag('name="og:site_name"');
    this.meta.removeTag('name="og:type"');
  } 

  public getProductById(id){
    this.appService.getProductById(id).subscribe(data=>{
      this.product = data;
      this.image = data.images[0].medium;
      this.zoomImage = data.images[0].big;
      setTimeout(() => { 
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });

      let port = (this.document.location.port) ? ':'+this.document.location.port+'/' : '/';   
      let url = this.document.location.protocol +'//'+ this.document.location.hostname + port;
      this.meta.updateTag({ name: 'twitter:title', content: this.product.name });
      this.meta.updateTag({ name: 'twitter:description', content: this.product.description });
      this.meta.updateTag({ name: 'twitter:image', content: url + this.product.images[0].medium });     
      this.meta.updateTag({ name: 'og:title', content: this.product.name });
      this.meta.updateTag({ name: 'og:description', content: this.product.description });
      this.meta.updateTag({ name: 'og:image', content: url + this.product.images[0].medium });

    });
  }

  public getRelatedProducts(){
    this.appService.getProducts('related').subscribe(data => {
      this.relatedProducts = data;
    })
  }

  public selectImage(image){
    this.image = image.medium;
    this.zoomImage = image.big;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget; 
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }
}