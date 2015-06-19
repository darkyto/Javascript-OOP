function sum(arr) {

	if (arr.length === 0) {
		return null;
	}
	else if (arr ===  undefined) {
		throw "Undefined array";
	}
	else {
		var result = 0;
		var tempArr = arr.map(Number);
		result = tempArr.reduce(function(a, b) {
	  				return a + b;
				});
		if (isNaN(result)) {
			throw 'Invalid elements (no numbers)';
		}
		else {
			return result;			
		}

	}
}
module.exports = sum;

