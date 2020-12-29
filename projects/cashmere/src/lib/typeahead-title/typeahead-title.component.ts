import {AfterViewInit, Component, ContentChild, Input} from '@angular/core';

import {TypeaheadComponent} from '../typeahead/typeahead.component';

@Component({
    selector: 'hc-typeahead-title',
    templateUrl: './typeahead-title.component.html',
    styleUrls: ['./typeahead-title.component.scss']
})
export class TypeaheadTitleComponent implements AfterViewInit {
    DEFAULT_PLACEHOLDER = 'Typeahead Placeholder';

    /** Whether or not the component should show the alert effect (red border) when it is empty. */
    @Input()
    alertOnEmpty: boolean = true;

    _isTypeaheadShown: boolean = false;
    _value: string;
    _placeholder: string;
    _displayValue: string;

    @ContentChild(TypeaheadComponent, {static: false})
    _typeahead: TypeaheadComponent;

    _hideTitle() {
        this._isTypeaheadShown = true;
        setTimeout(() => {
            this._typeahead.setFocus();
        });
    }

    ngAfterViewInit() {
        if (this._typeahead) {
            this._placeholder = this._typeahead._inputRef.nativeElement.getAttribute('placeholder');
            this._typeahead.optionSelected.subscribe(option => {
                this._isTypeaheadShown = false;
            });

            this._typeahead.registerOnChange(this._updateValue.bind(this));

            this._typeahead.blur.subscribe(event => {
                // Prevents the click on the result panel causing the typeahead to disappear before the value can be sent
                if (this._typeahead._resultPanelHidden === true) {
                    this._isTypeaheadShown = false;
                }
            });

            setTimeout(() => this._updateValue(this._typeahead.value));
        }

        this._refreshDisplayValue();
    }

    private _updateValue(val: string) {
        this._value = val;
        this._refreshDisplayValue();
    }

    private _refreshDisplayValue() {
        setTimeout(() => {
            this._displayValue = this._value || this._placeholder || this.DEFAULT_PLACEHOLDER;
        });
    }

    _drawAttention() {
        return this.alertOnEmpty && this._typeahead && !this._typeahead._value;
    }
}
