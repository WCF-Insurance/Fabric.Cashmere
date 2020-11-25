import {EventEmitter} from '@angular/core';

export class SidenavService {
    navClick: EventEmitter<number> = new EventEmitter();

    emitNavClickEvent(e) {
        this.navClick.emit(e);
    }
}
