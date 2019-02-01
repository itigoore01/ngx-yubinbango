import { Directive, Self, Optional, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({
  selector: '[ybPostalCode]'
})
export class YbPostalCode {

  get value(): string | null {
    return !!this._ngControl ? this._ngControl.value : this._elementRef.nativeElement.value;
  }

  readonly _onChange = new Subject<string | null>();

  readonly _onKeyup = new Subject<string | null>();

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>,
    @Self() @Optional() private _ngControl: NgControl,
  ) { }

  @HostListener('change')
  _handleChange() {
    this._onChange.next(this.value);
  }

  @HostListener('keyup')
  _handleKeyup() {
    this._onKeyup.next(this.value);
  }
}
