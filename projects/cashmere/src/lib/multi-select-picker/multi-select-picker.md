#Guide to using the Multi-Select Picker

## Selected vs. Unselected Items

### Providing a list of options

Options are required by every variation of the picker component. These options are what the user will see as **unselected** items. Note: selected items are described in the next section and must not be added this list which is only for unselected options.

To provide options to the picker component bind an array to the nonSelectedValues input param like so: ```<hc-multi-select-picker>[nonSelectedValues]="unCheckedOptions"</hc-multi-select-picker>```

### Providing a list of selected items

For any values that you want to have **pre-selected** (checked) you must pass to a separate binding: ```<hc-multi-select-picker>[selectedValues]="checkedOptions"</hc-multi-select-picker>```

If no options need to be pre-selected then this part can be skipped.

## Basic Lists

The picker component is meant to be as simple as possible for basic use cases and adds complexity only as needed.

If you have a simple list of **strings** or **numbers** then you can pass the list(s) as described in the Provide List Data section. A couple things come free just by providing a primitive (string or number) list:
* Search or Filtering items in the list
* Summary of selected items

However, if you have complex data described by objects then you will need to tell the MultiSelectPickerComponent how to understand those objects so that it can provide search/filter and summary features to the user. See next section for details.

## Object Lists

Where the ```<hc-multi-select-picker>``` really shines is in it's ability to present complex data to the user for them to select one or more choices.

### Presenting complex data to the user <span id="complex-templates"></span>

#### Custom Component
The recommended approach is to provide a custom component to the hc-multi-select-picker because it cleanly encapsulates the desired behavior and data.

usage:
```
<hc-multi-select-picker ... [nonSelectedValues]='unselectedUsers' [selectedValues]='selectedUsers'>
    <user-badge *hcPickerItem="let item" [user]="item"></some-custom-component>
</hc-multi-select-picker>
```

Notice that a list of ```nonSelectedValues``` and ```selectedValues``` were provided and then a custom user component is projected in the content area of the ```<hc-multi-select-picker>```.

Also notice that ```*hcPickerItem="let item"``` is a directive that describes to the picker component how to wire up the data for each item displayed to the user. There are two parts:

 1. ```hcPickerItem``` marks this component as a dynamic template to be used for stamping out each provided list item. It is helpful to think of this as describing your component literally as a stamp that will be used many times.
 2. ```"let item"``` declares to Angular a variable, that we decide in this example to call ```item```. This ```item``` variable is then available to wire up to the component as if the data was already available.

The above strategy is essentially a custom version of an angular for loop. ```*ngFor="let item of items"``` Note that this is very similiar syntax except we do not provide ```of items``` because the list is passed to and controlled by ```hc-multi-select-picker```.

#### Custom Template

An alternative to use a custom component is to provide a custom template. This might be useful if the object being displayed to the user is very simple. Even in this case a custom component is still recommended for code cleanliness but this option is here if needed.

With the custom template some parts remain the same such as the bound properties and events on the parent ```<hc-multi-select-picker>``` what differs is that you will be projecting a custom template in place of the custom component.

Usage:
```
<hc-multi-select-picker ... [selectedValues]="selectedLocationValues" [nonSelectedValues]="locationValues">
    <div *hcPickerItem="let item">
        <div class="building">
            <b>{{ item.building.title }} - {{ item.building.subtitle }}</b>
        </div>
        <div class="address">{{ item.address }}</div>
    </div>
</hc-multi-select-picker>
```

Taking what you have already learned from the custom component section this approach still uses ```*hcPickerItem="let item"``` but notice it is placed on the projected content's root ```div```. This performs the same tasks as for custom components and again is essentially a custom for loop for the ```<hc-multi-select-picker>``` and says that this element and it's children should be stamped out for every provided item.

In this example there are areas of interpolation where we output values from an object item that doesn't exist yet.

Also, you might have noticed that there is real only difference between a template and a component being projected into the ```<hc-multi-select-picker>```.

For the template approach, in place of passing the magic ```item``` reference to an input property ```[user]``` on a component i.e.
 ```<user-badge *hcPickerItem... [user]="item">``` we  instead call out each part of the content where an item property value should be output. i.e. ```<div class="address">{{ item.address }}</div>```

