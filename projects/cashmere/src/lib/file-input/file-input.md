## Custom Validators

To assist with file input component validation there are several pre-built validators. The examples make use of them to help you
see them in action.

### fileSizeValidator

This validator will check the size of each file uploaded. It will report an error if any one of the uploaded files exceed the specified
amount. It takes the size as an argument in bytes. Example usage in a reactive form:

```js
uploads: [null, fileSizeValidator(1024)]
```

### filesTotalSizeValidator

This validator will check the size of all the uploaded files together. It will report an error if all the file sizes summed up is greater
than the specified amount. It takes the total allowed size as an argument in bytes. Example usage in a reactive form:

```js
uploads: [null, filesTotalSizeValidator(2048)]
```

### fileTypeValidator

This validator will check the type of each file uploaded. It will report an error if any one of the uploaded files has a type that was not
specified as allowed. It takes an array of extensions as an argument. Example usage in a reactive form:

```js
uploads: [null, fileTypeValidator(['jpg', 'png'])]
```


## File Size Pipe
There is also file size pipe that will nicely convert file sizes to the most
logical unit (bytes, kb, mb, etc). Example usage in an error message:
```html
<hc-error>File size must be under {{ maxFileSizeBytes | hcFileSize }}</hc-error>
```
