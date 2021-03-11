import {Component, ViewChild} from '@angular/core';
import {ProgressBarComponent, ProgressItem, ProgressItemStatus} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-progress-bar-example',
    templateUrl: './progress-bar-example.component.html',
    styleUrls: ['./progress-bar-example.component.scss']
})
export class ProgressBarExampleComponent {
    @ViewChild('progressBarComponent', {static: false}) progressBarComponent: ProgressBarComponent;
    currentSelectedItem: ProgressItem;
    progressBarCompleted = false;
    progressItems: ProgressItem[] = [
        {id: 'company', title: 'Company', status: ProgressItemStatus.COMPLETE},
        {id: 'owners', title: 'Owners', status: ProgressItemStatus.INCOMPLETE, focused: true},
        {id: 'general-info', title: 'General Info', status: ProgressItemStatus.INCOMPLETE},
        {id: 'rating', title: 'Rating', status: ProgressItemStatus.INCOMPLETE},
        {id: 'losses', title: 'Losses', status: ProgressItemStatus.INCOMPLETE},
    ];
    allowSkipAhead: false;
    progressBarHeight: number = 35;
    breakPoint: string = '1024';
    showMobile: boolean;

    selectedProgressItem(item: ProgressItem) {
        this.currentSelectedItem = item;
    }

    completeCurrent() {
        this.progressBarComponent.completeCurrent();
    }
}
