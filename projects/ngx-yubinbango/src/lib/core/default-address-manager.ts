import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, filter, concatMap, take, shareReplay, catchError, finalize } from 'rxjs/operators';
import { YUBINBANGO_DATA_URL, REGION } from './constant';
import { Address } from '../models/address';
import { AddressManager } from './address-manager';
import { Injectable } from '@angular/core';

let nextRequestId = 0;

type YubinbangoData = [number, string, string, string | undefined];

/**
 * デフォルトの住所取得サービス
 */
@Injectable({
  providedIn: 'root',
})
export class DefaultAddressManager implements AddressManager<Address> {

  /**
   * 第一キー: 郵便番号上位3桁
   * 第二キー: 郵便番号7桁
   */
  private readonly addressCache = new Map<string, Observable<Map<string, Address> | null>>();

  /**
   * リクエストの整理番号。
   * 多重でリクエストを投げると、callbackがわけわからんことになるので対策。
   */
  private readonly referenceId = new BehaviorSubject(0);

  constructor(
    private http: HttpClient
  ) { }

  getAddress(postalCode: string): Observable<Address | null> {
    // 上3桁で検索を行う
    const topPostalCode = postalCode.substr(0, 3);

    // キャッシュを確認
    let addressObservable = this.addressCache.get(topPostalCode);

    if (!addressObservable) {
      // キャッシュになければObservable生成
      // リクエスト中の場合はリクエストを投げない
      const requestId = nextRequestId++;
      addressObservable = this.referenceId
        .pipe(
          filter(id => id === requestId),
          take(1),
          concatMap(() =>
            this.http.jsonp<Record<string, YubinbangoData>>(`${YUBINBANGO_DATA_URL}/${topPostalCode}.js`, 'callback')
              .pipe(
                // 404などでエラーとなった場合はnullとしてキャッシュする
                catchError(() => of<Record<string, YubinbangoData>>({})),
                // リクエストが終了したので、次の番号に進める
                finalize(() => this.referenceId.next(requestId + 1)),
              )
          ),
          map(data => {
            const addresses = new Map<string, Address>();

            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                addresses.set(key, this.mapAddress(data[key]));
              }
            }

            return addresses;
          }),
          shareReplay(1),
        );

        this.addressCache.set(topPostalCode, addressObservable);
    }

    return addressObservable
      .pipe(
        map(addresses => addresses ? addresses.get(postalCode) || null : null),
        take(1)
      );
  }

  validatePostalCode(postalCode: string): boolean {
    return /^\d{7}$/.test(postalCode);
  }

  normalizePostalCode(postalCode: string): string {
    // 全角→半角、ハイフン除去、全角（マイナス、長音）除去
    return postalCode
      .replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 65248))
      .replace(/[-ー－]/g, '');
  }

  getRegion(address: Address) {
    return address.region;
  }

  getLocality(address: Address) {
    return address.locality;
  }

  getStreet(address: Address) {
    return address.street;
  }

  getExtended(address: Address) {
    return address.extended;
  }

  private mapAddress([regionId, locality, street, extended]: YubinbangoData): Address {
    return {
      regionId,
      region: REGION[regionId] || '',
      locality,
      street,
      extended: extended || '',
    };
  }
}
