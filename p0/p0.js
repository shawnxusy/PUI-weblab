
/* 
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 0: JavaScript exercises
Author : 
Description : Exercises for Project 0
Created : 
Modified :
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
*/

/*
* Summary: Adds a header element to the body of the html document with the
*   specified level and content.
* Parameters:
*   content: the text content of the header
*   level: the level of the header (can be from h1 to h5). If the value is not
*       a valid number or the passed in parameter is too high, defaults to h3.
* Return: undefined (i.e. just type in 'return').
*/
function addHeader(content, level) {

	//See if level is legitimate
	if (isNaN(level) || level > 5 || level < 1) {level = 3;}

	//Generating new headers
	var newHeader = document.createElement('h' + level);
	newHeader.innerHTML = content;
	document.body.appendChild(newHeader); 
	
	return;
}

/*
* Summary: Generates an array containing the first N numbers of the Fibonacci Sequence. 
*   If the parameters passed are invalid (smaller than one or not a number), the function 
*   should return undefined.
* Parameters:
*   n: the number of Fibonacci numbers to generate
* Return: An array of the first n Fibonacci numbers. If n is invalid, returns undefined
*/
function fibonacci(n) {
	//Parsing n
	if (isNaN(n) || n < 1) {return undefined;}

	//Start the array
	if (n === 1) {return [0];}

	else if (n === 2) {return [0,1];}

	else{
		var fib = [0,1];
		for (i = 2; i < n; i++)	{
			fib[i] = fib[i-1] + fib[i-2];
			}
		return fib;
		}
}

/*
* Summary: Takes in a string and returns the sum of every number in that string. Words, blank 
*   space, and things that do not start with a number are ignored. Returns 0 if there are no 
*   numbers in the string or if the argument is not a string.
* Parameters:
*   str: The string to parse which contains one or more numbers
* Return: The sum of all the numbers in the string
*/
function addUpNumbers(str) {
	var i = 0;
	var sum = 0;
	while (i < str.length){
		//If the char is a number
		if (!isNaN(parseFloat(str.charAt(i)))){
			var j = 1;
			while (!isNaN(parseFloat(str.charAt(i+j)))){
				j++;
			}
			sum += parseFloat(str.substring(i,i+j));
			i = i + j;
		}

		//If the char is space, skip it
		else if (str.charAt(i) == ' '){
			i++;
		}

		//If the char is not a number, loop until space
		else{
			var t = 1;
			while ((i+t)<=str.length && (str.charAt(i+t)!=' ')){
					t++;
			}
			i = i + t;
		}
	}
	return sum;
}

/*
* Summary: Applies a function to every element in an array and returns the resulting array.
* Parameters:
*   array: the input array.
*   functionToApply: the function to apply.
* Return: The array that is a result of applying the function to every element in the input 
*   array. Returns undefined if parameters are invalid.
*/
function map(array, functionToApply) {
	for (i = 0; i < array.length; i++){
		array[i] = functionToApply.apply(null, [array[i]]);
		if (array[i] === undefined || array[i] === null) {
			return undefined;
		}
	}
	return array;
}

/*
* Summary: Run the above 4 functions each with three test cases.
*/
function runTests(){
	//Add header
	addHeader("Javascript is awesome", 2);
	addHeader("Winter is coming", 0);
	addHeader("Fire and Blood", 'p2p');
	document.body.innerHTML += '<br>';

	//Fib
	addHeader("The result of Fibonacci is: " + fibonacci(11), 3);
	addHeader("The result of Fibonacci is: " + fibonacci(1), 3);
	addHeader("The result of Fibonacci is: " + fibonacci('p'), 3);
	document.body.innerHTML += '<br>';

	//Sum
	var testString1 = "order 5 pizzas, 18 drinks,12 22 more coke2lite, about 300 bucks";
	addHeader("The sum of numbers in the string \"" + testString1 + "\" is: " + addUpNumbers(testString1), 3);
	var testString2 = "5810 Forbes Avenue, PA 15217, U.S.A at505";
	addHeader("The sum of numbers in the string \"" + testString2 + "\" is: " + addUpNumbers(testString2), 3);
	var testString3 = "123cookies are waiting on 5th floor, 100 kids there.";
	addHeader("The sum of numbers in the string \"" + testString3 + "\" is: " + addUpNumbers(testString3), 3);
	document.body.innerHTML += '<br>';

	//Map
	addHeader(map([1,2,3,4,5], function (x) { return x * 2;}), 3);
	addHeader(map(['p','rte','view','cat','earth'], function (x) { return x[0];}), 3);
	addHeader(map([10,15,20], function (x) { return x * x;}), 3);

	return;
}

// To run your tests when the window loads, uncomment the code below:

window.onload = function () {
    runTests();
}
