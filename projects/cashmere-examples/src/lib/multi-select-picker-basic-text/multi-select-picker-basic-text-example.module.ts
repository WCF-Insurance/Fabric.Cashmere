import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiSelectPickerBasicTextExampleComponent} from './multi-select-picker-basic-text-example.component';
import {CashmereModule} from '../cashmere.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CashmereModule,
        ReactiveFormsModule
    ],
    declarations: [MultiSelectPickerBasicTextExampleComponent],
    exports: [MultiSelectPickerBasicTextExampleComponent],
    entryComponents: [MultiSelectPickerBasicTextExampleComponent]
})
export class MultiSelectPickerBasicTextExampleModule {
}
