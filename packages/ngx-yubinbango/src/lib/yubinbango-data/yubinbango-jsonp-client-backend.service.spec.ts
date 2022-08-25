import {
  HttpClientJsonpModule,
  JsonpClientBackend,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgxYubinbangoModule } from '../ngx-yubinbango.module';

import { YubinbangoJsonpClientBackend } from './yubinbango-jsonp-client-backend.service';

describe('YubinbangoJsonpClientBackendService', () => {
  let service: JsonpClientBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientJsonpModule, NgxYubinbangoModule],
    });
    service = TestBed.inject(JsonpClientBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('instance of YubinbangoJsonpClientBackend', () => {
    expect(service).toBeInstanceOf(YubinbangoJsonpClientBackend);
  });
});
