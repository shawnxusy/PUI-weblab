// Your task is to fill in the rest of this file with your state machine, and then save
// the file to statemachine.js.
function StateMachine(description, elementToAttach) {

	var stateTable = [];
	var currentState = {};

	var states = description["states"];

	for (var i = 0; i < states.length; i++) {
		if (states[i]["name"] === "start"){
			currentState = states[i];
		}

		// Import the states into the stateTable
		stateObj = {}
		transitionObj = []

		// Import transitions for the state first
		for (var t = 0; t < states[i]["transitions"].length; t++) {
			transitionObj.push(states[i]["transitions"][t]);
		}

		// Initialize the state
		stateObj = { name: states[i]["name"], transitions: transitionObj };

		// Append the state to the stateTable
		stateTable.push(stateObj);

	}

	// Helper function to get status
	function getStatus() {
		return currentState;
	}

	// Core function to update and transit states
	// The function goes through all the transitions for the current status,
	// and match the input_type to any matching transition's input,
	// then carry out the action, and update the currentStatus
	function updateState(input_event, input_type) {
		var avlbTransitions = currentState["transitions"];
		for (var s = 0; s < avlbTransitions.length; s++) {
			// If the input type matches the transition's input
			if (avlbTransitions[s]["input"] === input_type) {
				// Carry out the action
				avlbTransitions[s]["action"](input_event, elementToAttach);

				// Then update currentStatus to endState
				var endState = avlbTransitions[s]["endState"]; // Just to make the code a little cleaner
				currentState = findStateWithName(endState);
			}
		}
	}

	// Helper function to return a state in stateTable with a given name
	function findStateWithName(state_name) {
		for (var i = 0; i < stateTable.length; i++) {
			if (stateTable[i]["name"] === state_name) {
				return stateTable[i];
			}
		}
	}


	$(elementToAttach).on("mousedown", function() {
		updateState(event, 'mousedown');
	});

	$(elementToAttach).on("mouseup", function() {
		updateState(event, 'mouseup');
	});

	$(elementToAttach).on("click", function() {
		updateState(event, 'click');
	});

	$(elementToAttach).on("mousemove", function() {
		updateState(event, 'mousemove');
	});

	$(elementToAttach).on("mouseenter", function() {
		updateState(event, 'mouseenter');
	});

	$(elementToAttach).on("mouseleave", function() {
		updateState(event, 'mouseleave');
	});

	$(elementToAttach).on("keydown", function() {
		updateState(event, 'keydown');
	});

	$(elementToAttach).on("timertick30ms", function() {
		updateState(event, 'timertick30ms');
	});

	// // Add event listeners to the element. OMG do I have to add them one by one?
	// elementToAttach.addEventListener('mousedown', function() {
	// 		updateState(event, 'mousedown');
	// 	}, false
	// );

	// elementToAttach.addEventListener('mouseup', function() {
	// 		updateState(event, 'mouseup');
	// 	}, false
	// );

	// elementToAttach.addEventListener('click', function() {
	// 		updateState(event, 'click');
	// 	}, false
	// );	

	// elementToAttach.addEventListener('mousemove', function() {
	// 		updateState(event, 'mousemove');
	// 	}, false
	// );	

	// elementToAttach.addEventListener('mouseenter', function() {
	// 		updateState(event, 'mouseenter');
	// 	}, false
	// );	

	// elementToAttach.addEventListener('mouseleave', function() {
	// 		updateState(event, 'mouseleave');
	// 	}, false
	// );	

	// elementToAttach.addEventListener('keydown', function() {
	// 		updateState(event, 'keydown');
	// 	}, false
	// );	

	// // Apparently, that is true...
	// elementToAttach.addEventListener('timertick30ms', function() {
	// 		updateState(event, 'timertick30ms');
	// 	}, false
	// );	

}

