import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'hc-typeahead-title-multiple-example',
    templateUrl: './typeahead-title-multiple-example.component.html'
})
export class TypeaheadTitleMultipleExampleComponent implements OnInit {

    form: FormGroup;
    filteredStateData: string[] = [];
    typeaheadStateData = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia'
    ];

    filteredCityData: string[] = [];
    typeaheadCityData = [
        'City A',
        'City B',
        'City C',
        'City D'
    ];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            stateItem: ['Colorado'],
            cityItem: ['']
        });
    }

    filterStateData(term) {
        this.setStateValue(term);
        if (term) {
            this.filteredStateData = this.typeaheadStateData.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredStateData = this.typeaheadStateData;
        }
    }

    filterCityData(term) {
        this.setCityValue(term);
        if (term) {
            this.filteredCityData = this.typeaheadCityData.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredCityData = this.typeaheadCityData;
        }
    }

    stateSelected(item) {
        this.setStateValue(item);
        this.setCityValue(null);
    }

    citySelected(item) {
        this.setCityValue(item);
    }

    private setStateValue(item) {
        const control = this.form.get('stateItem');
        if (control) {
            control.setValue(item);
        }
    }

    private setCityValue(item) {
        const control = this.form.get('cityItem');
        if (control) {
            control.setValue(item);
        }
    }
}
