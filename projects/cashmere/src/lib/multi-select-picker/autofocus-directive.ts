import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

/**
 * Handles auto-focusing the element that this directive is attached to.
 */
@Directive({
    selector: '[hcAutoFocus]'
})
export class AutofocusDirective implements AfterContentInit {

    public constructor(private el: ElementRef) {

    }

    public ngAfterContentInit() {

        setTimeout(() => {

            this.el.nativeElement.focus();

        }, 1);

    }

}
