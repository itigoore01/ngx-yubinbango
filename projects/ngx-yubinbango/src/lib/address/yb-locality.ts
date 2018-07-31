import { Directive, Renderer2, ElementRef, Self, Optional } from '@angular/core';
import { CompletionTarget } from '../core/common-behaviors/completion-target';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ybLocality]'
})
export class YbLocality  extends CompletionTarget {

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Self() @Optional() ngControl: NgControl,
  ) {
    super(ngControl, elementRef, renderer);
  }

}
