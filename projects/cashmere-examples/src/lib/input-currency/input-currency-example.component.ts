import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

/**
 * @title Input with Currency Formatting
 */
@Component({
    selector: 'hc-input-currency-example',
    templateUrl: 'input-currency-example.component.html',
    styleUrls: ['input-currency-example.component.scss']
})
export class InputCurrencyExampleComponent {
    formDemoCurrency = new FormControl('', [Validators.required]);
    formDemoCurrencyNull = new FormControl(null, [Validators.required]);
    formDemoCurrencyInitStringVal = new FormControl('52000.23', [Validators.required]);
    formDemoCurrencyInitNumberVal = new FormControl(52000.23, [Validators.required]);
    formDemoCurrencyFormattedInitVal = new FormControl('52,000.23', [Validators.required]);
}
