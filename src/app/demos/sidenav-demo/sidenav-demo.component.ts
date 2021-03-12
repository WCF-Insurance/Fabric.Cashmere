import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {IUser} from '@wcf-insurance/cashmere';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {FormControl} from '@angular/forms';
import {ProgressBarComponent, ProgressItem, ProgressItemStatus} from '../../../../dist/cashmere';

@Component({
    selector: 'hc-sidenav-demo',
    templateUrl: 'sidenav-demo.component.html',
    styleUrls: ['sidenav-demo.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavDemoComponent implements OnInit {
    mobileView = false;
    user: IUser | null = {
        name: 'John Doe',
        // avatar: '/src/assets/avatar.jpg'
    };

    userName = new FormControl(this.user ? this.user.name : '');
    showSignIn = new FormControl(true);
    showManageMyPolicy = new FormControl(false);
    userMenuLinks = new FormControl(true);

    dummyContent: string[] = [];

    // variable to allow us to simulate a link be added later
    // based on an API call or something
    showActiveLink = false;
    showActiveLinkLater = false;
    showActiveLinkWayLater = false;


    // progress bar information
    currentSelectedItem: ProgressItem;
    progressItems: ProgressItem[] = [
        {id: 'company', title: 'Company', status: ProgressItemStatus.COMPLETE},
        {id: 'owners', title: 'Owners', status: ProgressItemStatus.INCOMPLETE},
        {id: 'general-info', title: 'General Info', status: ProgressItemStatus.INCOMPLETE, focused: true},
        {id: 'rating', title: 'Rating', status: ProgressItemStatus.INCOMPLETE},
        {id: 'losses', title: 'Losses', status: ProgressItemStatus.INCOMPLETE},
    ];

    constructor(public breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        this.breakpointObserver
            .observe(['(max-width: 768px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.mobileView = true;
                    console.log('Viewport is 768px or under!');
                } else {
                    this.mobileView = false;
                    console.log('Viewport is getting bigger!');
                }
            });

        // simulate the result of a network request causing
        // a new link to be displayed in the sidenav
        setTimeout(() => {
            this.showActiveLink = true;
        }, 1000);
        setTimeout(() => {
            this.showActiveLinkLater = true;
        }, 2000);
        setTimeout(() => {
            this.showActiveLinkWayLater = true;
        }, 3000);
    }

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
