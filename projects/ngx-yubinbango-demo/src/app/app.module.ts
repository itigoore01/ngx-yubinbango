import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxYubinBangoModule } from 'ngx-yubinbango';
import { DemoAppComponent } from './demo-app/demo-app.component';
import { YubinBangoDemoComponent } from './yubin-bango-demo/yubin-bango-demo.component';
import { YubinBangoBasicExampleComponent } from './examples/yubin-bango-basic-example/yubin-bango-basic-example.component';
import { YubinBangoOnchangeExampleComponent } from './examples/yubin-bango-onchange-example/yubin-bango-onchange-example.component';
import { YubinBangoManualCompleteComponent } from './examples/yubin-bango-manual-complete/yubin-bango-manual-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoAppComponent,
    YubinBangoDemoComponent,
    YubinBangoBasicExampleComponent,
    YubinBangoOnchangeExampleComponent,
    YubinBangoManualCompleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxYubinBangoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
