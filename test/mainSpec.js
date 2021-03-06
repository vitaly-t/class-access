'use strict';

var classes = require('./classes');

var AccessSpecifier = classes.AccessSpecifier,
    Parent = classes.Parent;

var baseObj = new AccessSpecifier();
var classObj = new Parent();

describe('class protocol', function () {

    it('must detect abstract instantiation', () => {
        expect(baseObj.isAbstract).toBe(true);
        expect(classObj.isAbstract).toBe(false);
    });

    it('must correctly report the class name', () => {
        expect(baseObj.className).toBe('AccessSpecifier');
        expect(classObj.className).toBe('Parent');
    });

    it('must have no enumerable members in the base type', () => {
        var found = [];
        for (var a in baseObj) {
            found.push(a);
        }
        expect(found).toEqual([]);
    });

    it('must not allow function-style calls', () => {
        expect(() => {
            /*eslint new-cap: 0*/
            AccessSpecifier();
        }).toThrow(new TypeError('Class constructors cannot be invoked without \'new\'!'));
    });

    describe('members configuration', () => {
        var members = ['isAbstract', 'className', 'sealClass', '$protected', '$private'];
        it('must not allow overrides', () => {
            members.forEach(m => {
                expect(() => {
                    baseObj[m] = null;
                }).toThrow();
            });
        });
        it('must not allow deletion', () => {
            members.forEach(m => {
                expect(() => {
                    delete baseObj[m];
                }).toThrow();
            });
        });
    });

});
