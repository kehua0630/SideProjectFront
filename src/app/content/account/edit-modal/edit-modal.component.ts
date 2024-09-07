import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Account, AccountService } from '../service/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROUTING_PATH } from 'src/app/shared/const/router.const';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from 'src/app/shared/service/common.service';
import * as moment from 'moment';
import { RETCODE } from 'src/app/shared/const/common.const';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() type: string = '';
  @Input() account?: Account;

  accountForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    pwd: ['', Validators.required],
    inUse: [false],
    func: [[], Validators.required],
    createTime: ['', Validators.required]
  });

  passwordVisible = false;

  funcOptions = [
    { label: '跑馬燈', value: ROUTING_PATH.MARQUEE, checked: false },
    { label: '上傳PDF', value: ROUTING_PATH.UPLOAD_PDF, checked: false },
    { label: '帳號', value: ROUTING_PATH.ACCOUNT, checked: false },
  ];

  constructor(
    private fb: FormBuilder,
    public modal: NzModalRef,
    private commonSvc: CommonService,
    private accountSvc: AccountService,
    private modalSvc: NzModalService
  ) { }

  ngOnInit(): void {
    this.accountForm.get('func')?.patchValue(this.funcOptions);
  }

  ngOnChanges(): void {
    if (this.account) {
      this.accountForm?.patchValue(this.account);
      this.account.func.forEach(funcValue => {
        const func = this.funcOptions.find(func => func.value === funcValue);
        if (func) {
          func.checked = true;
        }
      });
    }
  }

  onFuncChange(func: { label: string, value: string, checked?: boolean }[]) {

  }

  onConfirm() {
    console.log(this.accountForm);
    this.accountForm.patchValue({
      createTime: moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
    });
    this.commonSvc.validateAllFormFields(this.accountForm);

    if (this.accountForm.valid) {
      this.accountSvc.addAccount(this.accountForm.value).subscribe((res: any) => {
        console.log(res)
        if (res.RetCode === RETCODE.SUCCESS) {
          const modal = this.modalSvc.success({
            nzTitle: res.RetMsg,
          });

          this.modal.triggerOk();
         }
      });
    }
  }

}
