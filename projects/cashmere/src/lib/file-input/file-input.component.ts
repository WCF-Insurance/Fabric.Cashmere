import {Component, DoCheck, ElementRef, forwardRef, Input, OnDestroy, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {fromEvent, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {HcFormControlComponent} from '../form-field/index';
import {FileUpload} from './file-upload';
import {FileReaderFactory} from './file-reader-factory.service';

@Component({
    selector: 'hc-file-input',
    templateUrl: 'file-input.component.html',
    styleUrls: ['file-input.component.scss'],
    providers: [
        {
            provide: HcFormControlComponent,
            useExisting: forwardRef(() => FileInputComponent)
        }
    ]
})
export class FileInputComponent extends HcFormControlComponent implements ControlValueAccessor, OnDestroy, DoCheck {
    @Input()
    disabled: boolean = false;

    /**
     * The `accept` value to use on the HTML `input` element
     * > W3C recommends authors to specify both MIME-types and corresponding extensions in the accept attribute.
     * see https://stackoverflow.com/a/23706177/1396477
     * @example '.xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'
     */
    @Input()
    accept: string = '*';

    /** Custom label to be displayed on the button. Default: Upload file */
    @Input()
    label: string = 'Upload file';

    /** Custom buttonStyle to be used on the button. See Button component for valid buttonStyles. Default: secondary */
    @Input()
    buttonStyle: string = 'secondary';

    /** Custom color for the Chip after a file has been selected. See Chip component for valid colors. Default: neutral */
    @Input()
    chipColor: string = 'neutral';

    /** Whether the chips that represent the uploaded files should be stacked or wrapped. Default: wrapped */
    @Input()
    stackedUploads: boolean = false;

    @ViewChild('fileInput', {static: false})
    _fileInput: ElementRef<HTMLInputElement>;

    private readonly onDestroy: Subject<void> = new Subject<void>();

    private _value: FileUpload[] | null = null;
    @Input()
    get value(): FileUpload[] | null {
        return this._value;
    }

    set value(value: FileUpload[] | null) {
        if (this.value !== value) {
            this.writeValue(value);
            this.onChange(value);
        }
    }

    private _form: NgForm | FormGroupDirective;

    constructor(
        private _fileReaderFactory: FileReaderFactory,
        @Optional()
        @Self()
        public _ngControl: NgControl,
        @Optional()
            form: NgForm,
        @Optional()
            formGroup: FormGroupDirective
    ) {
        super();
        this._form = form || formGroup;

        if (this._ngControl != null) {
            this._ngControl.valueAccessor = this;
        }
    }

    ngOnDestroy() {
        this.onDestroy.next();
        this.onDestroy.complete();
    }

    ngDoCheck(): void {
        // This needs to be checked every cycle because we can't subscribe to form submissions
        if (this._ngControl) {
            this._updateErrorState();
        }
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

    _onClick() {
        this._fileInput.nativeElement.click();
    }

    _deleteFile(file: FileUpload) {
        if (this.value) {
            const index = this.value.findIndex(f => f.base64 === file.base64);
            if (index > -1) {
                let tempList = [...this.value];
                tempList.splice(index, 1);
                this.value = tempList.length > 0 ? tempList : null;
            }
        }
    }

    _onFileSelected() {
        const file: File = this._fileInput.nativeElement.files![0];
        this._fileInput.nativeElement.value = '';
        if (!file) {
            return;
        }

        const newFileUpload = new FileUpload();
        newFileUpload.name = file.name;
        newFileUpload.size = file.size;
        newFileUpload.type = file.type;
        newFileUpload.lastModified = file.lastModified;

        const tempList = this.value ? [...this.value] : [];
        tempList.push(newFileUpload);
        this.value = tempList;

        const reader = this._fileReaderFactory.create();
        fromEvent(reader, 'load')
            .pipe(
                takeUntil(this.onDestroy),
                map(() => reader.result!.toString())
            )
            .subscribe(v => (newFileUpload.base64 = v));

        reader.readAsDataURL(file);

        this.onTouched();
    }

    _onBlur() {
        this.onTouched();
    }

    writeValue(value: FileUpload[] | null): void {
        if (value !== undefined) {
            this._value = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private onChange(_: FileUpload[] | null) {
        /* placeholder - overwritten by registerOnChange, called by Angular */
    }

    private onTouched() {
        /* placeholder - overwritten by registerOnTouched, called by Angular */
    }
}
