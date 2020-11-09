import {Component, OnInit} from '@angular/core';
import {MultiSelectPickerChangeEvent} from '@wcf-insurance/cashmere';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'hc-multi-select-picker-form-example',
    templateUrl: './multi-select-picker-form-example.component.html',
    styleUrls: ['./multi-select-picker-form-example.component.scss']
})
export class MultiSelectPickerFormExampleComponent implements OnInit {

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
            elements: [this.selectedElementValues, Validators.required]
        });

        this.formGroup.valueChanges.subscribe((value) => {
            console.log('Value Change:', value);
        });
    }

    basicExampleChange(event: MultiSelectPickerChangeEvent<string>): void {
        console.log("basic example changed:", event);
    }

    invalidateForms() {
        // this.standAloneControl.setErrors({incorrect: true}); // TODO Make a standalone control example
        this.formGroup.controls['elements'].setErrors({incorrect: true});
    }
}

