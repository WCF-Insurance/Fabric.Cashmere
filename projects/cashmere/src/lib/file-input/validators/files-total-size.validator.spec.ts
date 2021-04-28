import {FormControl, ValidatorFn} from '@angular/forms';
import {FileUpload} from '../file-upload';
import {filesTotalSizeValidator} from './files-total-size.validator';

describe('filesTotalSizeValidator', () => {
    describe('which allows files total up to 1MB', () => {
        const maxFileSize = 1024 * 1024;
        let validator: ValidatorFn;
        beforeEach(() => {
            validator = filesTotalSizeValidator(maxFileSize);
        });
        it(`should not return an error for file size 0 bytes`, () => {
            expect(validate(0, validator)).toBe(null);
        });
        it(`should not return an error for file size 1 byte`, () => {
            expect(validate(1, validator)).toBe(null);
        });
        it(`should not return an error for file size 1KB`, () => {
            expect(validate(1024, validator)).toBe(null);
        });
        it(`should not return an error for file size 1023KB`, () => {
            expect(validate((maxFileSize / 2) - 1, validator)).toBe(null);
        });
        it(`should not return an error for file size 1MB`, () => {
            expect(validate((maxFileSize / 2), validator)).toBe(null);
        });
        it(`should return an error for 1MB + 1 byte`, () => {
            expect(validate((maxFileSize / 2) + 1, validator)).toEqual({filesTotalSize: true});
        });

        describe('when no file is selected', () => {
            let formControl: FormControl;
            beforeEach(() => {
                formControl = ({value: undefined} as Partial<FormControl>) as FormControl;
            });
            it('should not return an error', () => {
                expect(validator(formControl)).toBe(null);
            });
        });
    });
});

function validate(size: number, validator: ValidatorFn) {
    const fileUploads: FileUpload[] = [
        {
            name: 'test.doc',
            lastModified: Date.now(),
            size: size,
            type: 'test'
        },
        {
            name: 'test2.doc',
            lastModified: Date.now(),
            size: size,
            type: 'test'
        }];
    const formControl = ({
        value: fileUploads
    } as Partial<FormControl>) as FormControl;
    return validator(formControl);
}
