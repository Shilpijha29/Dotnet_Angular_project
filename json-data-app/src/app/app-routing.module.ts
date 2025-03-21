import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './components/summary/summary.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  { path: 'summary', component: SummaryComponent },
  { path: 'detail/:samplingTime', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
