import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YUBINBANGO_DATA_URL, REGION } from './constant';
import { Address } from '../models/address';
import { AddressManager } from './address-manager';
import { Injectable } from '@angular/core';

/**
 * デフォルトの住所取得サービス
 */
@Injectable({
  providedIn: 'root',
})
export class DefaultAddressManager implements AddressManager<Address> {

  constructor(
    private http: HttpClient
  ) { }

  getAddress(postalCode: string): Observable<Address> {
    // 上3桁で検索を行う
    const topPostalCode = postalCode.substr(0, 3);

    return this.http.jsonp(`${YUBINBANGO_DATA_URL}/${topPostalCode}.js`, 'callback')
      .pipe(
        map(data => {
          const addr = data[postalCode];

          if (!addr) {
            return null;
          }

          return {
            regionId: addr[0] || '',
            region: REGION[addr[0]] || '',
            locality: addr[1] || '',
            street: addr[2] || '',
            extended: addr[3] || '',
          } as Address;
        })
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
}