### Describe how to search or filter items

If you have a basic **string** or **number** list you can skip this section unless you want to provide some custom search logic beyond the default logic provided for free by the picker that utilizes a lower cased ```includes()``` search . If you have a list of objects you must provide a search resolver function to the ```<hc-multi-select-picker>``` so that it knows how to search the custom data.

usage:
```$html
<hc-multi-select-picker ... [pickerItemFilterResolver]="locationInfoFilter"></hc-multi-select-picker>
```

```$typescript
locationInfoFilter(filter: string, item: LocationInfo): boolean {
    return (item.building.title + item.building.subtitle).toLowerCase().includes(filter.toLowerCase());
}
```

The filter function can be whatever logic you want as long as it returns a boolean. This function you provide will need two parameters (```filter: string, item: LocationInfo```):
1. this is a string and is the search term the user enters. This will be invoked on each change / keystroke in the search input field.
2. this is an item that needs to be searched over to decide if it matches the search criteria. This would be a primitive string or number in the case of a basic list or an object in the case of a rich data list.

### Summary Item Text Resolver for complex object lists

Similar to the last section, if you have a basic **string** or **number** list you can skip this section unless you want to provide custom logic to determine what text gets displayed in the summary section below the ```<hc-multi-select-picker>```.

usage:
```$html
<hc-multi-select-picker ... [summaryTextItemResolver]="locationInfoSubtitleResolver"></hc-multi-select-picker>
```

```$typescript
locationInfoSubtitleResolver(value: LocationInfo): boolean {
    return value.building.subtitle;
}
```

This resolver as written will select the subtitle off of every selected item and will display them as comma separated list of subtitles.

## Forms

```<hc-multi-select-picker>``` is compatible with Angular forms and also with ```<hc-form-field>``` and thus should have all the same behavior you would expect from any of the other Cashmere form components.

Angular documentation for forms along with the forms example under Examples tab should have everything needed to get up and running with forms. However, here is some additional information.

### Reactive Forms

To make ```<hc-multi-select-picker>``` into a form control simply add one of the following directives and provide the proper binding value:

* ```formControl``` requires a binding to a control instance declared in the component class.
* ```formControlName``` requires the name of a control that is available in the form group to which this form item belongs.

#### Form Control usage:
```typescript
elementValues: string[] = [
    'Helium',
    'Oxygen',
    'Boron',
    'Lead',
    'Iron'
];

selectedElementValues: string[] = ['Hydrogen'];

elements = new FormControl(this.selectedElementValues);

ngOnInit() {
    this.elements.setValue(this.selectedElementValues); // Dynamically set form control value, if or when needed

    this.elements.valueChanges.subscribe((value) => {
        console.log('Value Change:', value);
    });
}
```

```html
<hc-form-field>
    <hc-multi-select-picker [formControl]="elements" [nonSelectedValues]="elementValues"></hc-multi-select-picker>
</hc-form-field>
```

Notice that we still need to provide a list of non selected option values whereas the selected options are passed into the element form control on control initialization in the component class.

#### Form Control Name usage:
```typescript
elementValues: string[] = [
    'Helium',
    'Oxygen',
    'Boron',
    'Lead',
    'Iron'
];

selectedElementValues: string[] = ['Hydrogen'];

formGroup: FormGroup;

constructor(private fb: FormBuilder) {}

ngOnInit() {
    this.formGroup = this.fb.group({
        elements: [this.selectedElementValues]
    });

    this.formGroup.valueChanges.subscribe((value) => {
        console.log('Value Change:', value);
    });
}
```

```html
<div [formGroup]="formGroup">
    <hc-form-field>
        <hc-multi-select-picker formControlName="elements" [nonSelectedValues]="elementValues"></hc-multi-select-picker>
    </hc-form-field>
</div>
```

Notice that we still need to provide a list of non selected option values whereas the selected options are passed into the element form control on control initialization in the component class.

### Labels

Adding a form label is as easy as using ```<hc-form-field>``` component and adding ```<hc-label>``` like so:

```html
<hc-form-field>
    <hc-label>Periodic Element:</hc-label>
    <hc-multi-select-picker formControl="elements" ...</hc-multi-select-picker>
</hc-form-field>
```

