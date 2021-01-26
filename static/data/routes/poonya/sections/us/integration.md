@define Translator Machine Translation(translate.google.com)

# Integration
Under Integration, I am authorizing ways to incorporate poonya into your application.

To interact with the poonya, there are several interfaces and functions exported by the package. The most common patterns that will be used are the `MessagePattern`,` ExecutionPattern` and `ExpressionPattern` patterns. And so let's go through them all:

## MessagePattern ~[message]

`MessagePattern` is a message pattern, its essence is that everything that is not in the `'prefix'` {`//` code `//`} is ignored by the parser and displayed as plain text. That is, all the logic of the template must be written in the block, and not in the body, in contrast to the same ExecutionPattern.

`MessagePattern` can be created by importing it from the package, in any way convenient for you, by calling its constructor, where the first argument must be a string of text for parsing, or an object describing the input data, and the second is a prefix for the block (by default it will be poonya).

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

The code above displays the text, and then, according to the first argument, prints `It's ok!` Or `It's not ok: (`. Note that the prefix for the block can be changed. Below is a table of parameters that `MessagePattern` can take:

| Field   | type			     				    | description																						    |
|---------|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| input   | **String** \| `typeof` **PatternInput** | Template input, That is, it is a string or other set of data that you pass to the template engine. 	|
| prefix  | **String**  							| The prefix for the template, poonya by default.											            |
| import  | **Array**`<`**String**`>`				| Native import libraries. The default is an empty array.									            |
| logger  | `typeof` **Console**					| The output interface is based on ** Console ** and defaults to the `console` global object.           |

## ExecutionPattern ~[execution]

The `ExecutionPattern` is the poonya code execution pattern. Everything passed to it will be recognized by the parser as poonya code with all its syntactic features.

`ExecutionPattern` can be created by importing it from the package, in any way convenient for you, by calling its constructor, where the first argument must be passed a string of text for parsing, or an object describing the input data.

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

The code above displays the text, and then, according to the first argument, outputs `It's ok!` Or `It's not ok: (`. Please note that everything that was passed to the constructor is a poonya template. Below is a table of parameters that the `ExecutionPattern `:

| Field   | type	           					    | description																							|
|---------|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| input   | **String** \| `typeof` **PatternInput** | Template input, That is, it is a string or other set of data that you pass to the template engine. 	|
| import  | **Array**`<`**String**`>`				| Native import libraries. The default is an empty array.									            |
| logger  | `typeof` **Console**					| The output interface is based on ** Console ** and defaults to the `console` global object.           |

## ExpressionPattern ~[expression]

`ExpressionPattern` is the most specific pattern. It differs in that, in general, this is a normal template, but the input must be an expression. That is, instructions that would work in a body or a block will not work in `ExpressionPattern`

`ExpressionPattern` can be created by importing it from the package, in any way convenient for you, by calling its constructor, where the first argument must be a string with the expression, or an object describing the input data.

```js
(async ({ ExpressionPattern }) => {
    const pattern = new ExpressionPattern(`2 + 2 * 2 + val`);

    await pattern.result({
        val: 2
    });
})(poonya);
```

The code above will print 8, according to the expression `2 + (2 * 2) + 2`. Below is a table with full descriptions of values accepted by the constructor.

| Field   | type									|description																						    |
|---------|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| input   | **String** \| `typeof` **PatternInput** | Template input, That is, it is a string or other set of data that you pass to the template engine. 	|
| import  | **Array**`<`**String**`>`				| Native import libraries. The default is an empty array.									            |
| logger  | `typeof` **Console**					| The output interface is based on ** Console ** and defaults to the `console` global object.           |