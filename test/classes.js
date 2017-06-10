'use strict';

var AccessSpecifier = require('../');

class Parent extends AccessSpecifier {
    constructor() {
        super();
        this.$protected.shared = 'hello';
        this.$private().general = 'parent-general';
        this.$private(Parent).named = 'parent-named';
        this.$private(Parent.name).text = 'parent-text';
    }

    setBottom(value) {
        this.$private(this).bottom = value;
    }
}

class Child extends Parent {
    constructor() {
        super();
        this.$protected.shared = 'world';
        this.$private().general = 'child-general';
        this.$private(Child).named = 'child-named';
        this.$private(Child.name).text = 'child-text';
        this.$private(Child).bottom = 'bottom';
    }
}

class SealedParent extends AccessSpecifier {
    constructor() {
        super();
        this.sealClass(SealedParent);
    }
}

class ChildOfSealed extends SealedParent {

}

module.exports = {
    AccessSpecifier,
    Parent,
    Child,
    SealedParent,
    ChildOfSealed
};
