import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CheckboxModule} from '../checkbox/checkbox.module';
import {ListModule} from '../list/list.module';
import { AutofocusDirective } from './autofocus-directive';
import {ButtonModule} from '../button/button.module';
import {PickerItemDirective} from './picker-item.directive';
import { MultiSelectPickerSummaryPipe } from './multi-select-picker-summary.pipe';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {MultiSelectPickerComponent} from './multi-select-picker.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        BrowserAnimationsModule,
        CheckboxModule,
        FormFieldModule,
        ListModule,
        OverlayModule,
        PortalModule
    ],
    declarations: [MultiSelectPickerComponent, AutofocusDirective, PickerItemDirective, MultiSelectPickerSummaryPipe],
    exports: [MultiSelectPickerComponent, AutofocusDirective, PickerItemDirective]
})
export class MultiSelectPickerModule {
}
