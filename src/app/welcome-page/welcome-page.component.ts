import { Component, OnInit } from '@angular/core';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * opens the user registration dialog when signup button is clicked
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assign dialog width
      width: '280px',
    });
  }

  /**
   * opens the user login dialog when login button is clicked
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assign dialog width
      width: '280px',
    });
  }
}
