import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DefaultAddressManager } from './default-address-manager';

@Injectable({
  providedIn: 'root',
  useExisting: DefaultAddressManager,
})
export abstract class AddressManager<T = any> {
  abstract getAddress(postalCode: string): Observable<T>;
  abstract validatePostalCode(postalCode: string): boolean;
  abstract normalizePostalCode(postalCode: string): string;
  abstract getRegion(address: T): string;
  abstract getLocality(address: T): string;
  abstract getStreet(address: T): string;
  abstract getExtended(address: T): string;
}
