import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/service/common.service';
import { Account, AccountService } from './service/account.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    userName: ['']
  });

  listOfData: Account[] = [];

  constructor(
    private fb: FormBuilder,
    private commonSvc: CommonService,
    private accountSvc: AccountService,
    private modalSvc: NzModalService) { }


  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit() {
    this.commonSvc.validateAllFormFields(this.searchForm);

    if (this.searchForm.valid) {
      this.accountSvc.getAccountList().subscribe(res => {
        this.listOfData = res;
      });
    }
  }

  onClear() {
    this.searchForm.patchValue({
      userName: ''
    });
  }

  onEdit(type: string, account?: Account) {
    this.modalSvc.create({
      nzTitle: '',
      nzContent: EditModalComponent,
      nzWidth: '60%',
      nzMaskClosable: true,
      nzClosable: false,
      nzData: {
        type,
        account
      },
      // nzComponentParams: {
      //   type,
      //   account
      // },
      nzOnOk: () => {

      }
    });
  }
  onDelete(data: Account) { }
}
