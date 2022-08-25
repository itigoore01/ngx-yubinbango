import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { coerceBooleanProperty } from '../utils/coerce-boolean-property';
import { elementHasValue } from '../utils/element-has-value';
import { AddressProvider } from './provider.directive';

@Directive({
  selector: '[ybCompletion]',
})
export class CompletionDirective implements OnInit, OnDestroy {
  @Input()
  get ybRegion() {
    return this._ybRegion;
  }
  set ybRegion(value) {
    this._ybRegion = coerceBooleanProperty(value);
  }
  private _ybRegion = false;

  @Input()
  get ybLocality() {
    return this._ybLocality;
  }
  set ybLocality(value) {
    this._ybLocality = coerceBooleanProperty(value);
  }
  private _ybLocality = false;

  @Input()
  get ybStreet() {
    return this._ybStreet;
  }
  set ybStreet(value) {
    this._ybStreet = coerceBooleanProperty(value);
  }
  private _ybStreet = false;

  @Input()
  get ybExtended() {
    return this._ybExtended;
  }
  set ybExtended(value) {
    this._ybExtended = coerceBooleanProperty(value);
  }
  private _ybExtended = false;

  private get value(): string {
    return (
      this.ngControl?.value ??
      (elementHasValue(this.elementRef.nativeElement) &&
        this.elementRef.nativeElement.value) ??
      this.elementRef.nativeElement.textContent ??
      ''
    );
  }

  private set value(value: string) {
    if (this.ngControl?.control?.setValue) {
      this.ngControl.control.setValue(value);
    } else if (elementHasValue(this.elementRef.nativeElement)) {
      this.renderer.setValue(this.elementRef.nativeElement, value);
    } else {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'textContent',
        value
      );
    }
  }

  private readonly destroy = new Subject<void>();

  constructor(
    @Optional() private readonly addressProvider: AddressProvider,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() private readonly ngControl?: NgControl
  ) {
    if (addressProvider == null) {
      throw new Error(
        'AddressProvider was not found.\nIs "ybCompletion" in "ybProvider"?'
      );
    }
  }

  ngOnInit(): void {
    this.addressProvider.addressChange
      .pipe(takeUntil(this.destroy))
      .subscribe((address) => {
        let formattedAddress = '';

        if (this.ybRegion) {
          formattedAddress += address.region;
        }
        if (this.ybLocality) {
          formattedAddress += address.locality;
        }
        if (this.ybStreet) {
          formattedAddress += address.street;
        }
        if (this.ybExtended) {
          formattedAddress += address.extended;
        }

        // 入力済みの住所と前方一致するなら、続きを入力しているかもしれないので上書きしない
        if (this.value.startsWith(formattedAddress)) {
          return;
        }

        this.value = formattedAddress;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
