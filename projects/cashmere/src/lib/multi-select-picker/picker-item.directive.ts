import {Directive} from '@angular/core';

/**
 * Serves as an anchor to be able to target this element / component / template that this
 * directive is attached to. That target is then used to stamp out values as options in the
 * multi select picker component.
 *
 * Attach hcPickerItem to the element you want to describe as your stamp / template.
 */
@Directive({
    selector: '[hcPickerItem]'
})
export class PickerItemDirective {

}
