import { TestBed } from '@angular/core/testing';
import { NgxYubinBangoModule } from '../ngx-yubin-bango.module';
import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import { YbAddress } from './yb-address';
import { AddressManager } from '../core/address-manager';
import { YbRegion } from './yb-region';
import { Address } from '../models/address';
import { Observable, of } from 'rxjs';
import { DefaultAddressManager } from '../core/default-address-manager';
import { YbLocality } from './yb-locality';
import { YbExtended } from './yb-extended';
import { YbStreet } from './yb-street';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'yb-test-app',
  template: `
    <form ybAddress>
      <input value="000" ybPostalCode><input value="0000" ybPostalCode>
      <input ybRegion>
      <input ybLocality>
      <input ybStreet>
      <input ybExtended>
    </form>
  `
})
class TestApp {
  @ViewChild(YbAddress) address!: YbAddress;
  @ViewChild(YbRegion, { read: ElementRef }) region!: ElementRef;
  @ViewChild(YbLocality, { read: ElementRef }) locality!: ElementRef;
  @ViewChild(YbStreet, { read: ElementRef }) street!: ElementRef;
  @ViewChild(YbExtended, { read: ElementRef }) extended!: ElementRef;
}

@Injectable()
class MockAddressManager extends DefaultAddressManager {

  constructor(http: HttpClient) {
    super(http);
  }

  getAddress(postalCode: string): Observable<Address> {
    return of({
      region: '大阪府',
      locality: '大阪市北区',
      street: '中之島',
      extended: 'あいうえお',
    } as Address);
  }
}

describe('Address without Forms', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxYubinBangoModule],
      declarations: [TestApp],
      providers: [
        { provide: AddressManager, useClass: MockAddressManager }
      ]
    });
    TestBed.compileComponents();
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(TestApp);
    expect(fixture).toBeTruthy();
  });

  it('complete', () => {
    const fixture = TestBed.createComponent(TestApp);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.address.postalCodes.length).toBe(2);

    component.address.complete();

    fixture.detectChanges();

    expect(component.region.nativeElement.value).toBe('大阪府');
    expect(component.locality.nativeElement.value).toBe('大阪市北区');
    expect(component.street.nativeElement.value).toBe('中之島');
    expect(component.extended.nativeElement.value).toBe('あいうえお');
  });
});
