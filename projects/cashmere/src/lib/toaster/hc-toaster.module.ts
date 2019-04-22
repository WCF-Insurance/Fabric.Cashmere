import {HcToastComponent} from './hc-toast.component';
import {HcToasterService} from './hc-toaster.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortalModule} from '@angular/cdk/portal';

@NgModule({
    imports: [CommonModule, PortalModule],
    exports: [HcToastComponent],
    declarations: [HcToastComponent],
    providers: [HcToasterService],
    entryComponents: [HcToastComponent]
})
export class ToasterModule {}
