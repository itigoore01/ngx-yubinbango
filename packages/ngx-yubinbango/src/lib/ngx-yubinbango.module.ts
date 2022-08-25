import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonpClientBackend } from '@angular/common/http';
import { YubinbangoJsonpClientBackend } from './yubinbango-data/yubinbango-jsonp-client-backend.service';
import { ProviderDirective } from './directives/provider.directive';
import { PostalCodeDirective } from './directives/postal-code.directive';
import { CompletionDirective } from './directives/completion.directive';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: JsonpClientBackend, useClass: YubinbangoJsonpClientBackend },
  ],
  declarations: [ProviderDirective, PostalCodeDirective, CompletionDirective],
  exports: [ProviderDirective, PostalCodeDirective, CompletionDirective],
})
export class NgxYubinbangoModule {}
