import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

/**
 * @title Standard Select Component using objects for values
 */
@Component({
    selector: 'hc-select-object-example',
    templateUrl: 'select-object-example.component.html',
    styleUrls: ['select-object-example.component.scss']
})
export class SelectObjectExampleComponent implements OnInit {
    numbers = [
        {id: 1, description: 'one'},
        {id: 2, description: 'two'},
        {id: 3, description: 'three'},
        {id: 4, description: 'four'},
        {id: 5, description: 'five'},
        {id: 6, description: 'six'},
        {id: 7, description: 'seven'},
        {id: 8, description: 'eight'},
        {id: 9, description: 'nine'},
        {id: 10, description: 'ten'}
    ];

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            selectedNumber: [this.numbers[2]]
        });
    }
}
