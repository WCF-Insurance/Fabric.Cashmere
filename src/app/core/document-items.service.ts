import {Injectable} from '@angular/core';

export interface DocItem {
    id: string;
    name: string;
    category: 'forms' | 'nav' | 'layout' | 'buttons' | 'popups' | 'table' | 'pipes';
    examples?: string[];
    usageDoc?: boolean;
    hideApi?: boolean;
}

const docs: DocItem[] = [
    {id: 'accordion', name: 'Accordion', category: 'layout', examples: ['accordion-overview']},
    {
        id: 'action-bar',
        name: 'Action Bar',
        category: 'nav',
        examples: ['action-bar']
    },
    {id: 'address', name: 'Address', category: 'forms', examples: ['address'], usageDoc: true},
    {id: 'banner', name: 'Banner', category: 'popups', examples: ['banner-overview']},
    {id: 'breadcrumbs', name: 'Breadcrumbs', category: 'nav', usageDoc: true},
    {
        id: 'busy-indicator',
        name: 'Busy Indicator',
        category: 'buttons',
        examples: ['busy-indicator-overview'],
        usageDoc: true
    },
    {
        id: 'button',
        name: 'Button',
        category: 'buttons',
        examples: ['button-type', 'button-split', 'button-size', 'button-anchor', 'button-link', 'button-with-icon', 'button-icon'],
        usageDoc: true
    },
    {
        id: 'checkbox',
        name: 'Checkbox',
        category: 'forms',
        examples: ['checkbox-standard', 'checkbox-disabled', 'checkbox-forms'],
        usageDoc: true
    },
    {
        id: 'chip',
        name: 'Chip',
        category: 'buttons',
        examples: ['chip-basic', 'chip-action', 'chip-row', 'chip-singlerow']
    },
    {
        id: 'datepicker',
        name: 'Datepicker',
        category: 'forms',
        examples: ['datepicker', 'datepicker-sugar', 'datepicker-min-max', 'datepicker-selected-value'],
        usageDoc: true
    },
    {
        id: 'date-range',
        name: 'DateRange',
        category: 'forms',
        examples: ['date-range', 'date-range-duration-constricted', 'date-range-time'],
        usageDoc: true
    },
    {
        id: 'drawer',
        name: 'Drawer',
        category: 'layout',
        examples: ['drawer-basic', 'drawer-overlay', 'drawer-side', 'drawer-menu']
    },
    {
        id: 'ellipsis-pipe',
        name: 'Ellipsis',
        category: 'pipes',
        usageDoc: true,
        hideApi: true,
        examples: ['ellipsis-overview']
    },
    {
        id: 'environment-ribbon',
        name: 'Environment Ribbon',
        category: 'buttons',
        examples: ['environment-ribbon-overview']
    },
    {
        id: 'file-input',
        name: 'File Input',
        category: 'forms',
        examples: [
            'file-input-overview',
            'file-input-file-size-validation',
            'file-input-file-type-validation',
            'file-input-custom-label-and-color'
        ]
    },
    {id: 'form-field', name: 'Form Field', category: 'forms', examples: ['form-field-overview']},
    {
        id: 'header',
        name: 'Header',
        category: 'nav',
        examples: ['header-overview']
    },
    {
        id: 'highlight',
        name: 'Highlight',
        category: 'pipes',
        examples: ['highlight-overview']
    },
    {id: 'icon', name: 'Icon', category: 'buttons', examples: ['icon-overview']},
    {
        id: 'input',
        name: 'Input',
        category: 'forms',
        usageDoc: true,
        examples: ['input-required', 'input-hint', 'input-suffix', 'input-prefix', 'input-text-area', 'input-toggle-visible', 'input-phone-number', 'input-zipcode', 'input-currency', 'input-password']
    },
    {id: 'list', name: 'List', category: 'layout', examples: ['list-overview']},
    {
        id: 'modal',
        name: 'Modal',
        category: 'popups',
        examples: ['modal-overview'],
        usageDoc: true
    },
    {
        id: 'multi-select-picker',
        name: 'Multi-Select Picker',
        category: 'forms',
        examples: ['multi-select-picker-basic-text', 'multi-select-picker-rich-component', 'multi-select-picker-rich-template', 'multi-select-picker-form', 'multi-select-picker-focus', 'multi-select-picker-form-disabled'],
        usageDoc: true
    },
    {
        id: 'navbar',
        name: 'Navbar',
        category: 'nav',
        examples: ['navbar-overview', 'navbar-app-switcher'],
        usageDoc: true
    },
    {
        id: 'pagination',
        name: 'Pagination',
        category: 'nav',
        usageDoc: true,
        examples: ['pagination-standard', 'pagination-load-more', 'pagination-simple']
    },
    {
        id: 'phone-pipe',
        name: 'Phone',
        category: 'pipes',
        usageDoc: false,
        hideApi: true,
        examples: ['phone-overview']
    },
    {id: 'picklist', name: 'Picklist', category: 'layout', examples: ['picklist-simple', 'picklist-valueset'], usageDoc: true},
    {
        id: 'pop',
        name: 'Popover',
        category: 'popups',
        examples: ['popover-simple', 'popover-menu', 'popover-tooltip', 'popover-right-click', 'popover-overview'],
        usageDoc: true
    },
    {
        id: 'progress-bar',
        name: 'Progress Bar',
        category: 'nav',
        examples: ['progress-bar'],
        usageDoc: true
    },
    {
        id: 'progress-indicators',
        name: 'Progress Indicators',
        category: 'buttons',
        examples: ['progress-spinner', 'progress-dots'],
        usageDoc: true
    },
    {
        id: 'radio-button',
        name: 'Radio Button',
        category: 'forms',
        examples: ['radio-button-standard', 'radio-button-disabled', 'radio-button-forms'],
        usageDoc: true
    },
    {
        id: 'requirement',
        name: 'Requirement',
        category: 'layout',
        examples: ['requirement-overview'],
        usageDoc: true
    },
    {
        id: 'scroll-nav',
        name: 'ScrollNav',
        category: 'nav',
        examples: ['scroll-nav']
    },
    {
        id: 'select',
        name: 'Select',
        category: 'forms',
        examples: ['select-standard', 'select-disabled', 'select-borderless', 'select-validation', 'select-forms', 'select-object'],
        usageDoc: true
    },
    {
        id: 'sidenav',
        name: 'Sidenav',
        category: 'nav',
        examples: ['sidenav-overview']
    },
    {
        id: 'slider',
        name: 'Slider',
        category: 'forms',
        examples: ['slider']
    },
    {id: 'sort', name: 'Sort', category: 'table', usageDoc: true},
    {
        id: 'ssn-pipe',
        name: 'SSN',
        category: 'pipes',
        usageDoc: false,
        hideApi: true,
        examples: ['ssn-overview']
    },
    {
        id: 'ssn-masked-pipe',
        name: 'SSN Masked',
        category: 'pipes',
        usageDoc: false,
        hideApi: true,
        examples: ['ssn-masked-overview']
    },
    {id: 'subnav', name: 'Subnav', category: 'nav', examples: ['subnav-overview']},
    {
        id: 'table',
        name: 'Table',
        category: 'table',
        examples: ['resizable-columns', 'table-sort', 'table-filter', 'table-editable', 'table-multi-select'],
        usageDoc: true
    },
    {
        id: 'tabs',
        name: 'Tabs',
        category: 'layout',
        examples: ['tabs-horizontal', 'tabs-vertical']
    },
    {
        id: 'wcf-tabs',
        name: 'WCF Tabs',
        category: 'layout',
        examples: ['wcf-tabs-horizontal', 'wcf-tabs-vertical']
    },
    {
        id: 'tile',
        name: 'Tile',
        category: 'layout',
        examples: ['tile-overview']
    },
    {id: 'toaster', name: 'Toaster Messages', category: 'popups', examples: ['toaster-overview']},
    {
        id: 'typeform-survey',
        name: 'Typeform Survey',
        category: 'popups',
        examples: ['typeform-survey-overview'],
        usageDoc: true
    },
    {
        id: 'toggle-switch',
        name: 'Toggle Switch',
        category: 'forms',
        examples: ['toggle-switch', 'toggle-switch-checked', 'toggle-switch-disabled'],
        usageDoc: true
    },
    {
        id: 'typeahead',
        name: 'Typeahead',
        category: 'forms',
        examples: ['typeahead-overview', 'typeahead-stacked', 'typeahead-highlighting', 'typeahead-highlighting-object', 'typeahead-error', 'typeahead-fetch']
    },
    {
        id: 'typeahead-title',
        name: 'Typeahead Title',
        category: 'forms',
        examples: ['typeahead-title', 'typeahead-title-multiple', 'typeahead-title-no-alert']
    },
    {
        id: 'xanthos-file-upload',
        name: 'Xanthos File Upload',
        category: 'forms',
        examples: ['xanthos-file-upload-overview']
    },
    {
        id: 'zipcode-pipe',
        name: 'Zip Code',
        category: 'pipes',
        usageDoc: false,
        hideApi: true,
        examples: ['zipcode-overview']
    },
];

@Injectable()
export class DocumentItemsService {
    getDocItems(): DocItem[] {
        return docs;
    }

    getItemById(id: string): DocItem | undefined {
        return docs.find(doc => doc.id === id);
    }
}
