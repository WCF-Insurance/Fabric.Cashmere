import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CashmereModule} from '../cashmere.module';
import {MultiSelectPickerFocusExampleComponent} from './multi-select-picker-focus-example.component';

@NgModule({
    imports: [
        CommonModule,
        CashmereModule,
        ReactiveFormsModule
    ],
    declarations: [MultiSelectPickerFocusExampleComponent],
    exports: [MultiSelectPickerFocusExampleComponent],
    entryComponents: [MultiSelectPickerFocusExampleComponent]
})
export class MultiSelectPickerFocusExampleModule {
}
