import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalComponent } from './content/medical/medical.component';
import { IndexPageComponent } from './content/index-page/index-page.component';
import { ExerciseComponent } from './content/exercise/exercise.component';
import { AssetComponent } from './content/asset/asset.component';
import { AngularComponent } from './content/angular/angular.component';
import { ReadingComponent } from './content/reading/reading.component';
import { LoginComponent } from './content/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'index-page', component: IndexPageComponent },
  { path: 'medical-records', component: MedicalComponent, canActivate: [AuthGuard], },
  { path: 'exercise-note', component: ExerciseComponent, canActivate: [AuthGuard], },
  { path: 'asset', component: AssetComponent, canActivate: [AuthGuard], },
  { path: 'angular-note', component: AngularComponent, canActivate: [AuthGuard], },
  { path: 'reading', component: ReadingComponent, canActivate: [AuthGuard], },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
