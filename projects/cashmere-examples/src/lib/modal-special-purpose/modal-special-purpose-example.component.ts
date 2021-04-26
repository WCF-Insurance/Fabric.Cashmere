import {AlertModalComponent, ConfirmationModalComponent, HcModal, ModalOptions, ModalService} from '@wcf-insurance/cashmere';
import {Component} from '@angular/core';

/**
 * @title Special Purpose Modals
 */
@Component({
    selector: 'hc-modal-special-purpose-example',
    templateUrl: 'modal-special-purpose-example.component.html',
    styleUrls: ['modal-special-purpose-example.component.scss']
})
export class ModalSpecialPurposeExampleComponent {

    constructor(private modalService: ModalService) {
    }

    openAlert() {
        let options: ModalOptions = {
            data: {
                heading: 'Alert Modal',
                message: 'This is an alert modal. You can have a custom "heading" above and a custom "message" here. You can even customize the "okLabel" on the button. And you can give it an "itemList" as seen below.',
                itemList: ['Item #1', 'Item #2'],
                okLabel: 'Go Away'
            },
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'md'
        };
        let subModal: HcModal<AlertModalComponent> = this.modalService.open(AlertModalComponent, options);
        subModal.result.subscribe(res => console.log(res));
    }

    openConfirmation() {
        let options: ModalOptions = {
            data: {
                heading: 'Are You Sure?',
                message: 'This is a confirmation modal. You can have a custom "heading" above and a custom "message" here. You can even customize the "cancelLabel" and the "okLabel" for the buttons.',
                cancelLabel: 'No Way',
                okLabel: 'Go For It'
            },
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'md'
        };
        let subModal: HcModal<ConfirmationModalComponent> = this.modalService.open(ConfirmationModalComponent, options);
        subModal.result.subscribe(res => console.log(res));
    }
}
