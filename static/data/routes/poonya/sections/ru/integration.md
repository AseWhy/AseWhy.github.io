# Интеграция

Под интеграцией, я подразумеваю способы внедрения пуньи в ваше приложение.

Для взаимодействия с пуньей, есть несколько интерфейсов и функций экспортируемых пакетом. Самые часты которые будут использоваться это шаблоны `MessagePattern`, `ExecutionPattern` и `ExpressionPattern`. И так пройдемся по ним всем:

## MessagePattern ~[message]

`MessagePattern` - это шаблон сообщение, суть его в том, что все что не в блоке `'prefix'` { `//` code `//` } игнорируется парсером и выводится как обычный текст. То есть всю логику шаблона необходимо прописывать в блоке, а не в теле, в отличие от того же `ExecutionPattern`'a.

`MessagePattern` можно создать, импортировав его из пакета, любым удобным для вас способом, вызвав его конструктор, где первым аргументом необходимо передать строку текста для парсинга, или объект описывающий входные данные, а вторым префикс для блока (по умолчанию он будет poonya).

```js
(async ({ MessagePattern }) => {
    const pattern = new MessagePattern(`
        I’m having a great time here in Sydney. The different sports are exciting, and there are lots of other exciting things too.
        For example the mascots are really great! They are called Olly, Syd and Millie.
        They are Australian ‘ animals and they are the symbols of the Sydney Games.
        The kookaburra is an Australian bird. She got her name, Olly, from the word ‘Olympics’.
        She’s a symbol of friendship and honesty. Then there’s Syd (from Sydney).
        He’s a platypus with a duck’s nose. He’s the symbol of the city of Sydney and its people.
        The third mascot is Millie. She’s an Australian animal — an echidna. She’s the symbol of the new millennium.
        So now I’ve got a mascot too. He’s called Ozzie (from Aus­tralia) and he’s a cute, cuddly koala.

        poonya {
            if(ok) {
                > "It's ok!";
            } else {
                > "It's not ok :(";
            }
        }
    `, poonya);

    await pattern.result({
        ok: true
    }).complete();
})(poonya);
```

Код выше выводит текст, а потом в соответствии с первым аргументом выводит `It's ok!` или `It's not ok :(`. Обратите внимание, что префикс для блока можно поменять. Ниже приведена таблица параметров, которые может принимать `MessagePattern`:

| Параметр| тип									                    | описание																							                                                 |
|---------|-----------------------------------------|--------------------------------------------------------------------------------------------------------|
| input   | **String** \| `typeof` **PatternInput** | Вход шаблона, То есть это строка или другой набор данных которые вы передаете шаблонизатору. 		       |
| prefix  | **String**  							              | Префикс для шаблона, по умолчанию используется poonya.											                           |
| import  | **Array**`<`**String**`>`				        | Нативные библиотеки для импорта. По умолчанию - пустой массив.									                       |
| logger  | `typeof` **Console**					          | Интерфейс вывода, за основу взят **Console**, и по умолчанию используется глобальный объект `console`. |

## ExecutionPattern ~[execution]

`ExecutionPattern` - это шаблон выполнения кода poonya. Все что в него передано, будет распознано парсром как код poonya со всеми его синтаксическими особенностями.

`ExecutionPattern` можно создать, импортировав его из пакета, любым удобным для вас способом, вызвав его конструктор, где первым аргументом необходимо передать строку текста для парсинга, или объект описывающий входные данные.

```js
(async ({ ExecutionPattern }) => {
    const pattern = new ExecutionPattern(`
        > 'I’m having a great time here in Sydney. The different sports are exciting, and there are lots of other exciting things too.';
        > 'For example the mascots are really great! They are called Olly, Syd and Millie.';
        > 'They are Australian ‘ animals and they are the symbols of the Sydney Games.';
        > 'The kookaburra is an Australian bird. She got her name, Olly, from the word ‘Olympics’.';
        > 'She’s a symbol of friendship and honesty. Then there’s Syd (from Sydney).';
        > 'He’s a platypus with a duck’s nose. He’s the symbol of the city of Sydney and its people.';
        > 'The third mascot is Millie. She’s an Australian animal — an echidna. She’s the symbol of the new millennium.';
        > 'So now I’ve got a mascot too. He’s called Ozzie (from Aus­tralia) and he’s a cute, cuddly koala.';

        if(ok) {
            > "It's ok!";
        } else {
            > "It's not ok :(";
        }
    `);

    await pattern.result({
        ok: true
    }).complete();
})(poonya);
```

Код выше выводит текст, а потом в соответствии с первым аргументом выводит `It's ok!` или `It's not ok :(`. Обратите внимание, что все что было передано в конструктор является шаблоном poonya. Ниже приведена таблица параметров, которые может принимать `ExecutionPattern`:

| Параметр| тип									                    | описание																							                                                 |
|---------|-----------------------------------------|--------------------------------------------------------------------------------------------------------|
| input   | **String** \| `typeof` **PatternInput** | Вход шаблона, То есть это строка или другой набор данных которые вы передаете шаблонизатору. 		       |
| import  | **Array**`<`**String**`>`				        | Нативные библиотеки для импорта. По умолчанию - пустой массив.								                         |
| logger  | `typeof` **Console**					          | Интерфейс вывода, за основу взят **Console**, и по умолчанию используется глобальный объект `console`. |

## ExpressionPattern ~[expression]

`ExpressionPattern` - наиболее специфичный шаблон. Отличается он тем, что в целом это обычный шаблон, но вход должен представлять из себя выражение. То есть инструкции, которые работали бы в теле или в блоке, не будут работать в `ExpressionPattern`

`ExpressionPattern` можно создать, импортировав его из пакета, любым удобным для вас способом, вызвав его конструктор, где первым аргументом необходимо передать строку с выражением, или объект описывающий входные данные.


```js
(async ({ ExpressionPattern }) => {
    const pattern = new ExpressionPattern(`2 + 2 * 2 + val`);

    await pattern.result({
        val: 2
    });
})(poonya);
```

Код выше выведет 8, в соответствии с выражением `2 + (2 * 2) + 2`. Ниже приведена таблица, с полным описанием принимаемых конструктором значений.

| Параметр| тип									                    | описание																							                                                 |
|---------|-----------------------------------------|--------------------------------------------------------------------------------------------------------|
| input   | **String** \| `typeof` **PatternInput** | Вход шаблона, То есть это строка или другой набор данных которые вы передаете шаблонизатору. 		       |
| import  | **Array**`<`**String**`>`				        | Нативные библиотеки для импорта. По умолчанию - пустой массив.									                       |
| logger  | `typeof` **Console**					          | Интерфейс вывода, за основу взят **Console**, и по умолчанию используется глобальный объект `console`. |
