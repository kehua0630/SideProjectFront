import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './content/index-page/index-page.component';
import { LoginComponent } from './content/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { MarqueeComponent } from './content/marquee/marquee.component';
import { UploadPdfComponent } from './content/upload-pdf/upload-pdf.component';
import { ROUTING_PATH } from './shared/const/router.const';
import { AccountComponent } from './content/account/account.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: ROUTING_PATH.INDEX, component: IndexPageComponent },
  { path: ROUTING_PATH.LOGIN, component: LoginComponent },
  { path: ROUTING_PATH.ACCOUNT, component: AccountComponent, canActivate: [AuthGuard] },
  { path: ROUTING_PATH.MARQUEE, component: MarqueeComponent, canActivate: [AuthGuard] },
  { path: ROUTING_PATH.UPLOAD_PDF, component: UploadPdfComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
