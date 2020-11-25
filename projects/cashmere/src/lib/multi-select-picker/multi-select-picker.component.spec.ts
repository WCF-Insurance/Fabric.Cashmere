import {Overlay, OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ButtonModule} from '../button/button.module';
import {CheckboxModule} from '../checkbox/checkbox.module';
import {FormFieldModule} from '../form-field/hc-form-field.module';
import {ListModule} from '../list/list.module';

import {AutofocusDirective} from './autofocus-directive';
import {MultiSelectPickerComponent} from './multi-select-picker.component';
import {MultiSelectPickerSummaryPipe} from './multi-select-picker-summary.pipe';
import {PickerItemDirective} from './picker-item.directive';

describe('MultiSelectPickerComponent', () => {
    let component: MultiSelectPickerComponent;
    let fixture: ComponentFixture<MultiSelectPickerComponent>;
    const overlayMock = {
        create: () => {
        },
        scrollStrategies: {
            reposition: () => {
            }
        },
        position: () => {
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ButtonModule,
                BrowserModule,
                BrowserAnimationsModule,
                CheckboxModule,
                FormFieldModule,
                ListModule,
                OverlayModule,
                PortalModule
            ],
            declarations: [MultiSelectPickerComponent, AutofocusDirective, PickerItemDirective, MultiSelectPickerSummaryPipe],
            providers: [{provide: Overlay, useValue: overlayMock}],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiSelectPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
