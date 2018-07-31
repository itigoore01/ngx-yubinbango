import { TestBed, inject, async } from '@angular/core/testing';

import { DefaultAddressManager } from './default-address-manager';
import { NgxYubinBangoModule } from '../ngx-yubin-bango.module';
import { AddressManager } from './address-manager';

describe('DefaultAddressManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxYubinBangoModule]
    });
  });

  it('should be created', inject([AddressManager], (service: DefaultAddressManager) => {
    expect(service).toBeTruthy();
  }));

  it('住所を取得できるべき', async(inject([AddressManager], (service: DefaultAddressManager) => {
    // service.getAddress('6110021').subscribe((data) => {
    //   console.log(data);
    //   expect(data).toBeTruthy();
    //   expect(data.region).toBe('京都府');
    //   expect(data.locality).toBe('宇治市');
    //   expect(data.street).toBe('宇治');
    //   expect(data.extended).toBe('');
    // });
  })));
});
