import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalComponent } from './content/medical/medical.component';
import { IndexPageComponent } from './content/index-page/index-page.component';
import { ExerciseComponent } from './content/exercise/exercise.component';
import { AssetComponent } from './content/asset/asset.component';
import { AngularComponent } from './content/angular/angular.component';

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'medical-records', component: MedicalComponent },
  { path: 'exercise-note', component: ExerciseComponent },
  { path: 'asset', component: AssetComponent },
  { path: 'angular-note', component: AngularComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
