import {Component} from '@angular/core';
import {ActiveModal} from '../active-modal';

@Component({
    selector: 'hc-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

    cancelLabel: string = 'Cancel';
    okLabel: string = 'OK';

    constructor(public activeModal: ActiveModal) {
        if (activeModal.data.cancelLabel) {
            this.cancelLabel = activeModal.data.cancelLabel;
        }

        if (activeModal.data.okLabel) {
            this.okLabel = activeModal.data.okLabel;
        }
    }

    cancel() {
        this.activeModal.dismiss();
    }

    close() {
        this.activeModal.close(true);
    }
}
