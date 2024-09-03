import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalComponent } from './content/medical/medical.component';
import { IndexPageComponent } from './content/index-page/index-page.component';
import { ExerciseComponent } from './content/exercise/exercise.component';
import { AssetComponent } from './content/asset/asset.component';
import { AngularComponent } from './content/angular/angular.component';
import { ReadingComponent } from './content/reading/reading.component';
import { LoginComponent } from './content/login/login.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'index-page', component: IndexPageComponent },
  { path: 'medical-records', component: MedicalComponent },
  { path: 'exercise-note', component: ExerciseComponent },
  { path: 'asset', component: AssetComponent },
  { path: 'angular-note', component: AngularComponent },
  { path: 'reading', component: ReadingComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
