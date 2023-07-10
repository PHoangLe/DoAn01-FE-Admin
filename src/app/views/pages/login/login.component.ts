import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  protected userEmail: string;
  protected userPassword: string;
  protected isWrongLogin: boolean = false;
  protected isSubmitted: boolean = false;
  constructor(
    private loginService: LoginService,
    private builder: FormBuilder,
    private router: Router) { }
  ngOnInit(): void {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    userEmail: this.builder.control('', [Validators.required]),
    userPassword: this.builder.control('', [Validators.required])
  })



  login() {
    this.isSubmitted = true;
    this.isWrongLogin = false
    this.loginService.login(this.userEmail, this.userPassword).then(response => {
      if (response.userRoles.includes('ROLE_ADMIN')) {
        sessionStorage.setItem("userRoles", 'ROLE_ADMIN');
        sessionStorage.setItem("jwtToken", JSON.stringify(response.jwtToken));
        sessionStorage.setItem("userID", response.userID.replace('"', ''));
        this.router.navigate(['/dashboard']);
      }
    })
      .catch(error => {
        console.log(error);
        this.isWrongLogin = true;
      })
  }

}
