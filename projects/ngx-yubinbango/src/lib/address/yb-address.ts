import { Directive, ContentChildren, QueryList, ContentChild, Input, AfterContentInit, OnDestroy } from '@angular/core';
import { AddressManager } from '../core/address-manager';
import { YbPostalCode } from './yb-postal-code';
import { YbRegion } from './yb-region';
import { YbLocality } from './yb-locality';
import { YbStreet } from './yb-street';
import { YbExtended } from './yb-extended';
import { Observable, merge, Subscription } from 'rxjs';
import { startWith, mapTo, filter, map } from 'rxjs/operators';

export type YbAddressAutocompleteMode = 'change' | 'keyup' | 'off';

@Directive({
  selector: '[ybAddress]',
  exportAs: 'ybAddress',
})
export class YbAddress implements OnDestroy, AfterContentInit {

  @Input('ybAutocompleteMode') autocompleteMode: YbAddressAutocompleteMode = 'keyup';

  @ContentChildren(YbPostalCode, { descendants: true }) postalCodes!: QueryList<YbPostalCode>;

  @ContentChild(YbRegion) region: YbRegion | null = null;

  @ContentChild(YbLocality) locality: YbLocality | null = null;

  @ContentChild(YbStreet) street: YbStreet | null = null;

  @ContentChild(YbExtended) extended: YbExtended | null = null;

  private _changeSubscription: Subscription | null = null;

  private _postalCodeValueChangeSubscription: Subscription | null = null;

  get postalCodeValueChanges(): Observable<string> {
    return merge(...this.postalCodes.map(p => p._onChange))
      .pipe(
        map(v => v || ''),
      );
  }

  get postalCodeKeyup(): Observable<string> {
    return merge(...this.postalCodes.map(p => p._onKeyup))
      .pipe(
        map(v => v || ''),
      );
  }

  constructor(
    private _addressManager: AddressManager,
  ) { }

  ngAfterContentInit() {
    this._changeSubscription = this.postalCodes.changes.pipe(startWith(null)).subscribe(() => {
      this._resetPostalCodes();
    });
  }

  ngOnDestroy() {
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
    }

    this._dropSubscription();
  }

  complete() {
    const postalCode = this._addressManager.normalizePostalCode(this.postalCodes.map(p => p.value).join(''));

    if (!this._addressManager.validatePostalCode(postalCode)) {
      return;
    }

    this._addressManager.getAddress(postalCode)
      .subscribe(addr => {
        if (addr) {
          if (this.region) { this.region.value = this._addressManager.getRegion(addr); }
          if (this.locality) { this.locality.value = this._addressManager.getLocality(addr); }
          if (this.street) { this.street.value = this._addressManager.getStreet(addr); }
          if (this.extended) { this.extended.value = this._addressManager.getExtended(addr); }
        }
      });
  }

  private _resetPostalCodes() {
    this._dropSubscription();
    this._listenToPostalCode();
  }

  private _dropSubscription() {
    if (this._postalCodeValueChangeSubscription) {
      this._postalCodeValueChangeSubscription.unsubscribe();
      this._postalCodeValueChangeSubscription = null;
    }
  }

  private _listenToPostalCode() {
    this._postalCodeValueChangeSubscription = merge<YbAddressAutocompleteMode>(
      this.postalCodeValueChanges.pipe(mapTo('change')),
      this.postalCodeKeyup.pipe(mapTo('keyup'))
    )
      .pipe(filter(mode => mode === this.autocompleteMode))
      .subscribe((_) => {
        this.complete();
      });
  }
}
