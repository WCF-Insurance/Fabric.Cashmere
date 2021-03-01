import {Component, ViewChild} from '@angular/core';
import {ProgressBarComponent, ProgressItem, ProgressItemStatus, ProgressBarSelectionMode} from '@wcf-insurance/cashmere';

@Component({
    selector: 'hc-progress-bar-selection-mode-example',
    templateUrl: './progress-bar-selection-mode-example.component.html',
    styleUrls: ['./progress-bar-selection-mode-example.component.scss']
})
export class ProgressBarSelectionModeExampleComponent {
    @ViewChild('progressBarComponent', {static: false}) progressBarComponent: ProgressBarComponent;
    progressBarCompleted = false;
    progressItems: ProgressItem[] = [
        {id: 'company', title: 'Company', status: ProgressItemStatus.COMPLETE},
        {id: 'owners', title: 'Owners', status: ProgressItemStatus.COMPLETE},
        {id: 'general-info', title: 'General Info', status: ProgressItemStatus.INCOMPLETE, focused: true},
        {id: 'rating', title: 'Rating', status: ProgressItemStatus.INCOMPLETE},
        {id: 'losses', title: 'Losses', status: ProgressItemStatus.INCOMPLETE},
    ];
    allowSkipAhead: false;
    progressBarHeight: number = 35;
    breakPoint: string = '1024';
    showMobile: boolean;
    selectionMode: ProgressBarSelectionMode = ProgressBarSelectionMode.INTERNAL;
    selectionModeEnum = ProgressBarSelectionMode;
    progressItemNavigationIsValid = true;

    /**
     * A handler attached to the progressItemClicked Output event will allow you an opportunity for validation logic
     * before letting the progress-bar select the clicked item. If not valid. Don't do anything.
     *
     * If there was ever the need to mark a progress item invalid at the step you could write another method in
     * the ProgressBarComponent and call it from here.
     */
    progressItemClicked(item: ProgressItem) {
        // simulate validation logic
        if (this.progressItemNavigationIsValid) {
            this.progressBarComponent.selectProgressItem(item, false);
        } else {
            // do nothing or whatever here...
        }
    }

    completeCurrent() {
        this.progressBarComponent.completeCurrent();
    }
}
