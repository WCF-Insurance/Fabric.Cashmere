import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    QueryList,
    Renderer2,
    ViewChild
} from '@angular/core';
import {Router} from '@angular/router';

/** Primary navigation links */
@Component({
    selector: 'hc-sidenav-link',
    templateUrl: 'sidenav-link.component.html',
    styleUrls: ['sidenav-link.component.scss']
})
export class SidenavLinkComponent implements AfterContentInit {
    /** RouterLink uri. See https://angular.io/api/router/RouterLink. */
    /** If you use the array syntax, the first path segment must begin with '/' and none of the other segments should begin with a '/'. */
    @Input()
    routerLink?: any[] | string;

    /** RouterLink uri. See https://angular.io/api/router/RouterLink */
    @Input()
    uri?: string;

    /** The Font Awesome icon to display to the left of the link */
    @Input()
    fontIcon?: string;

    /** The text to display */
    @Input()
    linkText: string;

    // non-top level links emit this when their children change
    @Output()
    _childrenChanged: EventEmitter<SidenavLinkComponent> = new EventEmitter<SidenavLinkComponent>();

    // top level links emit this when any of their descendants have changed
    @Output()
    _refreshChildren: EventEmitter<SidenavLinkComponent> = new EventEmitter<SidenavLinkComponent>();

    @HostBinding('style.position') position = 'relative';
    @HostBinding('style.display') display = 'block';

    @ViewChild('toggle') _resultToggle: ElementRef;

    private _linkChildren;
    _childrenShown: boolean = false;

    // indicate if this is a top-level link (it's parent is the sidenav component)
    _topLevel = false;

    @ContentChildren(SidenavLinkComponent)
    private _children?: QueryList<SidenavLinkComponent>;

    constructor(private renderer: Renderer2, private router: Router) {
    }

    ngAfterContentInit() {
        if (this._children) {
            // Listen for direct children being added/removed
            this._children.changes.subscribe(() => {
                this._childrenChangeDetected();
                this._subscribeToChildrenChanges();
            });

            this._subscribeToChildrenChanges();
        }
    }

    // Subscribe to children's events for when the child has children added/removed
    private _subscribeToChildrenChanges() {
        if (this._children) {
            this._children.toArray().forEach(child => {
                // The ContentChildren selector also finds the component
                // itself since it is the same component type. We want to ignore
                // it or else we will end up in an infinite loop.
                if (this !== child) {
                    child._childrenChanged.subscribe(link => {
                        this._childrenChangeDetected();
                    });
                }
            });
        }
    }

    private _childrenChangeDetected() {
        if (this._topLevel) {
            this._refreshChildren.emit(this);
        } else {
            this._childrenChanged.emit(this);
        }
    }

    _isActiveOrHasActiveChild(): boolean {
        const routerLinkString = this._convertRouterLinkToString(this.routerLink);
        if (this.router.url === routerLinkString) {
            return true;
        }

        if (this._children) {
            return this._children.toArray().some(child => {
                // The ContentChildren selector also finds the component
                // itself since it is the same component type. We want to ignore
                // it or else we will end up in an infinite loop.
                if (child !== this) {
                    return child._isActiveOrHasActiveChild();
                }

                return false;
            });
        }

        return false;
    }

    _convertRouterLinkToString(routerLink: any[] | string | undefined) {
        if (typeof this.routerLink === 'object') {
            return (routerLink as any[]).join('/');
        }
        return routerLink;
    }

    get children() {
        if (!this._children) {
            return;
        }
        // Check to see if link children exist
        this._linkChildren = this._children.filter(c => c !== this);
        return this._linkChildren;
    }

    _toggleChildren(expanded?: boolean) {
        this._childrenShown = expanded || !this._childrenShown;

        if (this._resultToggle) {
            if (this._childrenShown) {
                this.renderer.addClass(this._resultToggle.nativeElement, 'flip-around');
            } else {
                this.renderer.removeClass(this._resultToggle.nativeElement, 'flip-around');
            }
        }
    }

    _stop(event: Event) {
        event.stopPropagation();
    }

    _setTopLevel(value: boolean) {
        this._topLevel = value;
    }

}
