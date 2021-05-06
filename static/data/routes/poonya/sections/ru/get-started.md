# Начиная

Для начала работы с пуньей, вам необходимо её скачать, вы можете использовать `npm install --save github:AseWhy/Poonya`. После этого вы можете использовать пунью как в nodejs так и в браузере, для использования в nodejs просто подключите пунью

```js
const { ExecutionPattern, MessagePattern, ExpressionPattern } = require('poonya');
```

Для использования в браузере, вам необходимо сначала подключить бандл с любым понравившимся методом экспорта, их есть три `var`, `amd`, и `system`. В случае `var`, в глобальном контексте просто будет создана переменная poonya, которая будет содержать все необходимые классы, в случае `amd` и `system` вы можете посмотреть [здесь](https://tproger.ru/translations/js-modules-formats-loaders-builders/).

Скрипт подключается, также как это обычно делается в html

```html
<script src='./js/poonya.browser.var.bundle.min.js'/>
```

После чего вы сможете использовать пунью так:

```js
(async ({ ExecutionPattern, MessagePattern, ExpressionPattern }) => {
// Используйте пунью тут...
})(poonya);
```
