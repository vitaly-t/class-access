'use strict';

var classes = require('./classes');

var Parent = classes.Parent,
    Child = classes.Child;

describe('private', function () {

    it('must override general members', () => {
        var c = new Child();
        expect(c.$private().general).toBe('child-general');
    });

    it('must access the bottom class via pointer', () => {
        var c = new Child();
        expect(c.$private(Child).bottom).toBe('bottom');
        c.setBottom(123);
        expect(c.$private(c).bottom).toBe(123);
        expect(c.$private(c.constructor.name).bottom).toBe(123);
        expect(c.$private(Child).bottom).toBe(123);
        expect(c.$private(Child.name).bottom).toBe(123);
    });

    it('must not override named members', () => {
        expect(new Child().$private(Parent).named).toBe('parent-named');
        expect(new Child().$private(Parent.name).text).toBe('parent-text');
    });

    it('must throw on invalid caller context', () => {
        expect(() => {
            new Parent().$private.call(123);
        }).toThrow(new TypeError('Invalid caller outside of the class!'));
    });

});
