'use strict';

var AccessSpecifier = require('../');

class ClassA extends AccessSpecifier {

}

var baseObj = new AccessSpecifier();
var classObj = new ClassA();

describe('protocol', function () {

    it('must detect abstract instantiation', () => {
        expect(baseObj.isAbstract).toBe(true);
        expect(classObj.isAbstract).toBe(false);
    });

    it('must correctly report the class name', () => {
        expect(baseObj.className).toBe('AccessSpecifier');
        expect(classObj.className).toBe('ClassA');
    });

    it('must have no enumerable members in the base type', () => {
        var found = [];
        for (var a in baseObj) {
            found.push(a);
        }
        expect(found).toEqual([]);
    });

    it('must not allow override of any member', () => {
        expect(() => {
            baseObj.isAbstract = null;
        }).toThrow();

        expect(() => {
            baseObj.className = null;
        }).toThrow();

        expect(() => {
            baseObj.sealClass = null;
        }).toThrow();

        expect(() => {
            baseObj.$protected = null;
        }).toThrow();

        expect(() => {
            baseObj.$private = null;
        }).toThrow();
    });

    it('must not allow deletion of any member', () => {
        expect(() => {
            delete baseObj.isAbstract;
        }).toThrow();

        expect(() => {
            delete baseObj.className;
        }).toThrow();

        expect(() => {
            delete baseObj.sealClass;
        }).toThrow();

        expect(() => {
            delete baseObj.$protected;
        }).toThrow();

        expect(() => {
            delete baseObj.$private;
        }).toThrow();

    });
});
