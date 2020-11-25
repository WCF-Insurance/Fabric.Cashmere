import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {CashmereModule} from '../cashmere.module';
import {LocationInfoComponent} from './location-info/location-info.component';
import {MultiSelectPickerRichTemplateExampleComponent} from './multi-select-picker-rich-template-example.component';

@NgModule({
    imports: [
        CommonModule,
        CashmereModule,
        ReactiveFormsModule
    ],
    declarations: [MultiSelectPickerRichTemplateExampleComponent, LocationInfoComponent],
    exports: [MultiSelectPickerRichTemplateExampleComponent, LocationInfoComponent],
    entryComponents: [MultiSelectPickerRichTemplateExampleComponent]
})
export class MultiSelectPickerRichTemplateExampleModule {
}
