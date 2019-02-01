import { Directive, ElementRef, Renderer2, Self, Optional, Inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CompletionTarget } from '../core/common-behaviors/completion-target';

@Directive({
  selector: '[ybRegion]'
})
export class YbRegion extends CompletionTarget {

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Inject(NgControl) @Self() @Optional() ngControl: NgControl | undefined,
  ) {
    super(ngControl, elementRef, renderer);
  }

}
