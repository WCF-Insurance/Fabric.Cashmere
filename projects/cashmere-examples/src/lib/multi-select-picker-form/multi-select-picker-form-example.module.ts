import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CashmereModule} from '../cashmere.module';
import {ReactiveFormsModule} from '@angular/forms';

import {LocationInfoComponent} from './location-info/location-info.component';
import {MultiSelectPickerFormExampleComponent} from './multi-select-picker-form-example.component';

@NgModule({
    imports: [
        CommonModule,
        CashmereModule,
        ReactiveFormsModule
    ],
    declarations: [MultiSelectPickerFormExampleComponent, LocationInfoComponent],
    exports: [MultiSelectPickerFormExampleComponent, LocationInfoComponent],
    entryComponents: [MultiSelectPickerFormExampleComponent]
})
export class MultiSelectPickerFormExampleModule {
}
