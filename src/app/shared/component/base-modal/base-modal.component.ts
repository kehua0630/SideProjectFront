import { Component, Input, OnInit, Optional } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CRUD, MODAL_BUTTON_ACTION } from 'src/app/shared/const/common.const';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss']
})
export class BaseModalComponent implements OnInit {
  readonly BASE_MODAL_ACTION_CONFIRM = MODAL_BUTTON_ACTION.CONFIRM;
  readonly BASE_MODAL_ACTION_SAVE = MODAL_BUTTON_ACTION.SAVE;
  readonly BASE_MODAL_ACTION_CLEAR = MODAL_BUTTON_ACTION.CLEAR;
  readonly BASE_MODAL_ACTION_CLOSE = MODAL_BUTTON_ACTION.CLOSE;

  @Input() type: string = '';
  isReadOnly = false;
  isLoading = false;

  constructor(@Optional() public modal?: NzModalRef) { }

  ngOnInit(): void {
    this.isReadOnly = this.type === CRUD.READ;
  }
}
