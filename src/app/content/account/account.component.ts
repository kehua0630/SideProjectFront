import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    userName: ['test1', Validators.required]
  });;

  constructor(
    private fb: FormBuilder,
    private commonSvc: CommonService,
    private accountSvc: AccountService) { }


  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit() {
    this.commonSvc.validateAllFormFields(this.searchForm);

    if (this.searchForm.valid) {
      this.accountSvc.getAccountList().subscribe(res => {
        console.log(res);
      });
    }
  }


  onClear() {
    this.searchForm.patchValue({
      userName: ''
    });
  }
}
