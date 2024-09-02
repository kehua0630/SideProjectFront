import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_TW } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AntDesingModule } from './shared/ant-design.module';
import { IndexPageComponent } from './content/index-page/index-page.component';
import { MedicalComponent } from './content/medical/medical.component';
import { ReadingComponent } from './content/reading/reading.component';
import { ExerciseComponent } from './content/exercise/exercise.component';
import { LoginComponent } from './content/login/login.component';
import { AngularComponent } from './content/angular/angular.component';
import { AssetComponent } from './content/asset/asset.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    MedicalComponent,
    ReadingComponent,
    ExerciseComponent,
    LoginComponent,
    AngularComponent,
    AssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntDesingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_TW }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
