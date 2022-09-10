# inline-function
A web component for safely evaluating complex and symbolic math expressions and other functions and displaying the result.

# Usage

`@anywhichway/inline-function` is designed to be loaded and used from a CDN like https://www.jsdelivr.com. It is also designed
to be loaded and instantiated by `@anywhichway/quick-component`.

Insert this line into your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/@anywhichway/quick-component.js" component="https://cdn.jsdelivr.net/npm/@anywhichway/inline-function@0.0.3"></script>
```

Version numbers are used above to insulate your use from unexpected changes due to future enhancements. You can also use
the most recent version of the software with the code below:

```html
<script src="https://cdn.jsdelivr.net/npm/@anywhichway/quick-component.js" component="https://cdn.jsdelivr.net/npm/@anywhichway/inline-function"></script>
```

After this you can include the tag `<inline-function>` in your HTML.

# Configuration

A `inline-function` is configured with attributes, nested HTML, and slots. The example below shows how to eval arbitrary 
JavaScript and preserve the error message for delivery to the calling page.

```html
<inline-function id="myeval" showfunction="true">
    <script>
        (value) => {
            let result;
            try {
                result = eval(value);
            } catch(e) {
                return e + "";
            }
            if(result && result.toString) {
                return result.toString();
            }
            return result;
        }
    </script>
    <slot>2 + 2</slot>
</inline-function>
```

Any scripts you pass with a `src` attribute are loaded to support execution of your custom function. There should be
precisely one script that contains nothing but a single function definition. This is the function that will be executed.
Arguments are provided via an un-named slot.

# Dynamic Updates

By changing the slot value and calling `render` you can re-use the tag with other arguments.

```javascript
const computer = document.getElementById("myeval"),
    slot = computer.querySelector("[slot]");
slot.innerText = "2 - 2";
computer.render();
```

# Architecture and Security

Inline functions are run in a WebWorker thread to prevent access to the `window` and `document` and main run loop.
This provides the most security for executing potentially malicious code. However, it is still possible to overload
a web browser with tightly looping code.

# Version History (reverse chronological order)

2022-09-10 v0.0.4 Updated docs
2022-09-10 v0.0.3 Added documentation and load improvements