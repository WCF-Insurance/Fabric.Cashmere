import {CheckboxChangeEvent, HcModal, ModalOptions, ModalService} from '@wcf-insurance/cashmere';
import {Component, OnInit, TemplateRef} from '@angular/core';
import {ModalOverviewExampleModalComponent} from './modal-overview-example-modal.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * @title Modal overview
 */
@Component({
    selector: 'hc-modal-overview-example',
    templateUrl: 'modal-overview-example.component.html',
    styleUrls: ['modal-overview-example.component.scss']
})
export class ModalOverviewExampleComponent implements OnInit {
    result: any;
    form: FormGroup;

    constructor(private modalService: ModalService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            year: [[2019, 2018, 2017]],
            coverage: [''],
            location: ['', Validators.required]
        });

        this.form.valueChanges.subscribe((value) => {
            console.log(value);
        });
    }

    open() {
        let options: ModalOptions = {
            data: 'I got this data from the class that opened me',
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'lg'
        };
        let subModal: HcModal<ModalOverviewExampleModalComponent> = this.modalService.open(ModalOverviewExampleModalComponent, options);
        subModal.result.subscribe(res => (this.result = res));
    }

    openTemplate(content: TemplateRef<any>) {
        let options: ModalOptions = {
            data: 'I got this data from the class that opened me (Template version)'
        };
        this.modalService.open(content, options);
    }

    openFormModal(content: TemplateRef<any>) {
        let options: ModalOptions = {
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'md'
        };
        let subModal: HcModal<ModalOverviewExampleModalComponent> = this.modalService.open(content, options);
        subModal.result.subscribe(res => {
            this.result = res;
            alert(
                `
Form Value:
${JSON.stringify(this.form.value, null, 2)}
`
            );
        });
    }

    openContentModal(content: TemplateRef<any>) {
        let options: ModalOptions = {
            ignoreEscapeKey: true,
            ignoreOverlayClick: true,
            size: 'lg'
        };
        this.modalService.open(content, options);
    }

    yearClicked(event: CheckboxChangeEvent, itemId) {
        if (event.checked) {
            this.form.controls.year.setValue([...this.form.controls.year.value, itemId]);
        } else {
            this.form.controls.year.setValue([...this.form.controls.year.value.filter((item) => item !== itemId)]);
        }
    }
}
