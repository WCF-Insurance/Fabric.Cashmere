import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnInit} from '@angular/core';

/**
 * @title Disabled Radio Buttons
 */
@Component({
    selector: 'hc-radio-button-disabled-example',
    templateUrl: 'radio-button-disabled-example.component.html'
})
export class RadioButtonDisabledExampleComponent implements OnInit {
    form: FormGroup;
    formDelay: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            gender: [2, Validators.required]
        });

        this.formDelay = this.formBuilder.group({
            gender: [1, Validators.required]
        });

        this.form.disable();

        setTimeout(() => {
            this.formDelay.disable();
        }, 2);

    }
}
