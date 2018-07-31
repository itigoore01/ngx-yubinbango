import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoAppComponent } from './demo-app/demo-app.component';
import { YubinBangoDemoComponent } from './yubin-bango-demo/yubin-bango-demo.component';

const routes: Routes = [
  {
    path: '', component: DemoAppComponent, children: [
      { path: '', component: YubinBangoDemoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
