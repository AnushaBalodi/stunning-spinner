# stunning-spinner

####
## A jQuery Plugin for Customizable Spinners

This plugins helps to create a customizable number spinner. User can provide
values to be shown in spinner and also callback functions that would be called
when value of the spinner changes! 

This aims to provide complete flexibility and ease of use to the user.

---

####
### Installation


**Using script tag**

Include a script tag after jQuery library as below:
```
<script src="/{path}/spinner.min.js"></script>
```

For default css, include the css file as below:
```
<link rel='stylesheet' href='/{path}/spinner.min.css' />
```


---
####
### Usage

Know how to use the stunning spinner!

### `Syntax`

```
// spinner to be added in 'spinnerMain' DOM component

$('#spinnerMain').Spinner(options, callback);
```

**Note:** If no parameters are passed then a default spinner is created with
min value as 0 and maximum as 100 with no callbacks. However the user
can still destroy it later by sending destroy option as true.


---


### `Parameters`

**`options`**

Optional. An object that provides attributes for the spinner, taking following arguments:
    
* `min` 
    
    Integer. The minimum value permitted in the spinner. Below this, the
    decrement button disables.
    Default value is 0.
    
* `max`

    Integer. The maximum value permitted in the spinner. Above this, the
    increment button disables.
    Default value is 100.
    
* `value`

    Integer. Current value to be shown in the spinner.
    
    Default value is the min value.
    
* `incrementCallback`

    Function. It is a callback function which is triggered when the 
    user clicks on the '+' button of the spinner and the value has been
    updated. The current updated value of the spinner is sent as the first
    parameter.
    
* `decrementCallback`

    Function. It is a callback function which is triggered when the 
    user clicks on the '-' button of the spinner and the value has been
    updated. The current updated value of the spinner is sent as the first
    parameter.
    
* `onValueChange`

    Function. It is a callback function which is triggered when the 
    user manually changes the value of the spinner and the value has been
    updated. The current updated value of the spinner is sent as the first
    parameter.
    
* `destroy`

    Boolean. If a user wants to destroy a spinner, then he can call 
    the method and set destroy to true. It would remove the spinner
    component from the DOM container.
    
**`callback`** 

Optional. Function. This function is called after the spinner is created or destroyed.         
  
---


####
### Examples

#### _Creating default spinner_

The following code will make a default spinner and append as child to 
the provided DOM element.
The default spinner will have min as 0 and max as 100.

```
$('#spinnerContainer').Spinner();
```


#### _Creating Spinner with options and callbacks_

The following code will make a spinner with mentioned min, max, value,
and callbacks. And append as child to the provided DOM element.

```
var spinnerOptions = {
                         min: 0,
                         max: 10,
                         value: 2,
                         incrementCallback: function(value) {
                             // write your code here
                             console.log('Increment Clicked! Current Value ==> '  + value);
                         },
                         decrementCallback: function (value) {
                             // write your code here
                             console.log('Decrement Clicked! Current Value ==> '  + value);
                         },
                         onValueChange: function (value) {
                             // write your code here
                             console.log('Value Changed! Current Value ==> '  + value);
                         }
                     };

function callback() {
        //write your callback function code here
}

$('#spinnerContainer').Spinner(spinnerOptions, callback);
```

#### _Creating multiple default spinners_

The following code makes default spinners and appends them 
in all the components selected respectively.
All the spinners have min as 0 and max as 100.

```html
$('.spinnerContainer').Spinner();
```


#### _Creating multiple spinners with options_

The following code makes spinners with provided options and callbacks.
And append it to the provided DOM elements.

```html
var options = {} //specify options here
function callback() {
    // write callback code here
}
$('.spinnerComponents').Spinner(options, callback);
```

#### _Destroy spinner_

The following code will destroy spinner(s) in the provide DOM element(s).

```html
function callback() {
    // write callback code here
}
$('.spinnerContainer').Spinner({destroy: true}, callback);
```




