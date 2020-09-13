import {Component, OnInit} from '@angular/core';

import {MultiSelectPickerChangeEvent} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-multi-select-picker-focus-example',
    templateUrl: './multi-select-picker-focus-example.component.html',
    styleUrls: ['./multi-select-picker-focus-example.component.scss']
})
export class MultiSelectPickerFocusExampleComponent implements OnInit {

    elementValues: string[] = [
        'Helium',
        'Oxygen',
        'Boron',
        'Lead',
        'Iron'
    ];

    selectedElementValues: string[] = ['Hydrogen'];

    constructor() {
    }

    ngOnInit() {}

    elementChange(event: MultiSelectPickerChangeEvent<string>): void {
        console.log("element changed:", event);
    }
    anotherElementChange(event: MultiSelectPickerChangeEvent<string>): void {
        console.log("another element changed:", event);
    }
}

