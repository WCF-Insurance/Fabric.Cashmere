import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CashmereModule} from '../cashmere.module';
import {LocationInfoComponent} from './location-info/location-info.component';
import {MultiSelectPickerFormDisabledExampleComponent} from './multi-select-picker-form-disabled-example.component';

@NgModule({
    imports: [
        CommonModule,
        CashmereModule,
        ReactiveFormsModule
    ],
    declarations: [MultiSelectPickerFormDisabledExampleComponent, LocationInfoComponent],
    exports: [MultiSelectPickerFormDisabledExampleComponent, LocationInfoComponent],
    entryComponents: [MultiSelectPickerFormDisabledExampleComponent]
})
export class MultiSelectPickerFormDisabledExampleModule {
}
