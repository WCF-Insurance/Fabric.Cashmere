import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CashmereModule} from '../cashmere.module';
import {LocationInfoComponent} from './location-info/location-info.component';
import {MultiSelectPickerRichComponentExampleComponent} from './multi-select-picker-rich-component-example.component';

@NgModule({
    imports: [
        CommonModule,
        CashmereModule,
        ReactiveFormsModule
    ],
    declarations: [MultiSelectPickerRichComponentExampleComponent, LocationInfoComponent],
    exports: [MultiSelectPickerRichComponentExampleComponent, LocationInfoComponent],
    entryComponents: [MultiSelectPickerRichComponentExampleComponent]
})
export class MultiSelectPickerRichComponentExampleModule {
}
