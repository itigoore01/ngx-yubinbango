import { Directive, Renderer2, ElementRef, Optional, Self } from '@angular/core';
import { CompletionTarget } from '../core/common-behaviors/completion-target';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ybExtended]'
})
export class YbExtended extends CompletionTarget {

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Self() @Optional() ngControl: NgControl,
  ) {
    super(ngControl, elementRef, renderer);
  }

}
