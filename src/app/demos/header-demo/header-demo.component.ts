import {Component} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';
import {FormControl} from '@angular/forms';
import {ProgressItem, ProgressItemStatus} from '../../../../dist/cashmere';

@Component({
    selector: 'hc-header-demo',
    templateUrl: 'header-demo.component.html',
    styleUrls: ['header-demo.component.scss']
})
export class HeaderDemoComponent {
    user: IUser|null = {
        name: 'John Doe',
        // avatar: '/src/assets/avatar.jpg'
    };

    userName = new FormControl(this.user ? this.user.name : '');
    showSignIn = new FormControl(true);
    showManageMyPolicy = new FormControl(false);
    userMenuLinks = new FormControl(true);

    dummyContent: string[] = [];

    // progress bar information
    currentSelectedItem: ProgressItem;
    progressItems: ProgressItem[] = [
        {id: 'company', title: 'Company', status: ProgressItemStatus.COMPLETE},
        {id: 'owners', title: 'Owners', status: ProgressItemStatus.INCOMPLETE},
        {id: 'general-info', title: 'General Info', status: ProgressItemStatus.INCOMPLETE, focused: true},
        {id: 'rating', title: 'Rating', status: ProgressItemStatus.INCOMPLETE},
        {id: 'losses', title: 'Losses', status: ProgressItemStatus.INCOMPLETE},
    ];

    addDummyContent() {
        for (let i = 0; i < 50; i++) {
            this.dummyContent.push(`Content ${i + 1}`);
        }
    }

    removeDummyContent() {
        this.dummyContent = [];
    }

    changeUsername() {
        if (this.userName.value) {
            this.user = {
                name: this.userName.value
            };
        } else {
            this.user = null;
        }
    }

    selectedProgressItem(item: ProgressItem) {
        this.currentSelectedItem = item;
    }
}
