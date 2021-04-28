import {AfterViewInit, Directive, forwardRef, HostListener, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
    selector: '[hcCurrency]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => CurrencyDirective), multi: true}
    ]
})

export class CurrencyDirective implements AfterViewInit, Validator {

    private _formControl: AbstractControl;
    private _preValue: string;
    private _digitPattern = RegExp(/[\.\d]/);
    private _currencyPattern = RegExp(/^(\d{0,3},)?(\d{0,3},)?(\d{1,3})(\.\d{2})/);

    @Input()
    set formControl(control: AbstractControl) {
        this._formControl = control;
    }

    @HostListener('focus')
        onFocus() {
            let val = this.handleDecimal(this._preValue);
            this._formControl.setValue(val.toString().replace(/[^\.\d]/g, ''), {emitEvent: false});
        }

    @HostListener('blur')
    onBlur() {
        let val = this.handleDecimal(this._preValue);
        this._formControl.setValue(val, {emitEvent: false});
    }

    @Input()
    set preValue(value: string) {
        if (value) {
            this._preValue = value.toString().replace(/[^\.\d]/g, '');
        } else {
            this._preValue = "";
        }
    }

    constructor() {
    }

    ngAfterViewInit() {
        // Format the initial value passed in
        setTimeout(() => {
            let val = this.handleDecimal(this._preValue);
            this._formControl.setValue(val, {emitEvent: false});
        }, 0);
    }

    handleDecimal(val: string) {
        let decimalPlace = val.indexOf('.');

        if (decimalPlace > -1) {
            let beforeDecimal = val.slice(0, decimalPlace);
            let afterDecimal = val.slice(decimalPlace);

            beforeDecimal = this.formatNumber(beforeDecimal);

            if (afterDecimal.length > 3) {
                afterDecimal = afterDecimal.substr(0, 3);
            }
            return beforeDecimal + afterDecimal;
        } else {
            return this.formatNumber(val);
        }
    }

    formatNumber(val: string) {
        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value && !this._digitPattern.test(control.value) && !this._currencyPattern.test(control.value)) {
            return {invalid: true};
        }
        return null;
    }
}
