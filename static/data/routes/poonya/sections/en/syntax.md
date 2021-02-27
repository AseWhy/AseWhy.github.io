@define Translator Machine Translation(translate.google.com)

# Syntax
The syntax in poonya is almost equivalent to most programming languages, with its own specifics. The syntax in poonya can be divided into two categories:
* Block syntax
* Expression syntax

## Block syntax ~[block]
The blocky syntax only applies to poonya blocks of code. Usually they are poonya code in `{}` - curly braces, but there are exceptions in the form of the main block, which, for obvious reasons, does not need to be enclosed in brackets.

Block syntax is a sequence of instructions that are executed by the poonya interpreter in a given order.

### Instructions ~[instructions]
The statements allow you to define basic template behavior at the main block level. Instructions are executed sequentially, poonya does not support async, so async instructions (say, if you created an async function as a static library function), the template engine will wait until the last async instruction is executed.

### Instruction if ~[if]
`if` - is a conditional block statement. It is used as follows: `if` (`<`**condition**`>`) {`//`code`//`}`? `**else**`?`**if** (`<`**condition**`>`) {`// `code`//`}. `if` will be executed if the condition`<`**condition**`>`will be met. After completing the instruction, the interpreter will move on to the next instruction.

```js
set i = 5;

if(i = 5){
    > '`i` это 5';
} else {
    > '`i` это не 5';
}
```

Please note that the `if ... else` construction can be combined:

```js
set i = 6;

if(i = 5){
    > '`i` это 5';
} else if(i = 6){
    > '`i` это 6';
} else {
    > '`i` это не 5 и не 6';
}
```

This way you can go on and on.

### While statement ~[while]
`while` - is a conditional loop instruction. It is used as follows: `while`(`<`**condition**`>`) { `//` code `//` }. `while` will be executed as long as the condition `<`**condition**`>` is satisfied. After completing the instruction, the interpreter will move on to the next instruction.

```js
set i = 0;

while(i < 100){
    > 'i = ' + i + endl;
}
```

\- will print `i = 0 ... 99`, note 100 is not included, because if` i == 100`, the condition is no longer met.

### Repeat statement ~[repeat]
`repeat` is a range loop instruction. It is used as follows: `repeat` (`<`**with index**`>`;`<`**at index**`>`) {`//`code`//`}. `repeat` will be executed (`<`**at index**`>`-`<`**at index**`>`) times. In the body of the loop, the variable `current` is also available, which contains the current iterated position. After completing the instruction, the interpreter will move on to the next instruction.

```js
repeat(0; 100){
    > 'i = ' + current + endl;
}
```

\- will output `i = 0...99`.

### Set statement ~[set]
`set` - is an instruction for declaring a variable and initializing it. It is used as follows: `set` `<`**variable name**`>`=`<`**value**`>`. The setting is effective for the current scope and child scopes. You can use this statement to override a variable in the current scope.

```js
set i = 2 + 2 * 2;

> i;
```

The code above will output `6`;

### Inference statement ~[out]
The output operator is the `>` operator, which is interpreted as a command to output to an output stream that returns a pattern. The output operator is used as follows: `>` `<`**expression**`>`.

```js
> 2 + 2 * 2;
```

The code above will output `6`;

### Add operator ~[add]
The addition operator is the operator `<-`, which is interpreted as a command to add to an array, the variable with which should be located on the left, and the value to be added on the right. The append operator is used as follows: `<`**array like**`>` `<-` `<`**expression**`>`.

```js
set array = Array -> *;

array <- 5;

> array;
```

The code above will output `[ 5 ]`;

### Expression syntax ~[expression]
By expression syntax, I mean the syntax that is used to form an expression. It can be a sequence of operands and operators: `2 + 2 = 4`, or a logical expression `2 < 5` as well as mixed `2 + 2 * 2 = 6 = 0 + 1`. Expressions allow you to get an intervening value in memory that you can later assign to a variable or assign to a function.

### Literals ~[literals]
Literals are values specified in the code, as an example you can give `true` - a boolean literal that denotes a logical `yes`. Any use of numbers, booleans, and null values can also be called a literal.

### Operators ~[operators]
Operators are the part of an expression that is between two operands: `2 + 2` - where + is an operator. There are 9 operators in poonya: `-` `+` `*` `/` `>` `<` `<=` `>=` `=`. Please note that there is no `==` operator, I thought that this operator is not essential. Therefore, instead of it, in poonya there is a universal operator `=` - which in the expression will denote the desire to compare the left and right operands.

