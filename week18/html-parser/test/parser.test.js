// import test from 'ava';
import assert from 'assert';
import {parseHTML} from '../src/parser';

// mocha
describe('Html Parser', () => {
    it('parse a single element', () => {
        let document = parseHTML('<div></div>');
        let div = document.children[0];
        // console.log(div);
        assert.equal(div.tagName, 'div');
        assert.equal(div.children.length, 0);
        assert.equal(div.type, 'element');
        assert.equal(div.attributes.length, 2);
    });

    it('parse a single element with text content',  () => {
        let document = parseHTML('<div>hello</div>');
        let text = document.children[0].children[0];
        assert.equal(text.type, 'text');
        assert.equal(text.content, 'hello');
    });

    it('tag mismatch',  () => {
        try {
            let document = parseHTML('<div></vid>');
        } catch(e) {
            assert(e.message, 'Tag start end doesn\'t match!');
        }
    });

    it('text with <',  () => {
        let document = parseHTML('<div>a < b</div>');
        let text = document.children[0].children[0];
        assert.equal(text.content, 'a < b');
    });

    it('div with attribute',  () => {
        let document = parseHTML('<div id=container class=\'1\' data="abc" ></div>');
        let div = document.children[0];
        let count = 0;
        for (let attr of div.attributes) {
            if (attr.name === 'id') {
                count++;
                assert.equal(attr.value, 'container');
            }
            if (attr.name === 'class') {
                count++;
                assert.equal(attr.value, '1');
            }
            if (attr.name === 'data') {
                count++;
                assert.equal(attr.value, 'abc');
            }
        }
        assert.equal(count, 3);
    });

    it('div with attribute 2',  () => {
        let document = parseHTML('<div id=container class=\'1\' data="abc"></div>');
        let div = document.children[0];
        let count = 0;
        for (let attr of div.attributes) {
            if (attr.name === 'id') {
                count++;
                assert.equal(attr.value, 'container');
            }
            if (attr.name === 'class') {
                count++;
                assert.equal(attr.value, '1');
            }
            if (attr.name === 'data') {
                count++;
                assert.equal(attr.value, 'abc');
            }
        }
        assert.equal(count, 3);
    });

    it('div with attribute 3',  () => {
        let document = parseHTML('<div id=container class=\'1\' data="abc"/>');
        let div = document.children[0];
        let count = 0;
        for (let attr of div.attributes) {
            if (attr.name === 'id') {
                count++;
                assert.equal(attr.value, 'container');
            }
            if (attr.name === 'class') {
                count++;
                assert.equal(attr.value, '1');
            }
            if (attr.name === 'data') {
                count++;
                assert.equal(attr.value, 'abc');
            }
        }
        assert.equal(count, 3);
    });

    it('script',  () => {
        let content = `
            <div>ab</div>
            <span>cd</span>
            /script>
            </script
            <
            </
            </s
            </sc
            </scr
            </scri 
            </scrip
            </script 
        `;
        let document = parseHTML(`<script>${content}</script>`);
        let text = document.children[0].children[0];
        assert.equal(text.type, 'text');
        assert.equal(text.content, content);
    });

    it('attribute with no value',  () => {
        let document = parseHTML('<div id class/>');
    });

});