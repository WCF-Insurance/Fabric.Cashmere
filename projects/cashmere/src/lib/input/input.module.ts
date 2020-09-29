import {NgModule} from '@angular/core';
import {InputDirective} from './input.directive';
import {CurrencyDirective} from './currency.directive';
import {MaxLengthDirective} from './maxlength.directive';
import {PhoneMaskDirective} from './phone-mask.directive';
import {ZipCodeMaskDirective} from './zipcode.directive';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, FormFieldModule],
    declarations: [InputDirective, CurrencyDirective, MaxLengthDirective, PhoneMaskDirective, ZipCodeMaskDirective],
    exports: [InputDirective, CurrencyDirective, MaxLengthDirective, PhoneMaskDirective, ZipCodeMaskDirective]
})
export class InputModule {}
