import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Optional,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { elementHasValue } from '../utils/element-has-value';
import { PostalCodeFormControl } from './provider.directive';

@Directive({
  selector: '[ybPostalCode]',
  providers: [
    {
      provide: PostalCodeFormControl,
      useExisting: forwardRef(() => PostalCodeDirective),
    },
  ],
})
export class PostalCodeDirective extends PostalCodeFormControl {
  get value(): string {
    return (
      this.ngControl?.value ??
      (elementHasValue(this.elementRef.nativeElement) &&
        this.elementRef.nativeElement.value) ??
      ''
    );
  }

  readonly onKeyup = new Subject<void>();

  readonly onChange = new Subject<void>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Self() @Optional() private ngControl?: NgControl
  ) {
    super();
  }

  @HostListener('keyup')
  handleKeyup(): void {
    this.onKeyup.next();
  }

  @HostListener('change')
  handleChange(): void {
    this.onChange.next();
  }
}
