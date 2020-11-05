import {Component, OnInit} from '@angular/core';

import {
    MultiSelectPickerChangeEvent
} from '@wcf-insurance/cashmere';
import {LocationInfo} from './location-info/location-info.component';

@Component({
    selector: 'hc-multi-select-picker-rich-template-example',
    templateUrl: './multi-select-picker-rich-template-example.component.html',
    styleUrls: ['./multi-select-picker-rich-template-example.component.scss']
})
export class MultiSelectPickerRichTemplateExampleComponent implements OnInit {

    locationValues: LocationInfo[] = [
        {
            premises: {
                title: 'Premises 1',
                subtitle: 'Main Complex'
            },
            building: {
                title: 'Building 2',
                subtitle: 'Warehouse'
            },
            address: '1234 Cow St Ste 2'
        },
        {
            premises: {
                title: 'Premises 2',
                subtitle: 'Warehouse'
            },
            building: {
                title: 'Building 1',
                subtitle: 'Main Building'
            },
            address: '1234 Cow St Ste 1'
        }
    ];

    selectedLocationValues: LocationInfo[] = [
        {
            premises: {
                title: 'Premises 1',
                subtitle: 'Main Complex'
            },
            building: {
                title: 'Building 1',
                subtitle: 'Main Building'
            },
            address: '1234 Cow St Ste 1'
        }
    ];

    constructor() {}

    ngOnInit() {}

    locationInfoFilterForTemplateExample(filter: string, item: LocationInfo): boolean {
        return (
            item.building.title +
            item.building.subtitle
        ).toLowerCase().includes(filter.toLowerCase());
    }

    locationInfoResolverFunction(value: LocationInfo): string {
        return value.building.subtitle;
    }

    templateItemsExampleChange(event: MultiSelectPickerChangeEvent<string>): void {
        console.log("template example changed:", event);
    }
}

