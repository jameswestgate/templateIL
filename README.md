templateIL
==========

Create markup from a javascript object literal. Placeholder repo for wikipages (for now).

The _compose_ function takes a template javascript object notation (Template IL) object and builds the corresponding markup. Template IL is an intermediary language other template parsers can use to generate a javascript object literal describing both a declarative and functional syntax for generating markup.

Because template IL is javascript it can be included in and is 100% valid within a script tag.

###Working with template IL - tags and attributes###
The first example shows how to create tag and attribute using object literal syntax. The parser will work out which is a tag and which is an attribute:

```javascript
var il = { div: { style: 'z-order: 0'} };
var html = compose(il); 
```

```
<div style="z-order: 0"></div>
```

In the next example, the _p_ tag is nested inside the _div_ tag because the parser knows to look out for all legal tags:

```javascript
var il = { div: { p: 'Hello world'} };
var html = compose(il);
```

```
<div><p>Hello world</p></div>
```

We complete the first tutorial by adding a nested tag with style:

```javascript
var il = { div: { p: { style: 'color: red', text: 'Hello world'}}};
var html = compose(il);
```

```
<div><p style="color: red">Hello world</p></div>
```

###Advanced template IL - reserved words, arrays of tags, functions###

To use a tag or attribute normally reserved by the javascript language, wrap the object literal key in quotes - e.g. the _class_ keyword in javascript:

```javascript
var il = { span: { 'class': 'red', text: 'Goodbye'}}};
var html = compose(il);
```

```
<span class="red">Goodbye</span>
```

Sometimes you may want multiple sibling tags with the same key name. In this case, wrap the elements in an array:

```javascript
var il = {table: {tr: [{td: 'cell 1'}, {td: 'cell 2'}]}};
var html = compose(il);
```

```
<table>
  <tr><td>cell 1</td><td>cell 2</td></tr>
</table>
```

Functions can be used for any key value opening up all sorts of creative templating possibilities:

```javascript
var il = {p: {text: 'Todays date is: ', em: function() {return new Date()}}};
var html = compose(il);
```

```
<p>Todays date is <em>Thu Feb 07 2013 10:20:22 GMT+0000 (GMT)</em></p>
```

Functions can also be used to control conditions, loops or any other code that manipulates the output of the template:

```javascript
var il = {table: function() {
  for (var i=1; i<4; i++) this.push({tr:{td:i}});
}});
var html = compose(il);
```

```
<table>
  <tr><td>1</td></tr>
  <tr><td>2</td></tr>
  <tr><td>3</td></tr>
</table>
```
