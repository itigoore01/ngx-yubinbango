import { Directive, Renderer2, ElementRef, Optional, Self, Inject } from '@angular/core';
import { CompletionTarget } from '../core/common-behaviors/completion-target';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ybExtended]'
})
export class YbExtended extends CompletionTarget {

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Inject(NgControl) @Self() @Optional() ngControl: NgControl | undefined,
  ) {
    super(ngControl, elementRef, renderer);
  }

}
