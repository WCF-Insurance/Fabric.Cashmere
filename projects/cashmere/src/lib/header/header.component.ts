import {Component, Input} from '@angular/core';
import {IUser} from '../sidenav';

@Component({
    selector: 'hc-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    /** Display name of current user */
    @Input()
    user: IUser | null = null;

    /** Url to brand icon image file */
    @Input()
    brandIcon: string = 'https://www.wcf.com/wcf-ui/common/images/WCF-Logo.svg';

    /** Router link triggered when home icon is clicked */
    @Input()
    homeUri: any[] | string = '';

    /** Base URL to be used for logging out */
    @Input()
    logoutUrl: string;

    /** Whether the logout url should append on a parameter to the current page. Default true */
    @Input()
    logoutReturnToCurrent = true;

    _logout() {
        let url = this.logoutUrl;
        if (this.logoutReturnToCurrent) {
            url += `?service=${window.location.href}`;
        }
        window.location.href = url;
    }

    homeUriIsRelative() {
        if (typeof this.homeUri !== 'string') {
            return true;
        }
        return !this.homeUri.startsWith('http');
    }
}
