import {AfterViewInit, Directive, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef} from '@angular/core';
import {NgControl} from '@angular/forms';
import {SubscriptionLike} from 'rxjs';

@Directive({
    selector: '[hcZipCodeMask]'
})
export class ZipCodeMaskDirective implements AfterViewInit, OnDestroy, OnInit {
    private _zipControl;
    private _preValue: string;

    @Input()
    set preValue(value: string) {
        this._preValue = value.replace(/\D/g, '');
    }

    private sub: SubscriptionLike;

    constructor(private renderer: Renderer2, private _view: ViewContainerRef, private directiveControl: NgControl) {
    }

    ngOnInit() {
        this._zipControl = this.directiveControl.control;
    }

    ngAfterViewInit() {
        let component_id: string = '#' + (this._view).element.nativeElement.id;
        this.zipValidate(component_id);

        // Format the initial value passed in
        setTimeout(() => {
            let newVal = this._getFormattedValue(this._preValue);
            this._zipControl.setValue(newVal, {emitEvent: false});
        }, 0);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    zipValidate(id: string) {
        this.sub = this._zipControl.valueChanges.subscribe(data => {
            let preInputValue: string = this._preValue;

            // Allow only numeric characters
            let newVal = data.replace(/\D/g, '');
            let start = this.renderer.selectRootElement(id).selectionStart;
            let end = this.renderer.selectRootElement(id).selectionEnd;

            // If deleting input characters
            if (newVal.length < preInputValue.length) {
                newVal = this._getFormattedValue(newVal);
                this._zipControl.setValue(newVal, {emitEvent: false});
                this.renderer.selectRootElement(id).setSelectionRange(start, end);
                // If adding input characters
            } else {
                let removedD = data.charAt(start);
                newVal = this._getFormattedValue(newVal);

                // Check if in the process of typing a number out
                if (preInputValue.length >= start) {
                    // Change cursor position after adding special characters
                    if (removedD === '-') {
                        start += 1;
                        end += 1;
                    }
                    this._zipControl.setValue(newVal, {emitEvent: false});
                    this.renderer.selectRootElement(id).setSelectionRange(start, end);
                } else {
                    this._zipControl.setValue(newVal, {emitEvent: false});
                    const additionalLength = newVal.length <= 10 ? 2 : 6;
                    this.renderer.selectRootElement(id).setSelectionRange(start + additionalLength, end + additionalLength);
                }
                if (newVal.length > 10) {
                    newVal = newVal.substr(0, newVal.length - 1);
                    this._zipControl.setValue(newVal, {emitEvent: false});
                }
            }
        });
    }

    private _getFormattedValue(newVal: string) {
        if (newVal.length === 0) {
            newVal = '';
        } else if (newVal.length <= 5) {
            newVal = newVal.replace(/^(\d{0,5})/, '$1');
        } else {
            newVal = newVal.replace(/^(\d{0,5})(\d{0,4})/, '$1-$2');
        }
        return newVal;
    }
}
