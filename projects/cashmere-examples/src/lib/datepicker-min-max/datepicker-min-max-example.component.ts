import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-min-max-example',
    templateUrl: './datepicker-min-max-example.component.html',
    styleUrls: ['./datepicker-min-max-example.component.scss']
})
export class DatepickerMinMaxExampleComponent implements OnInit {
    date1 = new Date();

    min = new Date();
    max = new Date();

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.min.setFullYear(this.min.getFullYear() - 1);
        this.max.setFullYear(this.max.getFullYear() + 1);

        this.form = this.fb.group({
            maxDateControl: ['', Validators.required]
        });
    }
}
