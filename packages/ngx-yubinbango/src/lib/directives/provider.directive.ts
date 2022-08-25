import {
  AfterContentInit,
  ContentChildren,
  Directive,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  merge,
  Observable,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Address } from '../core/address';
import { PostalCodeResolver } from '../core/postal-code-resolver.service';

export type AddressAutocompleteMode = 'change' | 'keyup' | 'manual';

export abstract class PostalCodeFormControl {
  abstract get value(): string;
  abstract get onKeyup(): Observable<void>;
  abstract get onChange(): Observable<void>;
}

export abstract class AddressProvider {
  abstract get addressChange(): Observable<Address>;
}

@Directive({
  selector: '[ybProvider]',
  exportAs: 'ybProvider',
  providers: [
    {
      provide: AddressProvider,
      useExisting: forwardRef(() => ProviderDirective),
    },
  ],
})
export class ProviderDirective
  implements ProviderDirective, AfterContentInit, OnDestroy
{
  @Input()
  ybAutocompleteMode: AddressAutocompleteMode = 'keyup';

  @ContentChildren(PostalCodeFormControl, { descendants: true })
  postalCodes?: QueryList<PostalCodeFormControl>;

  private readonly address = new Subject<Address>();

  @Output()
  readonly addressChange = this.address.pipe(
    distinctUntilChanged((prev, current) => {
      return (
        prev.regionId === current.regionId &&
        prev.region === current.region &&
        prev.locality === current.locality &&
        prev.street === current.street &&
        prev.extended === current.extended
      );
    })
  );

  private readonly destroy = new Subject<void>();

  constructor(private readonly postalCodeResolver: PostalCodeResolver) {}

  ngAfterContentInit(): void {
    this.listenToPostalCode();
  }

  ngOnDestroy(): void {
    this.address.complete();
    this.destroy.next();
    this.destroy.complete();
  }

  complete(): void {
    const postalCode = this.postalCodes?.map((p) => p.value).join('') ?? '';

    this.postalCodeResolver
      .resolve(postalCode)
      .pipe(takeUntil(this.destroy))
      .subscribe((address) => {
        if (address == null) {
          return;
        }

        this.address.next(address);
      });
  }

  private listenToPostalCode(): void {
    const postalCodes = this.postalCodes;

    if (postalCodes == null) {
      return;
    }

    postalCodes.changes
      .pipe(
        startWith(null),
        switchMap(() =>
          merge(
            merge(...postalCodes.map((p) => p.onChange)).pipe(
              filter(() => this.ybAutocompleteMode === 'change')
            ),
            merge(...postalCodes.map((p) => p.onKeyup)).pipe(
              filter(() => this.ybAutocompleteMode === 'keyup')
            )
          )
        ),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.complete();
      });
  }
}
