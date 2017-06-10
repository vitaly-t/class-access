'use strict';

var classes = require('./classes');

var SealedChild = classes.SealedChild;

describe('seal', function () {

    it('must throw when extending a sealed class', () => {
        expect(() => {
            new SealedChild();
        }).toThrow(new TypeError('Class \'SealedParent\' is non-extendable!'));
    });
});
