import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasicExampleComponent } from './examples/basic-example/basic-example.component';
import { DemoTitleComponent } from './components/demo-title/demo-title.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxYubinbangoModule } from 'ngx-yubinbango';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValuePreviewComponent } from './components/value-preview/value-preview.component';
import { TwoPostalCodeExampleComponent } from './examples/two-postal-code-example/two-postal-code-example.component';
import { OnchangeExampleComponent } from './examples/onchange-example/onchange-example.component';
import { OneCompletionTargetExampleComponent } from './examples/one-completion-target-example/one-completion-target-example.component';
import { ManualExampleComponent } from './examples/manual-example/manual-example.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicExampleComponent,
    DemoTitleComponent,
    InputComponent,
    ValuePreviewComponent,
    TwoPostalCodeExampleComponent,
    OnchangeExampleComponent,
    OneCompletionTargetExampleComponent,
    ManualExampleComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgxYubinbangoModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
