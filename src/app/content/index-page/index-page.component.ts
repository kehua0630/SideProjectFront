import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { COMMON } from 'src/app/shared/const/common.const';
import { ROUTING_PATH } from 'src/app/shared/const/router.const';
import { AdminService } from 'src/app/shared/service/admin.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  displayFunc: {
    name: string,
    imageUrl: string,
    routerPath: string
  }[] = [];

  constructor(private router: Router, public adminSvc: AdminService) { }


  ngOnInit(): void {
  }

  onNavigateClick(routerPath: string): void {
    this.router.navigate([routerPath]);
  }
}
