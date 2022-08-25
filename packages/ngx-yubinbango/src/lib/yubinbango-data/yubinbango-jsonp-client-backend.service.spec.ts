import {
  HttpClientJsonpModule,
  HttpRequest,
  JsonpClientBackend,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxYubinbangoModule } from '../ngx-yubinbango.module';
import { YUBINBANGO_DATA_URL } from './constants';

import { YubinbangoJsonpClientBackend } from './yubinbango-jsonp-client-backend.service';

describe('YubinbangoJsonpClientBackendService', () => {
  let service: JsonpClientBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientJsonpModule,
        NgxYubinbangoModule,
      ],
    });
    service = TestBed.inject(JsonpClientBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('instance of YubinbangoJsonpClientBackend', () => {
    expect(service).toBeInstanceOf(YubinbangoJsonpClientBackend);
  });

  it('$yubin callback', () => {
    expect(window).not.toHaveProperty('$yubin');

    service
      .handle(new HttpRequest('JSONP', `${YUBINBANGO_DATA_URL}/100.js`))
      .subscribe();

    expect(window).toHaveProperty('$yubin');

    delete (window as unknown as Record<string, unknown>)['$yubin'];
  });

  it('ng_callback', () => {
    expect(window).not.toHaveProperty('$yubin');

    service
      .handle(new HttpRequest('JSONP', `https://test.com/100.js`))
      .subscribe();

    expect(Object.keys(window).some((k) => /^ng_jsonp_callback_/.test(k))).toBe(
      true
    );
    expect(window).not.toHaveProperty('$yubin');
  });
});
