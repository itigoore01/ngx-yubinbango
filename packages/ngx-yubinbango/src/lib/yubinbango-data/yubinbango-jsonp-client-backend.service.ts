import {
  HttpEvent,
  HttpRequest,
  JsonpClientBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YUBINBANGO_DATA_URL } from './constants';

@Injectable()
export class YubinbangoJsonpClientBackend extends JsonpClientBackend {
  private url?: string;

  override handle(req: HttpRequest<never>): Observable<HttpEvent<unknown>> {
    this.url = req.url;

    const result = super.handle(req);

    return result;
  }
}

// 無理やりプライベートメソッドをオーバーライドする
const originalNextCallback = (
  YubinbangoJsonpClientBackend.prototype as unknown as {
    nextCallback(): string;
  }
).nextCallback;

(
  YubinbangoJsonpClientBackend.prototype as unknown as {
    url?: string;
    nextCallback(): string;
  }
).nextCallback = function () {
  return (this.url ?? '').startsWith(YUBINBANGO_DATA_URL)
    ? '$yubin'
    : originalNextCallback.call(this);
};
