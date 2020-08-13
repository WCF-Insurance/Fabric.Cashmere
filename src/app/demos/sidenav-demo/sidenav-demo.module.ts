import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CashmereModule} from '../../shared/cashmere.module';
import {SidenavDemoComponent} from './sidenav-demo.component';
import {LayoutModule} from '@angular/cdk/layout';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [CommonModule, CashmereModule, BrowserAnimationsModule, LayoutModule, ReactiveFormsModule, RouterModule],
    declarations: [SidenavDemoComponent],
    entryComponents: [SidenavDemoComponent]
})
export class SidenavDemoModule {
}
