import {FormControl, ValidatorFn} from '@angular/forms';
import {FileUpload} from '../file-upload';

/**
 * validator which checks to make sure that the sum of all file sizes
 * does not exceed the maximum specified size
 * designed to work with a FormControl attached to a FileInputComponent
 * @param maxFilesTotalSizeBytes the maximum valid sum of all file sizes, in bytes
 */
export function filesTotalSizeValidator(maxFilesTotalSizeBytes: number): ValidatorFn {
    return (control: FormControl) => {
        const value: FileUpload[] = control.value || [];
        const totalSize = value.reduce((sum, upload) => sum + upload.size, 0);
        let hasError = totalSize > maxFilesTotalSizeBytes;
        return hasError ? {filesTotalSize: true} : null;
    };
}
