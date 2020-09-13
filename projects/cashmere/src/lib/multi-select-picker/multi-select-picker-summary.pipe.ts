import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'multiSelectPickerSummary'
})
export class MultiSelectPickerSummaryPipe implements PipeTransform {

    transform(values: any[], textResolverFunction: Function): any {
        if (values === undefined || (values && values.length === 0)) {
            return '0 items';
        }
        return values.reduce((accumulator, currentValue, currentIndex, array) => {
            let resolvedText = currentValue.payload;
            if (textResolverFunction) {
                resolvedText = textResolverFunction(currentValue.payload);
            }
            return `${accumulator}${resolvedText}${currentIndex < array.length - 1 ? ',' : ''} `;
        }, '');
    }

}
