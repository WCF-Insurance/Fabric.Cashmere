import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

/**
 * @title Disabled Checkbox
 */
@Component({
    selector: 'hc-checkbox-disabled-example',
    templateUrl: 'checkbox-disabled-example.component.html'
})
export class CheckboxDisabledExampleComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            checkbox: [false]
        });

        this.form.controls.checkbox.disable();
    }
}
