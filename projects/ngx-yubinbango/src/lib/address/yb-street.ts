import { Directive, Renderer2, ElementRef, Self, Optional, Inject } from '@angular/core';
import { CompletionTarget } from '../core/common-behaviors/completion-target';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ybStreet]'
})
export class YbStreet extends CompletionTarget {

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Inject(NgControl) @Self() @Optional() ngControl: NgControl | undefined,
  ) {
    super(ngControl, elementRef, renderer);
  }

}
