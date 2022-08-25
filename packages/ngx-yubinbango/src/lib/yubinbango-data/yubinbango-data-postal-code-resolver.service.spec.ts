import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { YubinbangoDataPostalCodeResolver } from './yubinbango-data-postal-code-resolver.service';
import { YUBINBANGO_DATA_URL } from './constants';
import { Address } from '../core/address';

describe('YubinbangoDataPostalCodeResolver', () => {
  let service: YubinbangoDataPostalCodeResolver;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(YubinbangoDataPostalCodeResolver);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns address', () => {
    const nextFn = jest.fn();
    const completeFn = jest.fn();

    service.resolve('6110021').subscribe({
      next: nextFn,
      complete: completeFn,
    });

    const req = controller.expectOne(
      `${YUBINBANGO_DATA_URL}/611.js?c=JSONP_CALLBACK`
    );
    expect(req.request.method).toBe('JSONP');
    req.flush({
      6110021: [26, '宇治市', '宇治'],
    });

    expect(nextFn).toBeCalledTimes(1);
    expect(nextFn.mock.calls[0][0]).toEqual<Address>({
      regionId: 26,
      region: '京都府',
      locality: '宇治市',
      street: '宇治',
      extended: '',
    });
    expect(completeFn).toBeCalledTimes(1);
  });

  it('use cache', () => {
    const nextFn1 = jest.fn();
    const nextFn2 = jest.fn();
    const completeFn1 = jest.fn();
    const completeFn2 = jest.fn();

    service.resolve('100-0001').subscribe({
      next: nextFn1,
      complete: completeFn1,
    });
    service.resolve('100-0001').subscribe({
      next: nextFn2,
      complete: completeFn2,
    });

    // 一度だけリクエストがあるはず
    const req = controller.expectOne(
      `${YUBINBANGO_DATA_URL}/100.js?c=JSONP_CALLBACK`
    );
    expect(req.request.method).toBe('JSONP');
    req.flush({
      1000001: [13, '千代田区', '千代田'],
    });

    expect(nextFn1).toBeCalledTimes(1);
    expect(nextFn1.mock.calls[0][0]).toEqual<Address>({
      regionId: 13,
      region: '東京都',
      locality: '千代田区',
      street: '千代田',
      extended: '',
    });
    expect(completeFn1).toBeCalledTimes(1);

    expect(nextFn2).toBeCalledTimes(1);
    expect(nextFn2.mock.calls[0][0]).toEqual<Address>({
      regionId: 13,
      region: '東京都',
      locality: '千代田区',
      street: '千代田',
      extended: '',
    });
    expect(completeFn2).toBeCalledTimes(1);
  });
});
