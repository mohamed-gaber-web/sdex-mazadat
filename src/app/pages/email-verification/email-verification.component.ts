import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent implements OnInit {
  verified$: Observable<boolean>;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.verified$ = this.route.data.pipe(map((res) => res.emailVerified));
  }
}
