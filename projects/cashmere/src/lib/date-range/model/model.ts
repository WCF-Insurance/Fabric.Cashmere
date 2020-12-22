// ** Preset date range to be bound as a selectable option */
export interface PresetItem {
    /** Friendly description */
    presetLabel: string;
    /** Date range */
    range: DateRange;
}

// ** Range of dates with beginning and end */
export interface DateRange {
    /** Beginning Date */
    fromDate?: Date;
    /** Ending Date */
    toDate?: Date;
}

// ** Behavioral Options of the date range component */
export interface DateRangeOptions {
    /** set of predefined dates user can select */
    presets?: Array<PresetItem>;
    /** Display format of date. See https://angular.io/api/common/DatePipe#pre-defined-format-options */
    format?: string;
    /** Whether the date range pickers include the calendar, time selector, or both. Defaults to `date`. */
    mode?: 'date' | 'time' | 'date-time';
    /** If the time picker should use the 12 or 24 hour clock. Defaults to 12 */
    hourCycle?: number;
    /** Exclude weekends in date picker selection */
    excludeWeekends?: boolean;
    /** Locale settings of dates */
    locale?: string;
    /** Beginning date maximum allowed value */
    fromMinMax?: DateRange;
    /** Ending date maximum allowed value */
    toMinMax?: DateRange;
    /** Text label of apply button. Default 'Apply' */
    applyLabel?: string;
    /** Text label of cancel button Default 'Cancel' */
    cancelLabel?: string;
    /** Text label above start date. Default 'Start Date' */
    startDatePrefix?: string;
    /** Text label above end date. Default 'End Date' */
    endDatePrefix?: string;
    /** Text label of invalid date. Default 'Please enter valid date' */
    invalidDateLabel?: string;
    /** Begining Daterange */
    range?: DateRange;
    /** Options to configure a restriction in period length / duration.
     * Note using this disrupts default behavior in favor of a more specific behavior to restrict selectable range length */
    periodDurationOptions?: PeriodDurationOptions;
}

/** Options for restricting the length of the range selectable. See Usage for more information */
export interface PeriodDurationOptions {
    /** The number of total days, including the start date, that the user can select */
    lengthInDays: number;
    /** Optional: Min date that the start calendar can select */
    minDate?: Date;
    /** Optional: Max date that the start calendar can select */
    maxDate?: Date;
}
