(function() {
	'use strict';

var gameState = {
		board: [['','',''], ['','',''], ['','','']],
		turn: 'x',
		gameOver: false
	}

var displayBoard = function(gameState) {
	for (var i=0; i<gameState.board.length; i++) {
		var rowArr=gameState.board[i];
		var div=document.createElement('div');
		for (var j=0; j<rowArr.length; j++){
			var span = document.createElement('div');
			span.innerHTML = 'hello';
		}
		document.body.appendChild(span);
	}



}

displayBoard();

})();