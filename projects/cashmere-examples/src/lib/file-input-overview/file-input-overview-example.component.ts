import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'hc-file-input-overview-example',
    templateUrl: 'file-input-overview-example.component.html',
    styleUrls: ['file-input-overview-example.component.scss']
})
export class FileInputOverviewExampleComponent {
    formGroup = new FormGroup({
        uploads: new FormControl(null, Validators.required),
        stacked: new FormControl()
    });
    submittedValue: any;

    onSubmit() {
        this.submittedValue = this.formGroup.value;
    }
}
