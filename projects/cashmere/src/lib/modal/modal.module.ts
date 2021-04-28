import {ModalFooterComponent} from './modal-footer.component';
import {ModalWindowComponent} from './modal-window.component';
import {ModalOverlayComponent} from './modal-overlay.component';
import {ModalService} from './modal.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalHeaderComponent} from './modal-header.component';
import {ModalBodyComponent} from './modal-body.component';
import {ModalComponent} from './modal.component';
import {AlertModalComponent} from './alert-modal/alert-modal.component';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import {ButtonModule} from '../button/index';

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [
        ModalOverlayComponent,
        ModalWindowComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalComponent,
        AlertModalComponent,
        ConfirmationModalComponent
    ],
    entryComponents: [ModalOverlayComponent, ModalWindowComponent],
    exports: [
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalComponent,
        AlertModalComponent,
        ConfirmationModalComponent
    ],
    providers: [ModalService]
})
export class ModalModule {
}
