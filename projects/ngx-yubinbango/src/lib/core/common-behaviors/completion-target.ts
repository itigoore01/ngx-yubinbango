import { NgControl } from '@angular/forms';
import { ElementRef, Renderer2 } from '@angular/core';

export class CompletionTarget {
  get value() {
    if (this.ngControl) {
      return this.ngControl.value;
    } else if ('value' in this.elementRef.nativeElement) {
      return this.elementRef.nativeElement.value;
    } else if ('textContent' in this.elementRef.nativeElement) {
      return this.elementRef.nativeElement.textContent;
    }
    return '';
  }
  set value(value: string) {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value);
    } else if ('value' in this.elementRef.nativeElement) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
    } else if ('textContent' in this.elementRef.nativeElement) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'textContent', value);
    }
  }

  constructor(
    public ngControl: NgControl | undefined,
    public elementRef: ElementRef,
    public renderer: Renderer2,
  ) { }
}
