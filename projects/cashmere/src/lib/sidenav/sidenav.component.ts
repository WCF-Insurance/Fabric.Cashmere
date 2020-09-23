import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    QueryList,
    ViewChild
} from '@angular/core';
import {SidenavLinkComponent} from './sidenav-link/sidenav-link.component';
import {Drawer} from '../drawer/index';

/** The navbar is a wrapper that positions branding, navigation, and other elements in a concise header. */
@Component({
    selector: 'hc-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements AfterContentInit {

    @ViewChild('leftOverDrawer') drawer: Drawer;

    @Input() set mobileView(isMobileView: boolean) {
        this._mobileView = isMobileView;
        if (!isMobileView) {
            this.sidenavOpen = false;
        }
    }

    get mobileView() {
        return this._mobileView;
    }

    _mobileView = false;

    /** Display name of current user */
    @Input()
    user: IUser | null = null;

    readonly align = 'left';
    readonly mode = 'side';

    @HostBinding()
    tabindex = -1;

    @HostBinding('class.hc-sidenav')
    _sideNavClass = true;

    @Input()
    appName: string;

    /** Url to brand icon image file */
    @Input()
    brandIcon: string = 'https://www.wcf.com/wcf-ui/common/images/WCF-Logo.svg';

    /** Router link or URL triggered when home icon is clicked */
    @Input()
    homeUri: any[] | string = location.origin;

    /** Base URL to be used for logging in */
    @Input()
    loginUrl: string = '/login';

    /** Base URL to be used for logging out */
    @Input()
    logoutUrl: string = '/logout';

    /** Whether the logout url should append on a parameter to the current page. Default true */
    @Input()
    logoutReturnToCurrent = true;

    /** Whether the Sign In link should show in the sidenav when a valid user is not already signed in. Default false */
    @Input()
    showSignIn: boolean = false;

    /** Change positioning to absolute - mostly just for convenience of playing nice with example docs */
    @Input()
    absolutePosition: boolean = false;

    /** Contact phone number used in the bottom of the sidenav for Question/Comments */
    @Input()
    contactPhoneNumber: string;

    /** Whether the User Menu should contain all links or just the Sign Out link. Default true */
    @Input()
    userMenuLinks: boolean = true;

    /** Whether the User Menu should contain the Manage My Policy link. Default true */
    @Input()
    showManageMyPolicy: boolean = false;

    @ContentChildren(SidenavLinkComponent)
    _navLinks: QueryList<SidenavLinkComponent>;

    @ViewChild('navbar') navbarContent: ElementRef;

    sidenavOpen: boolean = false;

    ngAfterContentInit(): void {
        // Check all of the top level links for active state and expand as necessary
        this._navLinks.toArray().forEach(link => {
            link._setTopLevel(true);
            this._autoExpandSidenav(link);
        });

        // Listen for top level links being added/removed
        this._navLinks.changes.subscribe(() => {
            this._navLinks.toArray().forEach(link => {
                link._setTopLevel(true);
                this._autoExpandSidenav(link);
                // Subscribe to top level link children's events for when descendants are added/removed
                link._refreshChildren.subscribe(linkUpdated => this._autoExpandSidenav(linkUpdated));
            });
        });

        // Subscribe to top level link children's events for when descendants are added/removed
        this._navLinks.toArray().forEach(link => {
            link._refreshChildren.subscribe(linkUpdated => this._autoExpandSidenav(linkUpdated));
        });
    }

    private _autoExpandSidenav(link: SidenavLinkComponent) {
        if (link._topLevel && link._isActiveOrHasActiveChild()) {
            setTimeout(() => link._toggleChildren(null, true));
        }
    }

    _logout() {
        let url = this.logoutUrl;
        if (this.logoutReturnToCurrent) {
            url += `?service=${window.location.href}`;
        }
        window.location.href = url;
    }

    _login() {
        window.location.href = `${this.loginUrl}?service=${window.location.href}`;
    }

    get _mobileMenuIcon(): string {
        return this.sidenavOpen ? 'fa-times-circle' : 'fa-bars';
    }

    triggerSidenavToggle(event: any) {
        event.stopPropagation();
        this.toggleSidenav(event);
    }

    dismissSidenavWhenOpen(event: any) {
        if (this.sidenavOpen) {
            event.stopPropagation();
            this.toggleSidenav(event);
        }
    }

    /**
     * Toggles the sidenav state.
     *
     * NOTE: Private to force template to call other methods that will decide when to toggle and when to stopPropagation.
     * This method is strictly the how of toggling not the entry point.
     */
    private toggleSidenav(event) {
        this.drawer.toggle();
        this.sidenavOpen = !this.sidenavOpen;
    }

    homeUriIsRelative() {
        if (typeof this.homeUri !== 'string') {
            return true;
        }
        return !this.homeUri.startsWith('http');
    }
}

export interface IUser {
    name: string;
    avatar?: string;
}
