// import test from 'ava';
import assert from 'assert';
import {add} from '../src/add';

// mocha
describe('Add', function () {
    it('3 plus 4 should equal 7', function () {
        assert.equal(add(3, 4), 7);
    });
});

// ava
/*
test('foo', t => {
   if (add(3, 4) === 7) {
      t.pass();
   }
});*/
