import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BiddingsService {
  biddingsChanged = new BehaviorSubject<boolean>(null);

  constructor() {}
}
