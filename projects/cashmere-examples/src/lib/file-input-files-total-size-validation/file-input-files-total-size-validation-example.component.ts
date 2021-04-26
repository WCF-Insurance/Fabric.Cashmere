import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {filesTotalSizeValidator} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-file-input-files-total-size-validation-example',
    templateUrl: 'file-input-files-total-size-validation-example.component.html'
})
export class FileInputFilesTotalSizeValidationExampleComponent {
    readonly maxFilesTotalSizeBytes = 122880;
    formGroup = new FormGroup({
        uploads: new FormControl(null, [filesTotalSizeValidator(this.maxFilesTotalSizeBytes)])
    });
    submittedValue: any;

    onSubmit() {
        this.submittedValue = this.formGroup.value;
    }
}
