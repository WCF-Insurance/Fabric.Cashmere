import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    DoCheck,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {take} from 'rxjs/operators';
import * as Sugar from 'sugar';
import {v4 as uuidv4} from 'uuid';

import {HcFormControlComponent} from '../form-field/hc-form-control.component';
import {PickerItemDirective} from './picker-item.directive';
import {parseBooleanAttribute} from '../util';

/**
 * Describes a wrapper that is crucial for making the multi select picker component function.
 * This wrapper essentially allows for unique identification of an item via the uuid and
 * allows for an item's checked state to be tracked.
 *
 * The developer using this component probably doesn't care about this object but it is available if needed.
 */
export interface MultiSelectItem<T> {
    uuid?: string;
    payload: T;
    checked: boolean;
}

/**
 * The event class that holds the selected items when the state is saved.
 */
export class MultiSelectPickerChangeEvent<T> {
    constructor(
        public source: MultiSelectPickerComponent,
        public selectedValues: T[]
    ) {}
}

@Component({
    selector: 'hc-multi-select-picker',
    templateUrl: './multi-select-picker.component.html',
    styleUrls: ['./multi-select-picker.component.scss'],
    providers: [{provide: HcFormControlComponent, useExisting: forwardRef(() => MultiSelectPickerComponent)}]
})
export class MultiSelectPickerComponent extends HcFormControlComponent implements OnInit, AfterViewInit, DoCheck, ControlValueAccessor {

    /**
     * Specify a list of options that are not selected
     * @param values: any[]
     */
    @Input()
    set nonSelectedValues(values: any[]) {
        this._nonSelectedValues = values;
        if (values && values.length && this.selectedValues.length) {
        this.items = this.mergeValues(values, this.selectedValues);
    }
    }
    get nonSelectedValues() {
        return this._nonSelectedValues || [];
    }
    _nonSelectedValues: any[];

    /**
     * Specify a list of options that are selected. Must be a list of string, number, or objects.
     * If objects then read the usage guide on Custom Component rendering
     * @param values
     */
    @Input()
    set selectedValues(values: any[]) {
        this._selectedValues = values;
        if (values && values.length && this.nonSelectedValues.length) {
        this.items = this.mergeValues(this.nonSelectedValues, values);
    }
    }
    get selectedValues() {
        return this._selectedValues || [];
    }
    _selectedValues: any[];

    /**
     * If for some reason you want to configure both the selected and nonSelected items at the same time you can do so with this input.
     * Note you will need to wrap your each of your items in a MultiSelectItem object and mark the checked property if the item should
     * have a selected state.
     *
     * This is not likely the input you are looking for.
     * @param values
     */
    @Input()
    set items(values: MultiSelectItem<any>[]) {
        this._items = values.map((item) => {
            let uuidItem = {...item, uuid: uuidv4()};
            return Sugar.Object.clone(uuidItem, true) as MultiSelectItem<any>;
        });
        this._itemsCopy = this.items.map((item) => {
            return Sugar.Object.clone(item, true) as MultiSelectItem<any>;
        });
        this._selectedItems = this.items.filter((item) => item.checked);
        const rawSelectedValues = this._getRawValues(this._selectedItems);
        this._selectedItemsCommitted = [...this._selectedItems];
        this._filteredItems = this.items;
        this.onChange(rawSelectedValues); // TODO:ahunt change to emit raw values or emit raw values separately?
    }
    get items(): MultiSelectItem<any>[] {
        return this._items;
    }
    _items: MultiSelectItem<any>[] = [];
    _itemsCopy: MultiSelectItem<any>[] = [];

    /**
     * Configures the placeholder. Expects a string.
     * @param value
     */
    @Input()
    set placeholder(value: string) {
        this._placeholder = value;
    }
    get placeholder(): string {
        return this._placeholder;
    }
    _placeholder: string;

