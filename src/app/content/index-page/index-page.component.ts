import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTING_PATH } from 'src/app/shared/const/router.const';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  functionList = [
    {
      name: '跑馬燈',
      imageUrl: './assets/function/board.png',
      routerPath: ROUTING_PATH.MARQUEE
    },
    {
      name: '上傳PDF',
      imageUrl: './assets/function/pdf.png',
      routerPath: ROUTING_PATH.UPLOAD_PDF
    },
    {
      name: '帳戶',
      imageUrl: './assets/function/account.png',
      routerPath: ROUTING_PATH.ACCOUNT
    },
  ];

  constructor(private router: Router) { }


  ngOnInit(): void {

  }

  onNavigateClick(routerPath: string): void {
    this.router.navigate([routerPath]);
  }
}
