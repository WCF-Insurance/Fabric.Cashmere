import {Component, OnInit, ViewChild} from '@angular/core';
import {DateRange, DateRangeOptions, PresetItem} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-date-range-duration-constricted-example',
    templateUrl: './date-range-duration-constricted-example.component.html',
    styleUrls: ['date-range-duration-constricted-example.component.scss']
})
export class DateRangeDurationConstrictedExampleComponent implements OnInit {
    range: DateRange = {fromDate: new Date(), toDate: new Date()};
    options: DateRangeOptions;
    presets: Array<PresetItem> = [];

    ngOnInit() {
        const today = new Date();
        const fromMin = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const fromMax = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60);

        this.options = {
            format: 'mediumDate',
            applyLabel: 'Apply',
            startDatePrefix: 'Effective Date',
            endDatePrefix: 'Expiration Date',
            periodDurationOptions: {
                lengthInDays: 365,
                minDate: fromMin,
                maxDate: fromMax
            }
        };
    }

    updateRange(range: DateRange) {
        this.range = range;
    }
}
