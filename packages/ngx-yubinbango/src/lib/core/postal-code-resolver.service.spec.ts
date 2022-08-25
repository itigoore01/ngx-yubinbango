import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { YubinbangoDataPostalCodeResolver } from '../yubinbango-data/yubinbango-data-postal-code-resolver.service';

import { PostalCodeResolver } from './postal-code-resolver.service';

describe('AddressResolverService', () => {
  let service: PostalCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostalCodeResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('instance of YubinbangoDataAddresssResolver', () => {
    expect(service).toBeInstanceOf(YubinbangoDataPostalCodeResolver);
  });
});
