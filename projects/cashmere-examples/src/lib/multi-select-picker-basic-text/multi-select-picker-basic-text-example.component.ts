import {Component} from '@angular/core';

import {MultiSelectPickerChangeEvent} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-multi-select-picker-basic-text-example',
    templateUrl: './multi-select-picker-basic-text-example.component.html',
    styleUrls: ['./multi-select-picker-basic-text-example.component.scss']
})
export class MultiSelectPickerBasicTextExampleComponent {

    elementValues: string[] = [
        'Helium',
        'Oxygen',
        'Boron',
        'Lead',
        'Iron'
    ];

    selectedElementValues: string[] = ['Hydrogen'];

    change(event: MultiSelectPickerChangeEvent<string>): void {
        console.log("basic example changed:", event);
    }
}

