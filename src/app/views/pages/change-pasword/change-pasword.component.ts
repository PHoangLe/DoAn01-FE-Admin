import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';
import { setTimeout } from 'timers/promises';

@Component({
  selector: 'app-change-pasword',
  templateUrl: './change-pasword.component.html',
  styleUrls: ['./change-pasword.component.scss']
})
export class ChangePaswordComponent {
  protected userName: string;
  protected oldPassword: string;
  protected newPassword: string;
  protected isWrongLogin: boolean = false;
  protected isSubmitted: boolean = false;
  constructor(
    private loginService: LoginService,
    private builder: FormBuilder,
    private messageService: MessageService,
    private router: Router) { }
  ngOnInit(): void {
  }


  login() {
    this.isSubmitted = true;
    if (this.oldPassword !== this.newPassword) {
      this.isWrongLogin = false
      return
    }

    this.loginService.changPassword("admin", this.oldPassword, this.newPassword).then(response => {
      console.log(response)
      this.messageService.add({ key: "toast", severity: "success", detail: "Đổi mật khẩu thành công" })
      window.setInterval(() =>
        this.router.navigate(['/login']), 1000);

    })
      .catch(error => {
        console.log(error);
        this.isWrongLogin = true;
      })
  }

}
