import {NgModule} from '@angular/core';
import {ModalSpecialPurposeExampleComponent} from './modal-special-purpose-example.component';
import {CashmereModule} from '../cashmere.module';
import {AlertModalComponent, ConfirmationModalComponent} from '@wcf-insurance/cashmere';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, CashmereModule],
    declarations: [ModalSpecialPurposeExampleComponent],
    entryComponents: [AlertModalComponent, ConfirmationModalComponent, ModalSpecialPurposeExampleComponent]
})
export class ModalSpecialPurposeExampleModule {
}
