/* Task description */
/*
	Write a function a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `string`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(start, end) {
	if (arguments.length != 2) {
		throw Error;
	}
	var primesArr = [];
	var i ;	
	start = +start;
	end = +end;
	if (start === 0 || start === 1) {
		start = 2;
	}
	for (i = start; i <= end; i++) {
		if (isPrime(i)) {
			primesArr.push(+i);
		}
	}
	return primesArr;
	
	function isPrime (n){
	    if (n < 2) return false;
		    /**
		     * An integer is prime if it is not divisible by any prime less than or equal to its square root
		     **/
		var q = Math.sqrt(n);
		for (var i = 2 ; i <= q; i+=1){
	        if (n % i === 0)
	        {
	            return false;
	        }
		}
		return true;
	}
}

module.exports = findPrimes;

console.log(findPrimes(0,5));