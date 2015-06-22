function solve() {
    var Person = (function() {
        function validateName(input) {
        	// regex to check if ALL are Latin and if Lenght of input within 3 and 20
            var re = /^[a-zA-Z]{3,20}$/g;
            return re.test(input);
        }

        function validateAge(input) {
            if (isNaN(input) || input < 0 || input > 150) {
                return false;
            }
            return true;
        }

        function Person(firstname, lastname, age) {
            if (typeof firstname !== 'string' || !validateName(firstname)) {
                throw new Error('Invalid input at [firstname]');
            }
            if (typeof lastname !== 'string' || !validateName(lastname)) {
                throw new Error('Invalid input at [lastname]');
            }
            if (!validateAge(age)) {
                throw new Error('Invalid input at [age]');
            }
            this._firstname = firstname;
            this._lastname = lastname;
            this._age = age;
        }
        Object.defineProperty(Person.prototype, 'firstname', {
            get: function() {
                return this._firstname;
            },
            set: function (value) {
                if (typeof firstname !== 'string' || !validateName(firstname)) {
                    throw new Error('Invalid input at [firstname]');
                }
                this._firstname = value;
            }
        });
        Object.defineProperty(Person.prototype, 'lastname', {
            get: function() {
                return this._lastname;
            },
            set: function (value) {
                if (typeof lastname !== 'string' || !validateName(lastname)) {
                    throw new Error('Invalid input at [firstname]');
                }
                this._lastname = value;
            }
        });
        Object.defineProperty(Person.prototype, 'age', {
            get: function() {
                return this._age;
            },
            set: function (value) {
                if (!validateAge(age)) {
                    throw new Error('Invalid input at [age]');
                }
                this._age = value;
            }
        });
        Object.defineProperty(Person.prototype, 'fullname', {
            get: function() {
                return this.firstname + ' ' + this._lastname;
            },
            set: function (value) {
            	if (typeof value !== 'string') {
            		throw new Error('Invalid input at [fullname]');
            	};
                var namesArr = value.split(' ');
                this._firstname = namesArr[0];
                this._lastname = namesArr[1];
            }
        });

        Person.prototype.introduce = function () {
            return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
        };
        return Person;
    }());
    return Person;
}
module.exports = solve;