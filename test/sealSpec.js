'use strict';

var classes = require('./classes');

var Parent = classes.Parent,
    SealedChild = classes.SealedChild;

describe('seal', function () {

    it('must work with normal extensions', () => {
        expect(new Parent().sealClass('Parent')).toBeUndefined();
    });

    it('must throw when extending a sealed class', () => {
        expect(() => {
            new SealedChild();
        }).toThrow(new TypeError('Class \'SealedParent\' is non-extendable!'));
    });

    it('must throw on invalid caller context', () => {
        expect(() => {
            new Parent().sealClass.call(123);
        }).toThrow(new TypeError('Invalid caller outside of the class!'));
    });

    it('must throw on invalid parameters', () => {
        var error = new TypeError('Invalid \'name\' parameter!');
        expect(() => {
            new Parent().sealClass();
        }).toThrow(error);
        expect(() => {
            new Parent().sealClass('');
        }).toThrow(error);
    });
});
