import { Directive, ElementRef, Renderer2, Self, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CompletionTarget } from '../core/common-behaviors/completion-target';

@Directive({
  selector: '[ybRegion]'
})
export class YbRegion extends CompletionTarget {

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Self() @Optional() ngControl: NgControl,
  ) {
    super(ngControl, elementRef, renderer);
  }

}
