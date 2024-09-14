import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/service/admin.service';

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
    private adminSvc: AdminService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  onLogin() {
    this.commonSvc.validateAllFormFields(this.loginForm);

    if (this.loginForm.valid) {
      const loginInfo = this.loginForm.value;
      this.adminSvc.login(loginInfo).subscribe(res => {
        this.router.navigate(['']);
      });
    }
  }
}
