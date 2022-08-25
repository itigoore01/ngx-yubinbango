import {
  HttpEvent,
  HttpRequest,
  JsonpClientBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxYubinbangoModule } from '../ngx-yubinbango.module';
import { YUBINBANGO_DATA_URL } from './constants';

@Injectable()
export class YubinbangoJsonpClientBackend extends JsonpClientBackend {
  private _originalNextCallback = (
    this as unknown as { nextCallback: () => string }
  ).nextCallback;

  override handle(req: HttpRequest<never>): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(YUBINBANGO_DATA_URL)) {
      // yubinbango-dataのJsonpは常に$yubinがcallbackとなっってしまうので
      // 無理やりJsonpClientBackendをオーバーライドしている。
      (this as unknown as { nextCallback: () => string }).nextCallback = () =>
        '$yubin';
    }

    const result = super.handle(req);

    (this as unknown as { nextCallback: () => string }).nextCallback =
      this._originalNextCallback;

    return result;
  }
}