    /**
     * Specify a function to evaluate if items match a search term from the user
     * @param value
     */
    @Input()
    set filterResolver(value: (searchTerm: string, item: any) => boolean) {
        this._filterResolver = value;
    }
    get filterResolver(): (searchTerm: string, item: any) => boolean {
        return this._filterResolver;
    }
    _filterResolver: (searchTerm: string, item: any) => boolean;

    /**
     * Specify a function to evaluate if MultiSelectPicker items match a search term from the user. See items input for more info.
     *
     * This is not likely the input you are looking for.
     * @param value
     */
    @Input()
    set pickerItemFilterResolver(value: (searchTerm: string, item: MultiSelectItem<any>) => boolean) {
        this._pickerItemFilterResolver = value;
    }
    get pickerItemFilterResolver(): (searchTerm: string, item: MultiSelectItem<any>) => boolean {
        return this._pickerItemFilterResolver;
    }
    _pickerItemFilterResolver: (searchTerm: string, item: MultiSelectItem<any>) => boolean;

    /**
     * Specify if the control is required or not.
     */
    @Input()
    get required(): boolean {
        return this._isRequired;
    }
    set required(required) {
        this._isRequired = parseBooleanAttribute(required);
    }

    /**
     * Specify if the control is disabled or not.
     */
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

    /**
     * Provide a function to determine what text to show in the selection summary for each selected item.
     * @param resolver
     */
    @Input()
    set summaryTextItemResolver(resolver: Function) {
        this._summaryTextItemResolver = resolver;
    }
    get summaryTextItemResolver() {
        return this._summaryTextItemResolver;
    }
    _summaryTextItemResolver: Function;

    /**
     * Specify the max number of items that can be displayed in the selection summary before defaulting to a standard message like:
     * "Selected: 12 items"
     */
    @Input()
    maxSummaryItems: number;

    /**
     * Event listener for when a change has been commited by the user. If the user didn't click save it didn't happen!
     */
    @Output()
    change = new EventEmitter<MultiSelectPickerChangeEvent<any>>();

    // all items displayed in the picker are technically always filtered since we only show items this list.
    _filteredItems: MultiSelectItem<any>[];
    _inputActive = false;
    _pickerOverlayOpen = false;
    _templatePortal: TemplatePortal<any>;
    _overlayRef: OverlayRef;
    _selectedItems: MultiSelectItem<any>[];
    // helps the selection summary distinguish committed items vs temporarily selected items.
    _selectedItemsCommitted: MultiSelectItem<any>[];

    _form: NgForm | FormGroupDirective | null;

    @ViewChild('pickerMainControl', {static: false}) _pickerMainControl: ElementRef;
    @ViewChild('overlayContent', {static: false}) _overlayContent: TemplateRef<void>;
    @ContentChild(PickerItemDirective, {read: TemplateRef, static: false}) _listItemTemplate: PickerItemDirective;

    @HostBinding('tabindex') _tabindex = 0;

    @HostBinding('class.disabled') get _disabledClass() {
        return this.disabled;
    }

    @HostListener('keyup', ['$event'])
    _onKeyup(event) {
        let code = (event.keyCode ? event.keyCode : event.which);
        if (code === 9 && !this._pickerOverlayOpen) {
            this.open();
        }
    }

    constructor(
        private hostElement: ElementRef,
        private overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private cd: ChangeDetectorRef,
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

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this._templatePortal = new TemplatePortal(
            this._overlayContent,
            this._viewContainerRef
        );
    }

    /**
     * Control Value Accessor and related Methods i.e. Make this thing work as a form control
     */
    private onChange: (val: any) => void = () => {
    };
    private onTouched: () => void = () => {
    };

