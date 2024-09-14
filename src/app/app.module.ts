import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_TW } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AntDesingModule } from './shared/module/ant-design.module';
import { IndexPageComponent } from './content/index-page/index-page.component';
import { LoginComponent } from './content/login/login.component';
import { UploadPdfComponent } from './content/upload-pdf/upload-pdf.component';
import { MarqueeComponent } from './content/marquee/marquee.component';
import { AccountComponent } from './content/account/account.component';
import { FunctionPipe } from './shared/pipe/function.pipe';
import { EditModalComponent } from './content/account/edit-modal/edit-modal.component';
import { BaseModalComponent } from './shared/component/base-modal/base-modal.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    LoginComponent,
    UploadPdfComponent,
    MarqueeComponent,
    AccountComponent,
    FunctionPipe,
    EditModalComponent,
    BaseModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntDesingModule,
    CKEditorModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_TW }
  ],
  exports: [
    FunctionPipe,
    BaseModalComponent,
    CKEditorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
