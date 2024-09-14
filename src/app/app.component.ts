import { Component } from '@angular/core';
import { AdminService } from './shared/service/admin.service';
import { Router } from '@angular/router';
import { ROUTING_PATH } from './shared/const/router.const';
import { COMMON } from './shared/const/common.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'SideProjectFront';

  constructor(
    public adminSvc: AdminService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.adminSvc.setDisplayFunc(sessionStorage.getItem(COMMON.FUNC)?.split(',') || []);
  }

  onlogout() {
    sessionStorage.clear();
    this.router.navigate([ROUTING_PATH.LOGIN]);
    this.adminSvc.setDisplayFunc([]);
  }

  showLogout(): boolean {
    let showLogout = true;
    if (this.router.url.includes('login')) {
      showLogout = false;
    }
    return showLogout;
  }
}
