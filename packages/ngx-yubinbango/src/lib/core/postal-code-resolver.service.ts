import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YubinbangoDataPostalCodeResolver } from '../yubinbango-data/yubinbango-data-postal-code-resolver.service';
import { Address } from './address';

@Injectable({
  providedIn: 'root',
  useExisting: YubinbangoDataPostalCodeResolver,
})
export abstract class PostalCodeResolver {
  abstract resolve(postalCode: string): Observable<Address | null>;
}
