import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { LoginServiceService } from './service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    pwd: ['', Validators.required]
  });

  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private commonSvc: CommonService,
    private loginSvc: LoginServiceService
  ) { }


  ngOnInit(): void {
    this.onLogin();
  }

  onLogin() {
    this.commonSvc.validateAllFormFields(this.loginForm);

    if (this.loginForm.valid) {
      const loginInfo = this.loginForm.value;
      this.loginSvc.login(loginInfo).subscribe(res => {
        console.log(res)
       });
    }
  }
}
