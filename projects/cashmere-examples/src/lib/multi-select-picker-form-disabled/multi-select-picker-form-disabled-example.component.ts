import {Component, OnInit} from '@angular/core';
import {MultiSelectPickerChangeEvent} from '@wcf-insurance/cashmere';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'hc-multi-select-picker-form-disabled-example',
    templateUrl: './multi-select-picker-form-disabled-example.component.html',
    styleUrls: ['./multi-select-picker-form-disabled-example.component.scss']
})
export class MultiSelectPickerFormDisabledExampleComponent implements OnInit {

    elementValues: string[] = [
        'Helium',
        'Oxygen',
        'Boron',
        'Lead',
        'Iron'
    ];

    selectedElementValues: string[] = ['Hydrogen'];

    formGroup: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            elements: {value: this.selectedElementValues, disabled: true}
        });

        this.formGroup.valueChanges.subscribe((value) => {
            console.log('Value Change:', value);
        });
    }

    change(event: MultiSelectPickerChangeEvent<string>): void {
        console.log("basic example changed:", event);
    }
}

