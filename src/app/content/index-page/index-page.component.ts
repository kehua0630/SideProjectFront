import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  functionList = [
    {
      name: 'Angular筆記',
      imageUrl: './assets/function/angular.png',
      routerPath: 'angular-note'
    },
    {
      name: '運動筆記',
      imageUrl: './assets/function/basketball.png',
      routerPath: 'exercise-note'
    },
    {
      name: '閱讀隨手',
      imageUrl: './assets/function/book.png',
      routerPath: 'reading'
    },
    {
      name: '醫療紀錄',
      imageUrl: './assets/function/medical-report.png',
      routerPath: 'medical-records'
    },
    {
      name: '資產紀錄',
      imageUrl: './assets/function/asset.png',
      routerPath: 'asset'
    },
    {
      name: '帳戶',
      imageUrl: './assets/function/login.png',
      routerPath: 'login'
    },
  ];

  constructor(private router: Router) { }


  ngOnInit(): void {

  }

  onNavigateClick(routerPath: string): void {
    this.router.navigate([routerPath]);
  }
}
