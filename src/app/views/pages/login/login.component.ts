import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../serivces/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  protected userEmail: string;
  protected userPassword: string;

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  login() {
    this.loginService.login(this.userEmail, this.userPassword).then(response => {
      console.log(response);
      if (response.userRoles.includes('ROLE_ADMIN')) {
        this.router.navigate(['/dashboard']);
      }
    })
      .catch(error => {
        console.log(error);

      })
  }

}
