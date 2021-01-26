@define Translator Machine Translation(translate.google.com)

# Get started

To get started with the poonya, you need to download it, you can use `npm install --save github: AseWhy / Poonya`. After that you can use poonya both in nodejs and in browser, for use in nodejs just connect poonya

```js
const { ExecutionPattern, MessagePattern, ExpressionPattern } = require('poonya');
```

To use it in a browser, you must first connect the bundle with any export method you like, there are three `var`, `amd`, and `system`. In the case of `var`, the poonya variable will simply be created in the global context, which will contain all the required classes, in the case of` amd` and `system` you can see [here](https://tproger.ru/translations/js-modules-formats-loaders-builders/).

The script is connected, just like it is usually done in html

```html
<script src='./js/poonya.browser.var.bundle.min.js'/>
```

Then you can use poonya like this:

```js
(async ({ ExecutionPattern, MessagePattern, ExpressionPattern }) => {
// User poonya here...
})(poonya);
```