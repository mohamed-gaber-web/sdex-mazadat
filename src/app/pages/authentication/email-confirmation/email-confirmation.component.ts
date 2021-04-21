import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import EmailConfirmation from 'src/app/shared/models/EmailConfirmation';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute,private authenticationService:AuthenticationService,private snackBar:MatSnackBar,private router:Router) { }
  visiable:boolean = false;
  emailConfirmation:EmailConfirmation;
  ngOnInit(): void {
    this.emailConfirmation = new EmailConfirmation();
    this.emailConfirmation.id = Number.parseInt(this.route.snapshot.queryParamMap.get('userId'));
    this.emailConfirmation.token = this.route.snapshot.queryParamMap.get('confirmationtoken');
    this.authenticationService.confirmEmail(this.emailConfirmation).subscribe(
      response => {
        this.visiable = true;
        this.router.navigate(['/']);
      },
      error => {
        Object.keys(error).forEach(key => {
          this.snackBar.open(error[key][0], '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
      },
    )
  }
  }


