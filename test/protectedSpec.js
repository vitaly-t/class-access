'use strict';

var classes = require('./classes');

var Parent = classes.Parent,
    Child = classes.Child;

describe('protected', function () {

    it('must override members', () => {
        expect(new Parent().$protected.shared).toBe('hello');
        expect(new Child().$protected.shared).toBe('world');
    });

    it('must throw on invalid caller context', () => {
        expect(() => {
            Object.getOwnPropertyDescriptor(new Parent(), '$protected').get();
        }).toThrow(new TypeError('Invalid caller outside of the class!'));
    });

});
