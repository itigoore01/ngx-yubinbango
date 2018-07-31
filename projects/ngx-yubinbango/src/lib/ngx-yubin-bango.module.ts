import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule, JsonpClientBackend } from '@angular/common/http';
import { YubinJsonpClientBackend } from './core/yubin-jsonp-client-backend';
import { YbAddress } from './address/yb-address';
import { YbPostalCode } from './address/yb-postal-code';
import { YbRegion } from './address/yb-region';
import { YbLocality } from './address/yb-locality';
import { YbStreet } from './address/yb-street';
import { YbExtended } from './address/yb-extended';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  declarations: [
    YbAddress,
    YbPostalCode,
    YbRegion,
    YbLocality,
    YbStreet,
    YbExtended,
  ],
  providers: [
    { provide: JsonpClientBackend, useClass: YubinJsonpClientBackend }
  ],
  exports: [
    YbAddress,
    YbPostalCode,
    YbRegion,
    YbLocality,
    YbStreet,
    YbExtended,
  ]
})
export class NgxYubinBangoModule { }
