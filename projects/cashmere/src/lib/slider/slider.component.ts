import {
    ChangeDetectorRef,
    Component,
    DoCheck, ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    Optional,
    Output,
    Self, ViewChild
} from '@angular/core';
import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, NgForm} from '@angular/forms';

/** A change event emitted by the Slider component. */
export class HcSliderChange {
    constructor(public source: SliderComponent, public value: number) {}
}

@Component({
    selector: 'hc-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    providers: [
        {
            provide: HcFormControlComponent,
            useExisting: forwardRef(() => SliderComponent)
        }
    ]
})
export class SliderComponent extends HcFormControlComponent implements OnInit, ControlValueAccessor, DoCheck {
    private _form: NgForm | FormGroupDirective | null;

    @ViewChild('inputElement', {static: true}) inputElement: ElementRef;

    @Input()
    value: number | null;

    _value: number | null;

    @Input()
    min: number;

    @Input()
    max: number;

    @Input()
    disabled: boolean;

    @Output()
    change: EventEmitter<HcSliderChange> = new EventEmitter<HcSliderChange>();

    @Output()
    input: EventEmitter<HcSliderChange> = new EventEmitter<HcSliderChange>();

    /**
     * Two way binding for 'value' input
     */
    @Output()
    valueChanges: EventEmitter<number | null> = new EventEmitter<number | null>();

    private _controlValueAccessorChangeFn: (value: any) => void = () => {};
    private onTouched: () => any = () => {};

    constructor(
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional()
        @Self()
        public _ngControl: NgControl
    ) {
        super();

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    _change(event: Event, value: number) {
        event.stopPropagation();
        this._controlValueAccessorChangeFn(value);
        this.onTouched();
        this._emitChangeEvent(value);
        this._emitInputEvent(value);
    }

    _input(event: Event, value: number) {
        event.stopPropagation();
        this._emitInputEvent(value);
    }

    _emitChangeEvent(value: number) {
        this.change.emit(new HcSliderChange(this, value));
    }

    _emitInputEvent(value: number) {
        this.input.emit(new HcSliderChange(this, value));
    }

    ngOnInit() {}

    registerOnChange(fn: any): void {
        this._controlValueAccessorChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: any): void {
        this.value = value;
        this.inputElement.nativeElement.value = value;
    }

    _onBlur() {
        this.onTouched();
    }

    ngDoCheck(): void {
        // This needs to be checked every cycle because we can't subscribe to form submissions
        if (this._ngControl) {
            this._updateErrorState();
        }
    }

    private _updateErrorState() {
        const oldState = this._errorState;

        const newState = !!(
            this._ngControl &&
            this._ngControl.invalid &&
            ((this._ngControl.touched || this._form && this._form.submitted))
        );

        if (oldState !== newState) {
            this._errorState = newState;
        }
    }
}
