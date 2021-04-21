import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor as NativeHttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { StorageService } from './shared/services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ROUTER_INITIALIZER, Router } from '@angular/router';
import { UiService } from './shared/services/ui.service';

@Injectable()
export class HttpInterceptor implements NativeHttpInterceptor {
  BASE_URL = environment.api_base_url;

  constructor(
    private spinner: NgxSpinnerService,
    private injector: Injector,
    private uiService: UiService,
    private storageService: StorageService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.spinner.show();

    if (!this.validUrl(request.url)) {
      request = request.clone({
        url: `${this.BASE_URL}/${this.storageService.getLanguage().code}/${
          request.url
        }`,
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.storageService.getAccessToken()}`
        ),
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // if (event instanceof HttpResponse) {
        //   this.spinner.hide();
        // }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.uiService.hideSpinner();
        this.uiService.hideLoadingBar();
        if (error.status === 401) {
          this.storageService.clear();
          this.router.navigate(['/user/sign-in'], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url }
          });
        }
        const started = Date.now();
        const elapsed = Date.now() - started;
        console.log(
          `Request for ${request.urlWithParams} failed after ${elapsed} ms.`
        );
        // debugger;
        // this.spinner.hide();
        return throwError(error);
      })
    );
  }

  /**
   * Check if the url is valid and has http or https.
   */
  validUrl(url) {
    return url.includes('http://') || url.includes('https://');
  }

  /**
   * Handle http errors.
   */
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = error.error.message;
    } else {
      // server-side error
      errorMessage = `${error.status} : ${error.statusText}`;
    }

    return throwError({
      code: error.status,
      message: error.statusText,
      error: error.error,
    });
  }
}
