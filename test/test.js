
module('compose tests');


test('compose', function () {

    //Simple tag
    var il = { div: '' };
    var out = Object.compose(il);
    ok(out == '<div></div>', 'Simple Tag: ' + out);

    //Simple tag with attribute
    il = { div: { style: 'z-order: 0'} };
    out = Object.compose(il);
    ok(out == '<div style="z-order: 0"></div>', 'Simple tag with attribute: ' + out);

    //Simple tag with class attribute
    il = { div: { 'class': 'bacon'} };
    out = Object.compose(il);
    ok(out == '<div class="bacon"></div>', 'Simple tag with class attribute: ' + out);

    //Simple nested tag
    il = { div: { p: 'Hello world'} };
    out = Object.compose(il);
    ok(out == '<div><p>Hello world</p></div>', 'Simple nested tag: ' + out);

    //Simple nested tag with style
    il = { div: { p: { style: 'color: red', text: 'Hello world'}}};
    out = Object.compose(il);
    ok(out == '<div><p style="color: red">Hello world</p></div>', 'Simple nested tag with style: ' + out);

    //Complex nested Tag
    il = { div: { style: 'z-order: 1', p: 'Hello world'} };
    out = Object.compose(il);
    ok(out == '<div style="z-order: 1"><p>Hello world</p></div>', 'Complex nested Tag: ' + out);

	il = {
		html: {
			head: {
				title: 'Test Page'
			},
			body: [
				{p: 'Test1'},
				{p: 'Test2'}
			]
		}
	};

	out = Object.compose(il);
    ok(out == '<html><head><title>Test Page</title></head><body><p>Test1</p><p>Test2</p></body></html>', out);

    il = {table: function() {
	  for (var i=1; i<4; i++) this.push({tr:{td:i}});
	}};

	out = Object.compose(il);
	ok(out == '<table><tr><td>1</td></tr><tr><td>2</td></tr><tr><td>3</td></tr></table>', out);
});

test('compose (edge)', function() {
 	//Simple tag
    var il = {div: function() {
    	return 'hello world';
    }};

    var out = Object.compose(il);
    ok(out == '<div>hello world</div>', out);

    il = {div: function() {
    	this.push('hello world');
    }};

    out = Object.compose(il);
    ok(out == '<div>hello world</div>', out);

    il = {div: function() {
    	this.push({p:'goodbye world'});
    }};

    out = Object.compose(il);
    ok(out == '<div><p>goodbye world</p></div>', out);

    il = {div: function() {
    	this.push({p:'hello'});
    	return {p:'goodbye'};
    }};

    out = Object.compose(il);
    ok(out == '<div><p>hello</p><p>goodbye</p></div>', out);

})

