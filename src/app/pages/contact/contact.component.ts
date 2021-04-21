import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { emailValidator } from '../../theme/utils/app-validators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  contactInfo$: Observable<any>;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.contactInfo$ = this.route.data.pipe(map((res) => res.contactInfo));
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  public onContactFormSubmit(values): void {
    if (this.contactForm.valid) {
      console.log(values);
    }
  }
}
