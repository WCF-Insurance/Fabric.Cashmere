import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-min-max-example',
    templateUrl: './datepicker-min-max-example.component.html',
    styleUrls: ['./datepicker-min-max-example.component.scss']
})
export class DatepickerMinMaxExampleComponent implements OnInit {
    min = new Date();
    max = new Date();
    now = new Date();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.min.setDate(this.min.getDate() - 3);
        this.max.setDate(this.max.getDate() + 3);

        this.form = this.fb.group({
            minMaxDate: [this.now],
            minDate: [this.now],
            maxDate: [this.now, Validators.required]
        });
    }
}
