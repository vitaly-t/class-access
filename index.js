(function (window) {
    'use strict';

    function AccessSpecifier() {

        if (!(this instanceof AccessSpecifier)) {
            throw new TypeError('Class constructors cannot be invoked without \'new\'!');
        }

        var _protected = {}, _private = {}, className = this.constructor.name, self = this;

        Object.defineProperty(this, 'isAbstract', {
            value: className === 'AccessSpecifier'
        });

        Object.defineProperty(this, 'className', {
            value: className
        });

        Object.defineProperty(this, '$protected', {
            get: function () {
                verifyCaller(this);
                return _protected;
            }
        });

        Object.defineProperty(this, '$private', {
            value: function (key) {
                verifyCaller(this);
                var name;
                if (arguments.length) {
                    name = key instanceof AccessSpecifier ? key.constructor.name : (key && key.name || key);
                } else {
                    name = this.constructor.name;
                }
                if (!(name in _private)) {
                    _private[name] = {};
                }
                return _private[name];
            }
        });

        Object.defineProperty(this, 'sealClass', {
            value: function (name) {
                verifyCaller(this);
                name = name && name.name || name;
                if (!name || typeof name !== 'string') {
                    throw new TypeError('Invalid \'name\' parameter!');
                }
                if (name !== className) {
                    throw new TypeError('Class \'' + name + '\' is non-extendable!');
                }
            }
        });

        function verifyCaller(caller) {
            if (caller !== self) {
                throw new TypeError('Invalid caller outside of the class!');
            }
        }
    }

    /* istanbul ignore else */
    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        module.exports = AccessSpecifier;
    }
    else {
        window.AccessSpecifier = AccessSpecifier;
    }
})(this);
