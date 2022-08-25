import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { Address } from '../core/address';
import { PostalCodeResolver } from '../core/postal-code-resolver.service';
import { normalizePostalCode } from '../utils/normalize-postal-code';
import { YubinbangoData, YubinbangoDataResponse } from './yubinbango-data';
import { REGION, YUBINBANGO_DATA_URL } from './constants';
import { validatePostalCode } from '../utils/validate-postal-code';

let nextRequestId = 0;
const currentRequestId = new BehaviorSubject(nextRequestId);

@Injectable({
  providedIn: 'root',
})
export class YubinbangoDataPostalCodeResolver implements PostalCodeResolver {
  /**
   * 郵便番号の上3桁がキー、YubinbangoDataのレスポンスが値
   */
  private readonly cache = new Map<
    string,
    Observable<YubinbangoDataResponse>
  >();

  constructor(private readonly http: HttpClient) {}

  resolve(postalCode: string): Observable<Address | null> {
    postalCode = normalizePostalCode(postalCode);

    if (!validatePostalCode(postalCode)) {
      return of(null);
    }

    // 上3桁で検索を行う
    const topPostalCode = postalCode.substring(0, 3);

    // キャッシュがあれば利用
    let addressResponseObservable = this.cache.get(topPostalCode);

    if (!addressResponseObservable) {
      const requestId = nextRequestId++;

      addressResponseObservable = currentRequestId.pipe(
        filter((id) => id === requestId),
        switchMap(() =>
          this.http
            .jsonp<YubinbangoDataResponse>(
              `${YUBINBANGO_DATA_URL}/${topPostalCode}.js`,
              'c'
            )
            .pipe(
              // エラーになった場合は null としてキャッシュする
              catchError(() => of({})),
              finalize(() => {
                currentRequestId.next(requestId + 1);
              })
            )
        ),
        shareReplay(1)
      );

      this.cache.set(topPostalCode, addressResponseObservable);
    }

    return addressResponseObservable.pipe(
      map((response) =>
        response[postalCode] ? this.mapAddress(response[postalCode]) : null
      ),
      take(1)
    );
  }

  private mapAddress([
    regionId,
    locality,
    street,
    extended = '',
  ]: YubinbangoData): Address {
    return {
      regionId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      region: REGION[regionId]!,
      locality,
      street,
      extended,
    };
  }
}
