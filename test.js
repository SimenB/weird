const { JSDOM } = require('jsdom');
const { toMatchDiffSnapshot } = require('snapshot-diff');

expect.extend({ toMatchDiffSnapshot });

const div1 = document.createElement('div');
const div2 = document.createElement('div');

const span1 = document.createElement('span');
const span2 = document.createElement('span');

span1.innerHTML = 'hello';
span2.innerHTML = 'hello';

div1.appendChild(span1);
div2.appendChild(span2);

const first = JSDOM.fragment(div1.innerHTML);
let second = JSDOM.fragment(div2.innerHTML);

test('fragments', () => {
	span2.innerHTML = 'huh';
	second = JSDOM.fragment(div2.innerHTML);
	expect(first).toMatchDiffSnapshot(second);
	span2.innerHTML = 'hello';
	second = JSDOM.fragment(div2.innerHTML);
	expect(first).toEqual(second);
});
