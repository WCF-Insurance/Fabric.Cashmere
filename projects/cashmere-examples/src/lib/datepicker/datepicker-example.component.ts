import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'hc-datepicker-example',
    templateUrl: './datepicker-example.component.html',
    styleUrls: ['datepicker-example.component.scss']
})
export class DatepickerExampleComponent implements OnInit {
    date = new Date(2010, 1, 1);
    time = new Date();
    dateTime = new Date("2010-01-01T20:15:00.00");

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            date: [this.date],
            time: [this.time],
            dateTime: [this.dateTime],
            hourCycle: [false]
        });
    }
}
