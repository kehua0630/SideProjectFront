import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';

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
  ) { }


  ngOnInit(): void {
    this.onLogin();
  }

  onLogin() {
    this.commonSvc.validateAllFormFields(this.loginForm);

    if(this.loginForm.valid){
      
    }
   }
}
