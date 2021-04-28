import {FormControl, ValidatorFn} from '@angular/forms';
import {FileUpload} from '../file-upload';

/**
 * validator which checks to make sure that the file has one of the
 * specified extensions
 * designed to work with a FormControl attached to a FileInputComponent
 * @param allowedExtensions an array of allowed file extensions, i.e. ['jpg']
 */
export function fileTypeValidator(allowedExtensions: string[]): ValidatorFn {
    return (control: FormControl) => {
        if (!control.value || control.value.length < 1) {
            return null;
        }

        let hasError = false;
        const value: FileUpload[] = control.value;
        value.forEach(upload => {
            const extension: string = ((upload.name || '').split(/\./g).reverse()[0] || '').toLowerCase();
            if (allowedExtensions.length && !allowedExtensions.includes(extension)) {
                hasError = true;
            }
        });

        return hasError ? {fileType: true} : null;
    };
}
