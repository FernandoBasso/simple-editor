# Simple Editor

A really simple WYSIWYG editor that adds bold, italic and underline
capabilities to textareas.

This editor is intentionally simple and was born from a need I had at work.
Perhaps we may add something else to it in the future, but it is intended to
remain very small and with just a minimal set of features. There are several
other editors that offer everything else you may need.

Here's a screenshot:

![Simple Editor — Global Overview](imgs/simple-editor-screenshot1.png)

## Getting Started

You will need one ore more `textarea`s, each enclosed by a container (`div`, `p`,
etc.) with the class named `fields`. Something like this:


```html
<div class='fields'>
    <label for='requisites'>Requisites</label>
    <textarea id='requisites' name='requisites'></textarea>
</div>
<div class='fields'>
    <label for='description'>Description</label>
    <textarea id='description' name='description'></textarea>
</div>
```

Then include jQuery and Simple Editor:

```html
<script type='text/javascript' src='//code.jquery.com/jquery-2.2.2.min.js'></script>
<script type='text/javascript' src='simple-editor.js'></script>
```

Finally, you tell it to transform textareas in rich (yet simple) editors:

```javascript
simpleEditor.init({
    selector: 'form .fields textarea'
});
```

`selector` can be any valid jQuery selector, such as `#myform .foo textarea`
or simply `textarea`.


## Preparing for form submission to the server

Before submitting, we have to get the text from the editable containers
and copy them to their respective textareas so the browser sends stuff
properly to the server. This is useful even if you are sending data through
ajax, since you can still just grab form data from the `textarea`s themselves
instead of having to find text inside the editor(s). That is easy enough:

```javascript
$('#myform').on('submit', function () {
    simpleEditor.save();
    // Other code to handle form submission...
});
```

## Paste as plain text

By default, when you paste text from libreoffice, msword, google docs or other
rich text editors into a web page editor, the formatting from the original source
is retained in the pasted text. Still, sometimes one needs to paste as clean text
(text/plain). Simple Editor has this feature built in. You just need to enable it:

```javascript
simpleEditor.init({
    selector: 'form .fields textarea',
    pastePlain: true
});
```



