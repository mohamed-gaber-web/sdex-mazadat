import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getList(route: string, options?): Observable<any> {
    return this.http.get(route, options);
  }

  post(route: string, body, options?) {
    return this.http.post(route, body, options);
  }

  get(route: string, options?) {
    return this.http.get(route, options);
  }

  getItemById(route: string, id: number, options?): Observable<any> {
    return this.http.get(`${route}/${id}`, options);
  }

  biddingSubscribeById(route: string, id: number) {
    return this.http.post(route, {biddingId: id});
  }
}
