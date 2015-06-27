function solve() {
    // 'use strict';
    function validateType(input) {
        var re = /^[A-Za-z0-9]+$/;
        if (typeof input === 'string' && input.length && re.test(input)) {
            return true;
        }
        return false;
    }

    function validateAttributes(input) {
        var re = /^[A-Za-z0-9\-]+$/;
        if (typeof input === 'string' && input.length && re.test(input)) {
            return true;
        }
        return false;
    }

    function checkObjectProperties(obj) {
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }

    function isString(str) {
        return typeof str === "string" ||
            (typeof str === "object" && str.constructor === String);
    }

    function parseInnerHTML() {
        var html = '',
            keys = [],
            key,
            i,
            len,
            that = this;

        html += '<' + that.type;
        if (!checkObjectProperties(that.attributes)) {
            for (key in that.attributes) {
                if (that.attributes.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            keys.sort();
            len = keys.length;
            for (i = 0; i < len; i += 1) {
                html += ' ' + keys[i] + '="' + that.attributes[keys[i]] + '"';
            }
        }

        html += '>';
        if (that.children.length > 0) {
            len = that.children.length;
            for (i = 0; i < len; i += 1) {
                if (isString(that.children[i])) {
                    html += that.children[i];
                } else {
                    html += that.children[i].innerHTML;
                }
            }
        } else if (that.content) {
            html += that.content;
        }
        html += '</' + that.type + '>';

        return html;
    }


    var domElement = (function () {
        var domElement = {
            get type() {
                return this._type;
            },
            set type(value) {
                if (!validateType(value)) {
                    throw new Error('Invalid input at type value setter!');
                }
                this._type = value;
            },
            get content() {
                return this._content || '';
            },
            set content(value) {
                this._content = value;
            },
            get attributes() {
                return this._attributes;
            },
            set attributes(value) {
                this._attributes = value;
            },
            get children() {
                return this._children;
            },
            set children(value) {
                this._children = value;
            },
            get parent() {
                return this._parent;
            },
            set parent(value) {
                this._parent = value;
            },
            init: function (type) {

                this.type = type;
                this.parent;
                this.content;
                this.attributes = {};
                this.children = [];
                this.innerHTML;

                return this;
            },
            appendChild: function(child) {
                
                child.parent = this;
                this.children.push(child);
                return this;
            },
            addAttribute: function (name, value) {
                if (!validateAttributes(name)) {
                    throw new Error('Invalid input at attribute name');
                }
                this.attributes[name] = value;
                return this;
            },
            removeAttribute: function (inputAttr) {
                if (!(validateAttributes(inputAttr) && this.attributes[inputAttr])) {
                    throw new Error('Invalid attribute!');
                }

                delete this.attributes[inputAttr];

                return this;
            },
            get innerHTML() {
                return parseInnerHTML.call(this);
            }
        };
        return domElement;
    }());

    return domElement;
}

module.exports = solve;