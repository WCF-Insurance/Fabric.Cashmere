##### General Usage

**secondary**

As a general rule of thumb, you should never have more than one primary button on a page, or viewable at once on a page. For secondary buttons, use `secondary`.

**button link**

The `button-link` button should be used to show a non-primary, negative/destructive action like 'cancel' or 'remove' or 'back'. It's usually paired with another non-link button.

##### Split Buttons

**hc-split-button**

To use `hc-split-button` you encapsulate the content you want to be shown on the button. Anything marked with the directive `hcButtonItem` will get transferred into the dropdown menu. Everything else will be shown as the main button's content.

**hcButtonItem**

Marks an element for being placed into the dropdown menu of the button. Multiple elements can be marked with this directive.

##### Button Anchors

A `button anchor` is for the rare occasion in which you need to restyle an existing anchor tag to appear like a button. Ideally, you would always swap the anchor tag for a button component instead.
