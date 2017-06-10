'use strict';

var AccessSpecifier = require('../');

class Parent extends AccessSpecifier {

}

class Child extends Parent {

}

class SealedParent extends AccessSpecifier {
    constructor() {
        super();
        this.sealClass(SealedParent);
    }
}

class SealedChild extends SealedParent {

}

module.exports = {
    AccessSpecifier,
    Parent,
    Child,
    SealedParent,
    SealedChild
};
