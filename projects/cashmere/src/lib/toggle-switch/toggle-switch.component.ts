/* tslint:disable:no-use-before-declare */

import {
    Attribute,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    Self,
    Optional,
    DoCheck,
    HostListener
} from '@angular/core';
import { ControlValueAccessor, NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { HcFormControlComponent } from '../form-field/hc-form-control.component';
import { parseBooleanAttribute } from '../util';

let nextToggleswitchId = 1;

export class ToggleSwitchChangeEvent {
    constructor(public source: ToggleSwitchComponent, public checked: boolean) { }
}

@Component({
    selector: 'hc-toggle-switch',
    templateUrl: './toggle-switch.component.html',
    styleUrls: ['./toggle-switch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: HcFormControlComponent, useExisting: forwardRef(() => ToggleSwitchComponent) }],
    exportAs: 'hcToggleSwitch'
})
export class ToggleSwitchComponent extends HcFormControlComponent implements ControlValueAccessor, DoCheck {
    private _uniqueId = `hc-Toggle-switch-${nextToggleswitchId++}`;
    private _form: NgForm | FormGroupDirective | null;
    private _checked: boolean = false;
    private _tabIndex: number;

    _componentId = this._uniqueId;
    focused = false;

    /** Value attribute of the native toggle switch */
    @Input()
    value: string;

    /** Unique id for the toggle switch element. If none is supplied, one will be auto-generated. */
    @Input()
    get id(): string {
        return this._componentId || this._uniqueId;
    }

    set id(idVal: string) {
        this._componentId = idVal ? idVal : this._uniqueId;
    }

    /** Sets unique name used in a form */
    @Input()
    name: string | null = null;

    /** Event emitted whenever the state changes */
    @Output()
    change = new EventEmitter<ToggleSwitchChangeEvent>();

    @ViewChild('toggleSwitchInput', {static: false})
    _toggleSwitchInput: ElementRef;

    @ViewChild('hcToggleSwitchOverlay', {static: false})
    _toggleSwitchOverlay: ElementRef;

    @HostBinding('attr.id')
    get _getHostId(): string {
        return this.id;
    }

    @HostBinding('class.hc-toggle-switch-checked')
    get _getToggleSwitchCheckedClass(): boolean {
        return this.checked;
    }

    @HostBinding('class.hc-toggle-switch-disabled')
    get _getToggleSwitchDisabledClass(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    @HostBinding('class.hc-toggle-switch-focused')
    get _getToggleSwitchFocusedClass(): boolean {
        return this.focused;
    }

    @HostListener('keydown', ['$event'])
    _onKeyDown(event: KeyboardEvent) {
        const spacebarCode = 32;
        if (event.which === spacebarCode && !this._isDisabled && this.focused) {
            this.toggle();
            event.stopPropagation();
        }
    }

    /** Whether the toggle switch is required. */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }

    set required(requiredVal) {
        this._isRequired = parseBooleanAttribute(requiredVal);
    }

    /** Whether the toggle switch is disabled. */
    @Input()
    get disabled(): boolean {
        if (this._ngControl && this._ngControl.disabled) {
            return this._ngControl.disabled;
        }
        return this._isDisabled;
    }

    set disabled(disabledVal) {
        this._isDisabled = parseBooleanAttribute(disabledVal);
    }

    /** Whether the toggle switch is checked. */
    @Input()
    get checked(): boolean {
        return this._checked;
    }

    set checked(checked: boolean) {
        if (this._checked === checked) {
            return;
        }
        this._checked = checked;
    }

    /** TabIndex attribute of native toggle switch */
    get tabIndex(): number {
        return this._isDisabled ? -1 : this._tabIndex;
    }

    set tabIndex(value: number) {
        this._tabIndex = value == null ? 0 : value;
    }

    get _inputId() {
        return `${this.id || this._uniqueId}-input`;
    }

    private _onChangeFunc: (value: any) => void = () => { };

    private _onTouchFunc: () => any = () => { };

    constructor(
        @Attribute('tabindex') tabindex: string,
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        @Optional() _parentForm: NgForm,
        @Optional() _parentFormGroup: FormGroupDirective,
        @Optional()
        @Self()
        public _ngControl: NgControl
    ) {
        super();

        this.tabIndex = parseInt(tabindex, 10) || 0;

        this._form = _parentForm || _parentFormGroup;
        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    writeValue(value: any): void {
        this.checked = !!value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this._onChangeFunc = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouchFunc = fn;
    }

    setDisabledState(disabledVal: boolean): void {
        this.disabled = disabledVal;
        this._renderer.setProperty(this._toggleSwitchInput.nativeElement, 'disabled', disabledVal);
    }

    /** Toggles the current checked state of the toggle switch */
    toggle() {
        this.checked = !this.checked;
        this._emitChangeEvent();
    }

    _clickEvent(event: Event) {
        event.stopPropagation(); // prevent native click event from being dispatched

        if (!this.disabled) {
            this.toggle();
        }
    }

    _labelClickEvent(event: Event) {
        event.preventDefault();
        event.stopPropagation(); // prevent native click event from being dispatched

        if (!this.disabled) {
            this.toggle();
            this._toggleSwitchOverlay.nativeElement.focus();
        }
    }

    _focusEvent() {
        this.focused = true;
    }

    _onBlur() {
        this._onTouchFunc();
        this.focused = false;
    }

    _stopChangeEvent(event: Event) {
        event.stopPropagation(); // prevent native change event from emitting its own object through output 'change'
    }
    private _emitChangeEvent(): void {
        this._onChangeFunc(this.checked);
        this.change.emit(new ToggleSwitchChangeEvent(this, this.checked));
    }

    ngDoCheck(): void {
        // This needs to be checked every cycle because we can't subscribe to form submissions
        if (this._ngControl) {
            this._updateErrorState();
        }
    }
    private setHostClass(previous: string, current) {
        if (previous !== current) {
            if (previous) {
                this._renderer.removeClass(this._elementRef.nativeElement, this._hcClassify(previous));
            }
            this._renderer.addClass(this._elementRef.nativeElement, this._hcClassify(current));
        }
    }

    private _hcClassify(style: string): string {
        return `hc-${style}`;
    }

    private _updateErrorState() {
        const oldState = this._errorState;

        // TODO: this could be abstracted out as an @Input() if we need this to be configurable
        const newState = !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted))
        );

        if (oldState !== newState) {
            this._errorState = newState;
        }
    }

}
