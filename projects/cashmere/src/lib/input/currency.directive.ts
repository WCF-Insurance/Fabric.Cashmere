import {AfterViewInit, Directive, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {NgControl} from '@angular/forms';
import {SubscriptionLike} from 'rxjs';

@Directive({
    selector: '[hcCurrency]'
})

export class CurrencyDirective implements OnInit, AfterViewInit, OnDestroy {

    private _currencyControl;

    private sub: SubscriptionLike;

    constructor(private _view: ViewContainerRef, private directiveControl: NgControl) {
    }

    ngOnInit() {
        this._currencyControl = this.directiveControl.control;
    }

    ngAfterViewInit() {
        this.sub = this._currencyControl.valueChanges.subscribe(val => {
            this.currencyValidate(val);
        });

        // Format the initial value passed in
        setTimeout(() => {
            this.currencyValidate(this._currencyControl.value);
        }, 0);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    currencyValidate(data) {
        if (data) {
            // Allow only numbers and "." to be typed
            let newVal = data.replace(/[^.\d]/g, '');
            let decimalPlace = newVal.indexOf('.');

            // If there is a decimal
            if (decimalPlace > -1) {
                let beforeDecimal = newVal.slice(0, decimalPlace);
                let afterDecimal = newVal.slice(decimalPlace);

                beforeDecimal = this.formatNumber(beforeDecimal);
                if (afterDecimal.length > 3) {
                    afterDecimal = afterDecimal.substr(0, afterDecimal.length - 1);
                }
                newVal = beforeDecimal + afterDecimal;
                this._currencyControl.setValue(newVal, {emitEvent: false});
                // If there is no decimal
            } else {
                newVal = this.formatNumber(newVal);
                this._currencyControl.setValue(newVal, {emitEvent: false});
            }
        }
    }

    formatNumber(val: string) {
        let formatted = '';
        if (val.length === 0) {
            return formatted;
        } else if (val.length < 4) {
            formatted = val.replace(/^(\d{0,3})/, '$1');
        } else if (val.length < 7) {
            formatted = val.replace(/^(\d{1,3})(\d{3})/, '$1,$2');
        } else if (val.length < 10) {
            formatted = val.replace(/^(\d{1,3})(\d{3})(\d{3})/, '$1,$2,$3');
        }
        return formatted;
    }
}
