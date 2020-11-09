import {Component, OnInit} from '@angular/core';

import {MultiSelectItem, MultiSelectPickerChangeEvent} from '@wcf-insurance/cashmere';
import {LocationInfo} from './location-info/location-info.model';

@Component({
    selector: 'hc-multi-select-picker-rich-component-example',
    templateUrl: './multi-select-picker-rich-component-example.component.html',
    styleUrls: ['./multi-select-picker-rich-component-example.component.scss']
})
export class MultiSelectPickerRichComponentExampleComponent {

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

    locationInfoPickerItemFilterForComponentExample(filter: string, item: MultiSelectItem<LocationInfo>): boolean {
        return (
            item.payload.building.title +
            item.payload.building.subtitle +
            item.payload.premises.title +
            item.payload.premises.subtitle
        ).toLowerCase().includes(filter.toLowerCase()) && !item.checked;
    }

    locationInfoResolverFunction(value: LocationInfo): string {
        return value.building.subtitle;
    }

    componentExampleChange(event: MultiSelectPickerChangeEvent<string>): void {
        console.log("component example changed:", event);
    }
}