<img src='static/data/routes/poonya/images/operands.png' style='filter: var(--imgs-def-filter)'>

### Addition operator ~[plus]
The addition operator adds the left and right operand:

```js
> 2 + 5;
```

Will output [`7`].

### Subtraction operator ~[minus]
The subtraction operator subtracts the right operand from the left one:

```js
> 2 - 5;
```

Will output [`-3`].

### Multiplication operator ~[mult]
The multiplication operator multiplies the left and right operand.

> Note that the priority of the multiplication and division operations are performed with higher priority.
> The expression 2 + 2 * 2 can be written as 2 + (2 * 2) to better understand how it works.

```js
> 2 + 2 * 2;
```

Will output [`6`].

### Division operator ~[div]
The division operator performs division of the left operand by the right one.

> Note that the priority of the multiplication and division operations are performed with higher priority.
> The expression 2 + 2 * 2 can be written as 2 + (2 * 2) to better understand how it works.

```js
> 2 + 2 / 2;
```

Will output [`3`].

### Operator greater than ~[bigger]
The `greater than` operator compares the left and right operand, if the left operand is greater than the right one, it returns `true`;

> Note that the output statement for the executable block in the expression block is converted to a larger operator.

```js
> 3 > 3;
```

Will output [`false`].

### Operator less than ~[less]
The `less than` operator compares the left and right operands, if the left operand is less than the right one, it returns `true`;

```js
> 3 < 3;
```

Will output [`false`].

### Greater than or equal operator ~[e_bigger]
The `greater than or equal` operator compares the left and right operand, if the left operand is greater than or equal to the right one, it returns `true`;

```js
> 3 >= 3;
```

Will output [`true`].

### Less than or equal operator ~[e_less]
The `less than or equal` operator compares the left and right operand, if the left operand is less than or equal to the right one, it returns `true`;

```js
> 3 <= 3;
```

Will output [`true`].

### Operator equals ~[e_equ]
The operator `equals` compares the left and right operand, if the left operand is equal to the right one then returns `true`;

```js
> 3 = 3;
```

Will output [`true`].

### Ternary operator ~[ternar]
The ternary operator allows you to get a conditional value directly in an expression, has the following syntax: `<`**expression**`>` ? `<`*true* **expression**`>`: `<`*false* **expression**`>`. It works the same as an if statement, but has a return value. You can also nest ternary operators inside each other, creating similar constructs `true ? flase ? fakse : true : false`;

```js
> 1 === 2 ? '1 это 2' : '1 это не 2';
```

Выведет `[`"**1 это не 2**"`]`.

### Output group ~[output_group]
The output group allows you to intercept the output of the code that is in the executable block of the output group. To create an output group that does not need to be processed before returning, you can simply enclose your code in curly braces `{}`. If you want to handle the output in some way, you can specify a function to handle before the curly braces. `<`**handler**`>`***?*** `<-`***?*** `{` `<`**body**`>` `}`;

> While there are two built-in functions for processing: concat - simply concatenates the output as a string and array - just outputs the data raw as an array, without processing before output. All functions to handle can be found in the joiners object

```js
> {
    > 1;
    > 2;
    > 3;
}
```

Will output [[`1`, `2`, `3`]].

You can also specify a handler:
```js
> joiners.concat <- {
    > 1;
    > 2;
    > 3;
}
```

Will output [`123`].

### Objects, object constructors ~[objects_constr]
Objects can be created by specifying a target prototype and initialization data. `<`**prototype**`>` -> **level** -> `value`, **level** -> `value`, -> **next level** --> `next level value`...; That is, the properties of an object are passed by level-by-level transfer of properties:

> You can also create special types of objects, such as an array or a string. But as for strings, numbers and other primitives, they ***while*** work like ordinary objects. As for an array, its difference from an ordinary object is that no other indices, except numbers, are accepted.

```js
    set s = Obect ->
                key -> 'value',
                key1 -> 'value1';

    > s;
```

Will output (in JSON) `{`
    **"**`key`**"**`:` **"**`value`**"**,
    **"**`key1`**"**`:` **"**`value1`**"**
`}`;

You can also use shorthand notation (object only)

```js
    set s = ->
            key -> 'value',
            key1 -> 'value1';

    > s;
```

The output will be identical.

### Addition ~[end]
I have tried to make the `poonya` syntax not too complex and as friendly as possible to syntaxes of other languages. In principle, it's all syntax, thanks for your attention.