import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ConnectableObservable } from 'rxjs';
import { map, filter, concatMap, publishLast, take, tap } from 'rxjs/operators';
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
  readonly addressCache: Record<string, ConnectableObservable<Record<string, Address>>> = {};

  /**
   * リクエストの整理番号。
   * 多重でリクエストを投げると、callbackがわけわからんことになるので対策。
   */
  readonly referenceId = new BehaviorSubject(0);

  constructor(
    private http: HttpClient
  ) { }

  getAddress(postalCode: string): Observable<Address | null> {
    // 上3桁で検索を行う
    const topPostalCode = postalCode.substr(0, 3);

    // キャッシュになければObservable生成
    // リクエスト中の場合はリクエストを投げない
    if (!this.addressCache[topPostalCode]) {
      const requestId = nextRequestId++;
      const observable = this.referenceId
        .pipe(
          filter(id => id === requestId),
          concatMap(() => this.http.jsonp(`${YUBINBANGO_DATA_URL}/${topPostalCode}.js`, 'callback')),
          // リクエストが終了したので、次の番号に進める
          tap(() => this.referenceId.next(requestId + 1)),
          map((data: Record<string, YubinbangoData>) => {
            const addresses: Record<string, Address> = {};

            Object.keys(data).forEach(key => {
              addresses[key] = this.mapAddress(data[key]);
            });

            return addresses;
          }),
          take(1),
          publishLast()
        ) as ConnectableObservable<Record<string, Address>>;

      observable.connect();

      this.addressCache[topPostalCode] = observable;
    }

    return this.addressCache[topPostalCode]
      .pipe(
        map(addresses => addresses[postalCode]),
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
