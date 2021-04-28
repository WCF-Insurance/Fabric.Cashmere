import {Component} from '@angular/core';
import {ActiveModal} from '../active-modal';

@Component({
    selector: 'hc-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent {

    okLabel: string = 'OK';

    constructor(public activeModal: ActiveModal) {
        if (activeModal.data.okLabel) {
            this.okLabel = activeModal.data.okLabel;
        }
    }

    dismiss() {
        this.activeModal.dismiss();
    }
}
