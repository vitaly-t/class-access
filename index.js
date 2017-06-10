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
                    name = key instanceof AccessSpecifier ? key.constructor.name : key;
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
            value: function (cls) {
                verifyCaller(this);
                cls = cls && cls.name || cls;
                if (!cls || typeof cls !== 'string') {
                    throw new TypeError('Parameter ');
                }
                if (cls !== className) {
                    throw new TypeError('Class \'' + cls + '\' is non-extendable!');
                }
            }
        });

        function verifyCaller(caller) {
            if (caller !== self) {
                throw new TypeError('Invalid access call!');
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
