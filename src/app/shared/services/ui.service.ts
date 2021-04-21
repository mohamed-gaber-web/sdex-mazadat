import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class UiService {
  constructor(
    private loader: LoadingBarService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  showLoadingBar() {
    const loader = this.loader.useRef('router');
    loader.start();
  }

  hideLoadingBar() {
    const loader = this.loader.useRef('router');
    loader.complete();
  }

  showSpinner() {
    const loader = this.loader.useRef('spinner');
    loader.start();
  }

  hideSpinner() {
    const loader = this.loader.useRef('spinner');
    loader.complete();
  }

  showMessage(
    message: string,
    type: string,
    action?: string,
    duration?: string,
    translation?: boolean,
    position?: MatSnackBarVerticalPosition
  ) {
    if (translation) {
      let snackbar: any;
      this.translate
        .get([message, action])
        .pipe(
          take(1),
          tap((res) => {
            const values: any[] = Object.values(res);
            snackbar = this.snackBar.open(values[0], values[1], {
              duration: duration === 'infinite' ? undefined : 5000,
              panelClass: type,
              verticalPosition: position,
            });
          })
        )
        .subscribe();
      return snackbar;
    } else {
      return this.snackBar.open(message, action, {
        duration: duration === 'infinite' ? undefined : 5000,
        panelClass: type,
        verticalPosition: position,
      });
    }
  }
}
