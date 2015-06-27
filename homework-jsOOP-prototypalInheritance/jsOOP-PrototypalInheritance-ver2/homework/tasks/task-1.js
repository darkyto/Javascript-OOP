/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`

  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
	  * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)

  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * // method removeAttribute(attribute)
  */

function solve() {

    function isValidString(input) {
			if (typeof input === 'string' && input !== '' && input.constructor === String) {
				return true;
			}
			return false;
		}

	function validateType(input) {
		var re = /^[A-Za-z0-9]+$/;
		if (input && isValidString(input) && re.test(input)) {
			return true;
		}
		return false;
	}

	function parseInnerHTML() {

		function isString(str) {
			return typeof str === "string" ||
			(typeof str === "object" && str.constructor === String);
		}

		function checkObjectProperties(obj) {
			var prop;
			for(prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					return false;
				}
			}
			return true;
		}

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

	function validateAttributes(input) {
        var re = /^[A-Za-z0-9\-]+$/;
        if (typeof input === 'string' && input.length && re.test(input)) {
            return true;
        }
        return false;
    }

	var domElement = (function () {

		var domElement = {
			
			init: function(type) {
 				if (!validateType(type)) {
					throw new Error('Invalid input at [domElement.type]');
				}
				this.type = type;
				this.attributes = {};
				this.children = [];    

				return this;
			},
			appendChild: function(child) {
				if (typeof child !== 'string' || typeof child !== 'object') {
                    child.parent = this;
                }
                this.children.push(child);
				return this;
			},
			addAttribute: function(name, value) {
				if (!validateAttributes(name)) {
					throw new Error('Inalid input at [attributes]');
				}
				this.attributes[name] = value;
				return this;
			}, 
			removeAttribute: function (inputAttr) {
				if (!(validateAttributes(inputAttr) && this.attributes[inputAttr])) {
                    throw new Error('Invalid attribute!');
                };

                delete this.attributes[inputAttr];

                return this;
            },
            get innerHTML() {
				return parseInnerHTML.call(this);
			}
		};

		Object.defineProperty(domElement, 'type' , {
				get : function() {
					return this._type;
				},
				set : function(value) {
					if (!validateType(value)) {
                        throw new Error('Invalid input at type value setter!');
                    }
					this._type = value;
				}
		});
		Object.defineProperty(domElement, 'content' , {
				get : function() {
					return this._content || '';
				},
				set : function(value) {
					this._content = value;
				}
		});
		Object.defineProperty(domElement, 'parent' , {
				get : function() {
					return this._parent;
				},
				set : function(value) {
					this._parent = value;
				}
		});
		Object.defineProperty(domElement, 'children' , {
				get : function() {
					return this._children || [];
				},
				set : function(value) {
					this._children = value;
				}
		});
		Object.defineProperty(domElement, 'attributes' , {
				get : function() {
					return this._attributes || {};
				},
				set : function(value) {
					this._attributes = value;
				}
		});

		return domElement;
	} ());

return domElement;
}

module.exports = solve;

/*
var domElement = solve();

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
*/	
