import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/about-us/about.module').then((m) => m.AboutModule),
        data: { breadcrumb: 'About Us' },
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/bidding-details/details.module').then(
            (m) => m.DetailsModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/section-products/section-products.module').then(
            (m) => m.SectionProducts
          ),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
        data: { breadcrumb: 'Categories' },
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category-details/category-details.module').then(
            (m) => m.CategoryDetailsModule
          ),
        data: { breadcrumb: 'Category' },
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/account/account.module').then((m) => m.AccountModule),
        data: { breadcrumb: 'Account Settings' },
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
        data: { breadcrumb: '' },
      },
      {
        path: 'compare',
        loadChildren: () =>
          import('./pages/compare/compare.module').then((m) => m.CompareModule),
        data: { breadcrumb: 'Compare' },
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('./pages/wishlist/wishlist.module').then(
            (m) => m.WishlistModule
          ),
        data: { breadcrumb: 'Wishlist' },
      },
      {
        path: 'search-results',
        loadChildren: () =>
          import('./pages/search-results/search-results.module').then(
            (m) => m.SearchResultsModule
          ),
        data: { breadcrumb: 'Search Results' },
      },
      {
        path: 'terms',
        loadChildren: () =>
          import('./pages/terms-conditions/terms-conditions.module').then(
            (m) => m.TermsConditionsModule
          ),
        data: { breadcrumb: 'Terms & Conditions' },
      },
      {
        path: 'account/email-confirmation',
        loadChildren: () =>
          import('./pages/email-verification/email-verification.module').then(
            (m) => m.EmailVerificationModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/cart/cart.module').then((m) => m.CartModule),
        data: { breadcrumb: 'Cart' },
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./pages/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
        data: { breadcrumb: 'Checkout' },
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact/contact.module').then((m) => m.ContactModule),
        data: { breadcrumb: 'Contact' },
      },
      {
        path: 'faq',
        loadChildren: () =>
          import('./pages/faq/faq.module').then((m) => m.FaqModule),
        data: { breadcrumb: 'faq' },
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./pages/brands/brands.module').then((m) => m.BrandsModule),
        data: { breadcrumb: 'Brands' },
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
        data: { breadcrumb: 'All Products' },
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  //   preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
  initialNavigation: 'enabled', // for one load page, without reload
  // useHash: true
});
