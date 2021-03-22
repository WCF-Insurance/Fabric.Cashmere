import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProgressItem} from './progress-item.interface';
import {ProgressItemStatus} from './progress-item-status';
import {ProgressBarSelectionMode} from './progress-bar-selection-mode';

import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
    selector: 'hc-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
    @Input() allowSkipAhead: boolean = true;
    @Input() height: string;
    @Input() breakPoint: string = '768';
    @Input() selectionMode: ProgressBarSelectionMode = ProgressBarSelectionMode.INTERNAL;

    /**
     * Control whether the main color is $wcf-red (primary) or $wcf-blue (secondary). Default is primary.
     */
    @Input() progressBarStyle: string = 'primary';

    _fillColor = '#ba160a';

    private _showMobile: boolean = false;
    get showMobile() {
        return this._showMobile;
    }

    @Input() set showMobile(bool: boolean) {
        this._showMobile = bool;
    }

    private _items: ProgressItem[] = [];
    get items(): ProgressItem[] {
        return this._items;
    }

    @Input() set items(itemsList: ProgressItem[]) {
        if (itemsList && itemsList.length) {
            this._items = itemsList;
            const focusedIndex = this.findFocusedIndexFromItems(itemsList);

            if (focusedIndex > -1) {
                this.selectProgressItem(itemsList[focusedIndex], true);
            }
            else {
                this.selectProgressItem(itemsList[0], true);
            }
        } else {
            this._items = [];
        }
    }

    @Output() progressItemClicked = new EventEmitter<ProgressItem>();
    @Output() progressItemSelected = new EventEmitter<ProgressItem>();
    @Output() progressBarCompleted = new EventEmitter<boolean>();
    currentSelectedItem: ProgressItem;
    allItemsCompleted: boolean;
    dropdownVisible: boolean = false;

    // add enum to a component variable so it can be referenced in the template
    ProgressItemStatus = ProgressItemStatus;

    constructor(public breakpointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        this.breakpointObserver
            .observe(['(max-width:' + this.breakPoint + 'px)'])
            .subscribe((state: BreakpointState) => {
                this.showMobile = state.matches;
            });

        this._fillColor = this.progressBarStyle === 'primary' ? '#ba160a' : '#406181';
    }

    /**
     * Finds the index of the focused item in the given array
     * @param items
     */
    findFocusedIndexFromItems(items: ProgressItem[]): number {
        let greatestIndex = -1;
        items.forEach((item, index) => {
            if (item.focused === true) {
                greatestIndex = index;
            }
        });
        return greatestIndex;
    }

    /**
     * Determines which item should be selected. Prefers the item after the last item to have been completed.
     */
    getNextItemToSelectFromItems(items: ProgressItem[], greatestCompletedItemIndex: number): ProgressItem {
        return greatestCompletedItemIndex < items.length - 1
            ? items[greatestCompletedItemIndex + 1] // get the first uncompleted item
            : items[greatestCompletedItemIndex]; // last completed is the last item left
    }

    selectProgressItem(itemToSelect: ProgressItem, emit = false): void {
        // TODO logic could be placed here to determine if navigation to this step is allowed by consuming component
        let previouslySelectedItem = this.currentSelectedItem;
        // Update progressItem entries to have proper focus
        let beforeSelected = true;
        this._items = this._items.map(item => {
            // Set clicked item as focused
            if (item.id === itemToSelect.id) {
                beforeSelected = false;
                this.currentSelectedItem = {...itemToSelect, focused: true};
                return this.currentSelectedItem;
            }

            // toggle whether the item should be red or not
            if (beforeSelected) {
                item.beforeSelected = true;
            } else {
                delete item.beforeSelected;
            }

            // unset focus on previously selected item
            if (previouslySelectedItem && item.id === previouslySelectedItem.id) {
                delete item.focused;
                return {...item};
            }
            // no change on other items
            return item;
        });
        if (emit) {
            this.progressItemSelected.emit(this.currentSelectedItem);
        }
    }

    /**
     * Mark the current item as completed and select the next uncompleted item
     */
    completeCurrent(): void {
        if (this.currentSelectedItem.status === ProgressItemStatus.COMPLETE) {
            return; // can't complete an already completed item
        }
        let nextUncompletedItem;
        let index = -1;
        let currentIndex = 0;
        this._items = this._items.map(item => {
            index++;
            let itemToReturn = item;
            if (item.id === this.currentSelectedItem.id) {
                itemToReturn = {...this.currentSelectedItem, status: ProgressItemStatus.COMPLETE};
                currentIndex = index;
            } else if (!nextUncompletedItem && item.status === ProgressItemStatus.INCOMPLETE) {
                nextUncompletedItem = item;
            }
            return itemToReturn;
        });
        if (currentIndex < this._items.length - 1) {
            this.selectProgressItem(this._items[currentIndex + 1], true);
        } else {
            this.allItemsCompleted = true;
            this.progressBarCompleted.emit(true);
        }
    }

    /**
     * Handles the user clicking a progress Item.
     *
     * Ensures that the clicked item can be navigated to and also checks which seletion strategy (INTERNAL, EXTERNAL) should be used.
     *
     * INTERNAL: handles the selection all internally and then notifies (emits) the selection event.
     *
     * EXTERNAL: only handles the click event by emitting a notification of which item was clicked. This allows the consuming application to
     * run validation or other logic and then can signal the ProgressBarComponent to select the item by using via @ViewChild and invoking
     * <viewChildRefName>.selectProgressItem(item)
     */
    itemClicked(item: ProgressItem): void {
        if (this._canNavigateTo(item)) {
            switch (this.selectionMode) {
                case ProgressBarSelectionMode.INTERNAL:
                    this.selectProgressItem(item, true);
                    this.dropdownVisible = false;
                    break;
                case ProgressBarSelectionMode.EXTERNAL:
                    this.progressItemClicked.emit(item);
            }
        }
    }

    previousItem(): void {
        let itemIndex = this._items.indexOf(this.currentSelectedItem);
        if (itemIndex > 0) {
            this.selectProgressItem(this._items[itemIndex - 1], true);
        }
        this.dropdownVisible = false;
    }

    nextItem(): void {
        let itemIndex = this._items.indexOf(this.currentSelectedItem);
        if (itemIndex < this._items.length && this._canNavigateToNextItem()) {
            this.selectProgressItem(this._items[itemIndex + 1], true);
        }
        this.dropdownVisible = false;
    }

    toggleItemDropdown(): void {
        this.dropdownVisible = !this.dropdownVisible;
    }

    _canNavigateTo(item: ProgressItem): boolean {
        if (item) {
            return item.focused || item.beforeSelected || this.allowSkipAhead || this._predecessorComplete(item);
        }
        return false;
    }

    _canNavigateToNextItem(): boolean {
        return this._canNavigateTo(this._items[this._items.indexOf(this.currentSelectedItem) + 1]);
    }

    _canNavigateToPreviousItem(): boolean {
        let itemIndex = this._items.indexOf(this.currentSelectedItem);
        if (itemIndex === 0) {
            return false;
        }
        return true;
    }

    private _predecessorComplete(item: ProgressItem) {
        const index = this.items.findIndex(it => it.id === item.id);
        if (this.items[index - 1].status === ProgressItemStatus.COMPLETE) {
            return true;
        }
        return false;
    }
}
