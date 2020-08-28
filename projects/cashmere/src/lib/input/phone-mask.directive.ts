import {AfterViewInit, Directive, forwardRef, Input, OnDestroy, Renderer2, ViewContainerRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {SubscriptionLike} from 'rxjs';

@Directive({
    selector: '[hcPhoneMask]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneMaskDirective), multi: true}
    ]
})
export class PhoneMaskDirective implements AfterViewInit, OnDestroy, Validator {
    private _digitPattern = RegExp(/^\d*$/);
    private _phonePattern = RegExp(/^\(\d{3}\)\s\d{3}-\d{4}(?:\s\sext\s\d+)?$/);

    private _phoneControl: AbstractControl;
    private _preValue: string;

    @Input()
    set phoneControl(control: AbstractControl) {
        this._phoneControl = control;
    }

    @Input()
    set preValue(value: string) {
        this._preValue = value.replace(/\D/g, '');
    }

    private sub: SubscriptionLike;

    constructor(private renderer: Renderer2, private _view: ViewContainerRef) {
    }

    ngAfterViewInit() {
        let component_id: string = '#' + (this._view).element.nativeElement.id;
        this.phoneValidate(component_id);

        // Format the initial value passed in
        setTimeout(() => {
            let newVal = this._getFormattedValue(this._preValue);
            this._phoneControl.setValue(newVal, {emitEvent: false});
        }, 0);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    phoneValidate(id: string) {
        this.sub = this._phoneControl.valueChanges.subscribe(data => {
            let preInputValue: string = this._preValue;

            // Allow only numeric characters
            let newVal = data.replace(/\D/g, '');
            let start = this.renderer.selectRootElement(id).selectionStart;
            let end = this.renderer.selectRootElement(id).selectionEnd;

            // If deleting input characters
            if (newVal.length < preInputValue.length) {
                newVal = this._getFormattedValue(newVal);
                this._phoneControl.setValue(newVal, {emitEvent: false});
                this.renderer.selectRootElement(id).setSelectionRange(start, end);
                // If adding input characters
            } else {
                let removedD = data.charAt(start);
                newVal = this._getFormattedValue(newVal);

                // Check if in the process of typing a number out
                if (preInputValue.length >= start) {
                    // Change cursor position after adding special characters
                    switch (removedD) {
                        case '(':
                        case ')':
                        case '-':
                            start += 1;
                            end += 1;
                            break;
                        case 'ext':
                            start += 3;
                            end += 3;
                            break;
                    }
                    this._phoneControl.setValue(newVal, {emitEvent: false});
                    this.renderer.selectRootElement(id).setSelectionRange(start, end);
                } else {
                    this._phoneControl.setValue(newVal, {emitEvent: false});
                    const additionalLength = newVal.length <= 10 ? 2 : 6;
                    this.renderer.selectRootElement(id).setSelectionRange(start + additionalLength, end + additionalLength);
                }
            }
        });
    }

    private _getFormattedValue(newVal: string) {
        // Don't show braces for empty value
        if (newVal.length === 0) {
            newVal = '';
        } else if (newVal.length <= 3) {
            // Don't show braces for empty groups at the end
            newVal = newVal.replace(/^(\d{0,3})/, '($1');
        } else if (newVal.length <= 6) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
        } else if (newVal.length <= 10) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
        } else {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})(.*)/, '($1) $2-$3  ext $4');
        }

        return newVal;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value && !this._digitPattern.test(control.value) && !this._phonePattern.test(control.value)) {
            return {invalid: true};
        }

        return null;
    }
}