### Errors

Errors can be displayed with ease as well. 

```html
<hc-form-field>
    <hc-multi-select-picker formControl="elements" ...</hc-multi-select-picker>
</hc-form-field>
<hc-error>There was an error</hc-error>
```

If you want you can also apply conditional statements to various error message blocks like so:
```html
<hc-error *ngIf="elements?.errors?.required">Required Field</hc-error>
<hc-error *ngIf="elements?.errors?.minLength">Minimum Length is 5</hc-error>
```

### Hints

Hints are just as easy as labels:

```html
<hc-form-field>
    <hc-multi-select-picker formControl="elements" ...</hc-multi-select-picker>
    <hc-hint>Try one of the heavier elements!</hc-hint>
</hc-form-field>
```

### Required

To make a ```<multi-select-picker>``` required simply add a required attribute.

```html
<hc-form-field>
    <hc-multi-select-picker formControl="elements" required</hc-multi-select-picker>
    <hc-error>An element is required!</hc-error>
</hc-form-field>
```

One caveat with making the picker required is that although Angular forms let's you initialize a form control with values and specify validators like so: ```elements: [this.selectedElementValues, Validators.required]``` the Cashmere ```hc-form-field``` is not currently designed to expose validators from the form component to ```hc-form-field```. This means that it won't know to add a required marker * to the label.

If you want to make a control required make sure to at least add a required attribute on the html element itself as shown in the above example. You may also additionally add the required validator to the form control initialization but that would result in two locations specifying required. Other validators should be fine to add as normal.

### Disabled

To mark a field as disabled either add a disabled attribute to the control in the html template or you may specify on form initialization that it is disabled.

usage on initialization:
```typescript
this.formGroup = this.fb.group({
    elements: {value: this.selectedElementValues, disabled: true}
}); 
```

or usage in template

```html
<hc-form-field>
    <hc-multi-select-picker formControl="elements" disabled</hc-multi-select-picker>
</hc-form-field>
```

or dynamically at a later time

```typescript
control.disable();
```

## Misc

### Checkbox behavior

Note that by design selected items will bubble up to the top of the list of options, when unselected they will bubble back to their natural order.

### Disabled

You can still disable a ```<hc-multi-select-picker>``` without it being a form. Just add the disabled attribute.

### Focus

Users can use tab key to focus into a picker. Once opened the user will not be able to dismiss the modal via tabbing and must click **cancel**, **submit**, or click on the overlay outside the modal which acts as a cancel action. Once the modal is dismissed the user may continue tabbing to there elements in order.  

### Controlling number of summary items

The summary text below the picker input might get too long to fit reasonably in a given UI layout. If this happens you can add an attribute to the picker like so:

```html
<hc-multi-select-picker ... maxSummaryItems="8"</hc-multi-select-picker>
```

If this threshold is surpassed (i.e. list is greater than threshold ) then in place of showing a list like this:
```text
Selected: Hydrogen, Helium, Iron, Boron
Francium, Fibranium, Unobtainium, Atamantium
```

you would instead see the summary like this:
```text
Selected: 9 items
```

### Configuring the placeholder

The placeholder is the message that is displayed in the input field whenever there is not input text present from the user. 

usage:
```html
<hc-multi-select-picker ... placeholder="Choose Element"</hc-multi-select-picker>
```

### Listening for changes

Whether or not the ```<hc-multi-select-picker>``` is used in a form you may also apply a change event listener to the component.

usage:
```html
<hc-multi-select-picker ... (change)="elementsSelected($event)"</hc-multi-select-picker>
```

```typescript
change(event: MultiSelectPickerChangeEvent<string>): void {
    console.log("basic example changed:", event);
}
```

The ```MultiSelectPickerChangeEvent<string>``` has the following shape:

```typescript
export class MultiSelectPickerChangeEvent<T> {
    constructor(
        public source: MultiSelectPickerComponent,
        public selectedValues: T[]
    ) {}
}
```

This object gives you access to all the selected values as well as a reference to the picker component allowing access to any public members. 

Notice that this event object is generic so you can type it as your expected type when setting up a change listener. In the example above the type of ```T``` is string.

