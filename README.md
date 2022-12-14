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

A `inline-function` is configured with attributes, nested HTML, and expressions. The example below shows how to eval arbitrary 
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
    <expression>2 + 2</expression>
</inline-function>
```

Any scripts you pass with a `src` attribute are loaded to support execution of your custom function. There should be
precisely one script that contains nothing but a single function definition. This is the function that will be executed.
Arguments are provided via a tag `expression`.

# Dynamic Updates

By changing the expression value and calling `render` you can re-use the tag with other arguments.

```javascript
const computer = document.getElementById("myeval"),
    expression = computer.querySelector("expression");
expression.innerText = "2 - 2";
computer.render();
```

# Architecture and Security

Inline functions are run in a WebWorker thread to prevent access to the `window` and `document` and main run loop.
This provides the most security for executing potentially malicious code. However, it is still possible to overload
a web browser with tightly looping code.

# Version History (reverse chronological order)

2022-10-15 v0.0.10 Removed caching of worker, sometimes old results were getting returned. Rolled back changes from v0.0.9
which broke some dependent code using this component.

2022-10-15 v0.0.9 Added default value of 'undefined' if no expression is associated with the tag.

2022-10-12 v0.0.8 Minor optimization, moved `connected()` body to `initialize()`.

2022-10-07 v0.0.7 Replaced `slot` with `expression` since `slot` was nto really a custom element slot.

2022-09-25 v0.0.6 Updated for changes to quickComponent.

2022-09-13 v0.0.5 Minor optimizations

2022-09-10 v0.0.4 Updated docs

2022-09-10 v0.0.3 Added documentation and load improvements