import {Component, ViewEncapsulation, TemplateRef, ViewChild} from '@angular/core';

/** Contains the HTML markup for tab titles */
@Component({
    selector: 'hc-wcf-tab-title',
    template: '<ng-template #wcfTabTitle><ng-content></ng-content></ng-template>',
    encapsulation: ViewEncapsulation.None
})
export class HcWcfTabTitleComponent {
    @ViewChild('wcfTabTitle', {static: false})
    public wcfTabTitle: TemplateRef<any>;
}