    /**
     * ControlValueAccessor method interface implementation
     * @param fn
     */
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    /**
     * ControlValueAccessor method interface implementation
     * @param fn
     */
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }
    /**
     * ControlValueAccessor method interface implementation
     * @param fn
     */
    writeValue(value: any[]) {
        this.selectedValues = value;
    }

    /**
     *  Need to check every cycle because we can't subscribe to form submissions
     */
    ngDoCheck(): void {
        if (this._ngControl) {
            this._updateErrorState();
        }
    }

    /**
     * Handles updating the error state when ngDoCheck fires.
     */
    private _updateErrorState() {
        const oldState = this._errorState;
        const newState = !!(
            this._ngControl &&
            this._ngControl.invalid &&
            (this._ngControl.touched || (this._form && this._form.submitted) || this._ngControl.errors !== null)
        );

        if (oldState !== newState) {
            this._errorState = newState;
        }
    }

    // TODO:ahunt might not be needed as ControlValueAccessor expects comp to save the given onTouched.
    //  Why are some components using this like slider but other like select are not?
    _markAsTouched() {
        if (this._ngControl) {
            const control = this._ngControl.control;
            if (control) {
                control.markAsTouched();
            }
        }
    }
    /**
     * End Control Value Accessor and related Methods
     */

    /**
     * Handles merging of unselected and selected options and returns a single list of MultiSelectItem<any> objects.
     *
     * This then is used by items setter method.
     * @param unSelectedOptions
     * @param selectedOptions
     */
    private mergeValues(unSelectedOptions: any[], selectedOptions: any[]): MultiSelectItem<any>[] {
        let unSelectedItems = new Array();
        if (unSelectedOptions) {
            unSelectedItems = unSelectedOptions.map((option) => {
                return {checked: false, payload: option};
            });
        }
        let selectedItems = new Array();
        if (selectedOptions) {
            selectedItems = selectedOptions.map((option) => {
                return {checked: true, payload: option};
            });
        }
        return [...selectedItems, ...unSelectedItems];
    }

    /**
     * Click handler
     *
     */
    _placeholderClicked(): void {
        this.open(true);
    }

    /**
     * Click handler
     *
     */
    _triggerClicked(): void {
        this.open();
    }

    /**
     * Click handler
     *
     */
    _popoverPlaceholderClicked(): void {
        this._showInput();
    }

    /**
     * Click handler
     *
     */
    _popoverTriggerClicked(): void {
        this._cancel();
    }

    /**
     * Handles opening the multi select picker popover.
     *
     * If show input is true then that will also be called.
     * This is needed in this order since we can't toggle showInput before the overlay is opened.
     * @param showInput
     */
    private open(showInput?: boolean): void {
        if (!this.disabled) {
            this.showPickerOverlay();
            if (this._showInput) {
                this._showInput();
            }
        }
    }

    /**
     * Handles the actual details of showing the picker overlay. Leverages Angular CDK _overlayRef service.
     */
    private showPickerOverlay(): void {
        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this._pickerMainControl)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'top'
                }
            ]);

        let overlaySettings: OverlayConfig = {
            maxHeight: '400px',
            width: this._pickerMainControl.nativeElement.offsetWidth,
            positionStrategy,
            panelClass: 'multi-select-picker-panel',
            disposeOnNavigation: true,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            hasBackdrop: true,
            backdropClass: 'clear-backdrop'
        };

        this._overlayRef = this.overlay.create(overlaySettings);

        // emits when an overlay is attached
        this._overlayRef.attachments().subscribe(() => {
            /**
             * setTimeout is needed to delay a cycle before setting state to open so that
             * the modal has time to open. There may be a better way, and honestly the subscription
             * that this lives in seemed like it should be enough but isn't.
             */
            setTimeout(() => {
                this._pickerOverlayOpen = true;
            }, 0);
        });
        this._overlayRef.attach(this._templatePortal);
        this._overlayRef.backdropClick().pipe(take(1)).subscribe(() => {
            this._cancel();
        });
    }

    /**
     * Handles closing the multi select picker overlay and cleans up.
     */
    private close(): void {
        this.hostElement.nativeElement.focus();
        this._pickerOverlayOpen = false;
        this._inputActive = false;
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._overlayRef.dispose();
        }
    }

    /**
     * Handles showing the textual search input in the popover
     *
     */
    private _showInput(): void {
        this._inputActive = true;
    }

    /**
     * Handles hiding the textual search input in the popover
     *
     */
    _hideInput(): void {
        this._inputActive = false;
    }

    /**
     * Dismisses the popover and resets all picker state to previous state prior to any changes in this latest opened session
     *
     */
    _cancel(): void {
        this.items = this._itemsCopy.map((item) => {
            return Sugar.Object.clone(item, true) as MultiSelectItem<any>;
        });
        this._filteredItems = this.items;
        this.close();
        this.cd.detectChanges();
        this.onTouched();
    }

    /**
     * Dismisses the poover and commits and emits selected picker state.
     *
     */
    _submit(): void {
        this._itemsCopy = this.items.map((item) => {
            return Sugar.Object.clone(item, true) as MultiSelectItem<any>;
        });
        this._selectedItems = this.items.filter((item) => item.checked);
        this._selectedItemsCommitted = [...this._selectedItems];
        this._filteredItems = this.items;
        const rawSelectedValues = this._getRawValues(this._selectedItems);
        this.onChange(rawSelectedValues); // TODO:ahunt convert to raw or provide alternate impl
        this.change.emit(new MultiSelectPickerChangeEvent<any>(this, rawSelectedValues));
        this.close();
    }

    /**
     * This allows the developer to not have to implement this function for basic searching of string or number lists.
     * @param filter
     * @param item
     */
    private defaultFilterResolver = (filter: string, item: MultiSelectItem<any>): boolean => {
        if (item && item.payload && typeof item.payload === 'string') {
            return item.payload.toLowerCase().includes(filter.toLowerCase());
        }
        return false;
    };

    /**
     * Handles input events from the search input
     * @param filter
     *
     */
    _input(filter: string) {
        if (filter === "") {
            this._filteredItems = this.items;
            return;
        }

        if (this._pickerItemFilterResolver) {
            // filter against the picker item that wraps raw payload value. This provides access to checked property among others.
            this._filteredItems = this.items.filter((item) => this.pickerItemFilterResolver(filter, item));
        } else if (this._filterResolver) {
            // filter against raw payload value
            this._filteredItems = this.items.filter((item) => this.filterResolver(filter, item.payload));
        } else {
            // filter against the default filter resolver. Assumes that the values are basic numbers or strings.
            this._filteredItems = this.items.filter((item) => this.defaultFilterResolver(filter, item));
        }
    }

    /**
     * Handles checkbox selection changes
     * @param item
     *
     */
    _itemCheckboxChange(item: MultiSelectItem<any>): void {

        if (!item.checked) {
            item.checked = true;
            this.addSelectedItem(item);
        } else {
            item.checked = false;
            this.removeSelectedItem(item);
        }
    }

    /**
     * Utility for cloning doing a deep clone of items.
     * @param items
     */
    private clone = items =>
        items.map(item => (Array.isArray(item) ? this.clone(item) : {...item}));

    /**
     * Adds an item to the selected state.
     * @param item
     */
    private addSelectedItem(item: MultiSelectItem<any>): void {
        if (item.uuid !== undefined) {
            this._selectedItems.push(item);
        }
    }

    /**
     * Removes and item from the selected state.
     * @param item
     */
    private removeSelectedItem(item: MultiSelectItem<any>): void {
        if (item.uuid !== undefined) {
            this._selectedItems = this._selectedItems.filter((currentItem) => currentItem.uuid !== item.uuid);
        }
    }

    /**
     * Utility to select the raw value / payload from a MultiSelectPicker Item.
     * The raw value or payload is the value the user actually cares about.
     *
     * @param source
     *
     */
    private _getRawValues(source: MultiSelectItem<any>[]): any[] {
        return source.map(item => item.payload);
    }
}
