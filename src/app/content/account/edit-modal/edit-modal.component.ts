import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../service/account.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() type: string = '';
  @Input() account?: Account;

  constructor(
  ) {  }

  ngOnInit(): void {
   
  }



}
