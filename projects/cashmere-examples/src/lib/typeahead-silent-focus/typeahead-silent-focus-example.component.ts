import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'hc-typeahead-silent-focus-example',
    templateUrl: './typeahead-silent-focus-example.component.html',
    styleUrls: ['./typeahead-silent-focus-example.component.scss']
})
export class TypeaheadSilentFocusExampleComponent implements OnInit {

    form: FormGroup;
    filteredData: string[] = [];
    typeaheadData = [
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

    filteredData2: string[] = [];
    typeaheadData2 = [
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

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            item: ['', Validators.required],
            item2: ['', Validators.required]
        });
    }

    filterData(term) {
        this.setValue(term);
        if (term) {
            this.filteredData = this.typeaheadData.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredData = this.typeaheadData;
        }
    }

    optionSelected(item) {
        this.setValue(item);
    }

    private setValue(item) {
        const control = this.form.get('item');
        if (control) {
            control.setValue(item);
        }
    }

    filterData2(term) {
        this.setValue2(term);
        if (term) {
            this.filteredData2 = this.typeaheadData2.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1);
        } else {
            this.filteredData2 = this.typeaheadData2;
        }
    }

    optionSelected2(item) {
        this.setValue2(item);
    }

    private setValue2(item) {
        const control = this.form.get('item2');
        if (control) {
            control.setValue(item);
        }
    }
}
