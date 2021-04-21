import { Component } from "@angular/core";

@Component({
    selector: 'app-section-products',
    templateUrl: './section-products.component.html',
    styleUrls: ['./section-products.component.scss']
})

export class SectionProductsComponent {
    startDate = new Date().toLocaleString();

    // Pagination
    p: number = 1;
    collection: any[] = [
        {
            category: "عقارات",
            imgPath: '/assets/images/home-products/img-color.png',
            name: 'اسم المزاد',
            priceStart: 300,
            priceEnd: 500,
            persons: 10
        },
        {
            category: "عقارات",
            imgPath: '/assets/images/home-products/img-color.png',
            name: 'اسم المزاد',
            priceStart: 300,
            priceEnd: 500,
            persons: 10
        },
        {
            category: "عقارات",
            imgPath: '/assets/images/home-products/img-color.png',
            name: 'اسم المزاد',
            priceStart: 300,
            priceEnd: 500,
            persons: 10
        },
        {
            category: "عقارات",
            imgPath: '/assets/images/home-products/img-color.png',
            name: 'اسم المزاد',
            priceStart: 300,
            priceEnd: 500,
            persons: 10
        },
        {
            category: "عقارات",
            imgPath: '/assets/images/home-products/img-color.png',
            name: 'اسم المزاد',
            priceStart: 300,
            priceEnd: 500,
            persons: 10
        },
        {
            category: "عقارات",
            imgPath: '/assets/images/home-products/img-color.png',
            name: 'اسم المزاد',
            priceStart: 300,
            priceEnd: 500,
            persons: 10
        },
        {
            category: "عقارات",
            imgPath: '/assets/images/home-products/img-color.png',
            name: 'اسم المزاد',
            priceStart: 300,
            priceEnd: 500,
            persons: 10
        },
        {
            category: "عقارات",
            imgPath: '/assets/images/home-products/img-color.png',
            name: 'اسم المزاد',
            priceStart: 300,
            priceEnd: 500,
            persons: 10
        },

    ];  
}