'use strict';

var classes = require('./classes');

var Parent = classes.Parent,
    Child = classes.Child;

describe('private', function () {

    it('must override general members', () => {
        expect(new Parent().$private().general).toBe('parent-general');
        expect(new Child().$private().general).toBe('child-general');
    });

    it('must throw on invalid caller context', () => {
        expect(() => {
            new Parent().$private.call(123);
        }).toThrow(new TypeError('Invalid caller outside of the class!'));
    });

});
