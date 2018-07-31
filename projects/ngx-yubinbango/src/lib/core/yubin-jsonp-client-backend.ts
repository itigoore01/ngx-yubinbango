import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * yubinbango-dataのJsonpは常に$yubinがcallbackとなっってしまうので
 * 無理やりJsonpClientBackendをオーバーライドしている。
 *
 * TODO: 無理やりオーバーライドせずに実装する
 */
@Injectable({
  providedIn: 'root',
})
export class YubinJsonpClientBackend extends JsonpClientBackend {
}

(YubinJsonpClientBackend.prototype as any).nextCallback = () => '$yubin';
