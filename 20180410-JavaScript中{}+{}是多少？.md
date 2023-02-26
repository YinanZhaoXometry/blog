---
id: 2qgkc58zn6cl7flma4g7msu
title: JavaScript 中{}+{}是多少？ (原创翻译)
desc: ''
updated: 1677377715228
created: 1677377684287
---

> 写于：2018-04-10

![](/assets/images/2023-02-26-10-15-13.png)

> 原文：[What is {} + {} in JavaScript?](http://2ality.com/2012/01/object-plus-object.html) > ![title image](https://ws2.sinaimg.cn/large/006tKfTcly1g0k77picxdj30m808cglu.jpg)
> Gary Bernhardt 最近在他的“[Wat](https://www.destroyallsoftware.com/talks/wat)”演讲中，指出了一个 JavaScript 语言有趣而又奇怪之处：当你把对象和数组相加时，会得到意想不到的结果。 本文将解释逐一进行解释。
> JavaScript 的加法规则其实很简单：你只能使用数字和字符串进行相加，而所有其他数据类型都将被转换为其中一种。为了理解类型转换的原理，我们首先需要了解一些基础知识。
> 注意：本文中提到的章节（比如第 9.1 节）都出自 ECMA-262 语言规范（ECMAScript 5.1）。
> 让我们先快速的复习一下：JavaScript 中有两种类型的值：原始值（primitive）和对象（object）[1]。 原始值包括：`undefined`、`null`、`boolean`、`number`和`string`。其他所有类型的值都是对象，如：`array`和`function`等。

## 1.类型转换

加法运算符会触发三种类型转换：它将值转换为原始值、`number`或`string`。

### 1.1. 用 ToPrimitive() 将值转换为原始值

`ToPrimitive()`的使用语法如下：

```js
ToPrimitive(input, PreferredType?)
```

可选参数`PreferredType`可以是`Number`或`String`类型。它仅表示期望的转换类型，而最终结果可以是任何原始类型值。假如`PreferredType`是`Number`，则将通过以下步骤完成`input`值的类型转换（第 9.1 节）：

1. 如`input`是原始类型值，则按原样返回。
2. 如并非原始类型值而是对象，则调用`obj.valueOf()`。如结果为原始类型值，则直接返回该值。
3. 如返回的并非原始类型值，则调用`obj.toString()`。如结果为原始类型值，则直接返回该值。
4. 如返回的并非原始类型值，则抛出`TypeError`错误。
   如`PreferredType`是`String`，则将步骤 2 和步骤 3 对调。如并未给出`PreferredType`，对于`Date`类型实例该值默认为`String`，而对于所有其他值该值默认为`Number`。

### 1.2. 用 ToNumber() 将值转换为数字

下表解释了`ToNumber()`如何将原始类型值转换为数字的（第 9.3 节）：
参数|结果
---|---
`undefined`|`NaN`
`null`|`+0`
boolean|`true`转换为 1，`false`转换为`+0`
number|不用转换
string|转换字符串中的数字，例如：将`"324"`转换为`324`
通过调用对象`obj`的`ToPrimitive(obj，Number)`方法，对于得到的（原始类型的）结果调用`ToNumber()`将其转换为数字。
1.3. 用 ToString() 将值转换为字符串
下表解释了 ToString（）如何将原始类型值转换为字符串（第 9.8 节）：
参数|结果
---|---
`undefined`|`undefined`
`null`|`null`
boolean|`"true"`或`"false"`
number|原数字的字符串书写方式，比如：`"1.765"`
string|不用转换
通过调用对象`obj`的`ToPrimitive(obj，String)`方法，对于得到的（原始类型的）结果调用`ToString()`将其转换为字符串。

### 1.4. 实践

通过以下对象，你将看到引擎内部的转换过程：

```js
var obj = {
	valueOf: function () {
		console.log('valueOf');
		return {}; // not a primitive
	},
	toString: function () {
		console.log('toString');
		return {}; // not a primitive
	}
};
```

当把`Number`作为一个普通函数（而非构造函数）调用时,会在引擎内部调用`ToNumber()`方法:

```js
  > Number(obj)
  valueOf
  toString
  TypeError: Cannot convert object to primitive value
```

## 2.加法

对于如下加法运算：

```js
value1 + value2;
```

执行该表达式时，内部运算逻辑如下（第 11.6.1 节）：

1. 将两个参加运算的值转换为原始类型值（以下是数学表示法，而非 JavaScript 代码）：

```
  prim1 := ToPrimitive(value1)
  prim2 := ToPrimitive(value2)
```

此处省略了`PreferredType`，因此对于 Date 类型的值该值默认为`String`,其他类型的值该值默认为`Number`。

2. 如果 prim1 或 prim2 有一个是字符串，则将另一个也转换为字符串，最终返回字符串拼接后的结果。
3. 如果都不是字符串，则将 prim1 和 prim2 都转换为数字，并返回他们之和。

### 2.1. 符合预期结果

当您将两个数组相加时，结果符合我们的预期：

```js
  > [] + []
  ''
```

将[]转换为原始类型值，首先会调用`valueOf()`方法，最终返回数组本身（this）：

```js
  > var arr = [];
  > arr.valueOf() === arr
  true
```

由于结果并非原始类型值，接下来将调用`toString()`方法，返回空字符串（原始类型值）。这样一来，`[]+[]`的结果，其实就是两个空字符串拼接的值。
将数组和对象相加也符合我们的预期：

```js
  > [] + {}
  '[object Object]'
```

说明：将空对象转换为字符串的结果如下：

```js
  > String({})
  '[object Object]'
```

因此，上一个表达式的结果就应该是`""`和`"[object Object]"`的字符串拼接的值。
更多将对象转换为原始类型值的例子：

```js
  > 5 + new Number(7)
  12
  > 6 + { valueOf: function () { return 2 } }
  8
  > "abc" + { toString: function () { return "def" } }
  'abcdef'
```

### 2.2. 非预期结果

如果`+`的头一个运算值是空对象字面量（在 Firefox 控制台输出的结果）：

```js
  > {} + {}
  NaN
```

这是怎么回事儿？这是由于 JavaScript 将第一个`{}`解析为空代码块并忽略了。因此，通过计算`+ {}`（加号和第二个`{}`）最终得到`NaN`。 这里的加号并非二元加法运算符，而是一元运算符前缀，它将其运算值转换为数字，其方法与`Number()`相同，例如：

```js
  > +"3.65"
  3.65
```

以下表达式的结果都相同：

```js
+{};
Number({});
Number({}.toString()); // {}.valueOf() 并非原始类型值
Number('[object Object]');
NaN;
```

为什么第一个`{}`被解析为代码块？ 原因是整个输入内容被解析成了一段语句，而以开头花括号的语句会被解析为代码块。 你也可以强制把输入内容解析为表达式，从而来修正计算结果：

```js
  > ({} + {})
  '[object Object][object Object]'
```

另外,函数或方法的参数也会被解析为表达式:

```js
  > console.log({} + {})
  [object Object][object Object]
```

经过前面的讲解，见到下面的计算结果，你应该不会感到惊讶：

```js
  > {} + []
  0
```

同样，上述语句也被解析为代码块和`+ []`。以下表达式的结果都相同：

```js
+[];
Number([]);
Number([].toString()); // [].valueOf() 并非原始类型值
Number('');
0;
```

有趣的是，Node.js 的`REPL`在解析类似的输入时，与 Firefox 和 Chrome(同 Node.js 一样使用 V8 引擎)的解析结果不同。以下输入被解析为表达式，结果符合我们预期：

```js
  > {} + {}
  '[object Object][object Object]'
  > {} + []
  '[object Object]'
```

它好处在于，其结果更像是将输入作为`console.log()`参数时所得到的结果。而非将输入用在程序语句中所得到的结果。

## 3.总结

大多数情况下，理解 JavaScript 中`+`的工作原理并不难：您只能将数字或字符串相加。 对象将被转换为字符串（如另一运算值是字符串的话）或数字（如另一运算值并非字符串）。 如需合并数组，则需要使用以下方法：

```js
  > [1, 2].concat([3, 4])
  [ 1, 2, 3, 4 ]
```

JavaScript 中没有内置的方法“连接”（合并）对象。 你需要使用像[Underscore](http://documentcloud.github.com/underscore/)这样的库：

```js
  > var o1 = {eeny:1, meeny:2};
  > var o2 = {miny:3, moe: 4};
  > _.extend(o1, o2)
  { eeny: 1,
    meeny: 2,
    miny: 3,
    moe: 4 }
```

注意：相较`Array.prototype.concat()`，`extend()`修改的是第一个参数：

```js
  > o1
  { eeny: 1,
    meeny: 2,
    miny: 3,
    moe: 4 }
  > o2
  { miny: 3, moe: 4 }
```

如您还想了解更多关于运算符的知识，推荐阅读这篇文章“[JavaScript 中的假运算符重载](http://2ality.com/2011/12/fake-operator-overloading.html)”。

## 4.索引

1. [JavaScript 中的值：并非所有都是对象](http://2ality.com/2011/03/javascript-values-not-everything-is.html)
