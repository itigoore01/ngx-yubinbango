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
import { YubinBangoSeparatedPostalCodeExampleComponent } from './examples/yubin-bango-separated-postal-code-example/yubin-bango-separated-postal-code-example.component';
import { YubinBangoOneTargetExampleComponent } from './examples/yubin-bango-one-target-example/yubin-bango-one-target-example.component';
import { YubinBangoManualCompleteExampleComponent } from './examples/yubin-bango-manual-complete-example/yubin-bango-manual-complete-example.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoAppComponent,
    YubinBangoDemoComponent,
    YubinBangoBasicExampleComponent,
    YubinBangoOnchangeExampleComponent,
    YubinBangoManualCompleteExampleComponent,
    YubinBangoSeparatedPostalCodeExampleComponent,
    YubinBangoOneTargetExampleComponent
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
