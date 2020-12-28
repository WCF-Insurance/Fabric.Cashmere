Date range picker with configurable Date presets.

## Setup

The `options` takes a `DateRangeOptions` object as a parameter to configure the date range component. This is typically setup for each component:

```typescript
@Component({
...
})
export class MyComponent implements OnInit{
     options: DateRangeOptions;
     ngOnInit() {
        this.options = {
            presets: [],
            format: 'mediumDate',
            range: { fromDate: today, toDate: today },
            applyLabel: 'Apply',
            ...
        };
    }
}
```
```html
<button hc-button hcDateRange [options]="options">Click Me</button>
```

You can customize the text of the input titles by adding the following parameters to the `options` object:

```typescript
startDatePrefix: 'Effective Date',
endDatePrefix: 'Expiration Date',
```

The following are default values if the options are not setup

```typescript
{
    excludeWeekends: false,
    locale: 'en-US',
    fromMinMax: { fromDate: undefined, toDate: undefined },
    toMinMax: { fromDate: undefined, toDate: undefined },
    presets: [],
    startDatePrefix: 'Start Date',
    endDatePrefix: 'End Date',
    format: '',
    range: { fromDate: undefined, toDate: undefined }
}
```

### Restricting the selectable range

You can restrict length of the period range the user can select by providing a `periodDurationOptions` object as a part of `options`.

`minDate` and `maxDate` are optional and will only restrict the start calendar as the end calendar valid range is derived from lengthInDays from and including selected start date, in this example 365 days.

NOTE! Using periodDurationOptions infers a narrowing of feature scope. Some behavior may be different or not present as a result of this choice.
```typescript
        this.options = {
            presets: [],
            format: 'mediumDate',
            range: { fromDate: today, toDate: today },
            applyLabel: 'Apply',
            ...
            periodDurationOptions: {
                lengthInDays: 365,
                minDate: fromMin, // Optional
                maxDate: toMax    // Optional
            }
        };
``` 


