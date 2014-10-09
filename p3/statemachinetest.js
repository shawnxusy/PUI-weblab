// Sample test file for the state machine class 
// Implements a simple draggable div which changes color when pressed. 
 
// Record the location where the div was clicked. 
function record_down_location(e, attachedElement) { 
  attachedElement.downX = e.pageX;
  attachedElement.downY = e.pageY;
  attachedElement.origLeft = parseInt(attachedElement.position().left) || 0; 
  attachedElement.origTop = parseInt(attachedElement.position().top) || 0; 
  $(attachedElement).css('background-color', 'blue'); 
}

// When the div is released, make its background color red again. 
function letGo(attachedElement) { 
  $(attachedElement).css('background-color', 'red'); 
}

// Log that the div was dropped and change color 
function do_drop(e, attachedElement) { 
  console.log("do drop: " + e.pageX + ", " + e.pageY);
  letGo(attachedElement);
}

// When mouse moves outside of region, log this. 
function move_out(e, attachedElement) { 
  console.log("move out: " + e.pageX + ", " + e.pageY);
  letGo(attachedElement);
}

// Moves the icon when the mouse moves. 
function move_icon(e, attachedElement) { 
  console.log("move icon: " + e.pageX + ", " + e.pageY); 

  $(attachedElement).offset({ left: (attachedElement.origLeft + e.pageX - attachedElement.downX), top: (attachedElement.origTop + e.pageY - attachedElement.downY) });
}

// Provides the state machine description and creates a new state machine attached to myDiv 
window.onload = function() { 
  var myDiv = $( "#myDiv" ).first();  
   
  var sampleDescription = { 
    states: [ 
    { 
      name: "start", 
      transitions: [ 
        { 
          input: "mousedown",  
          action: record_down_location, 
          endState: "down" 
        }] 
    }, 
    { 
      name: "down", 
      transitions: [ 
        { 
          input: "mouseup", 
          action: do_drop, 
          endState: "start" 
        }, 
        { 
          input: "mousemove", 
          action: move_icon, 
          endState: "down" 
        }, 
        { 
          input: "mouseleave", 
          action: move_out, 
          endState: "start" 
        } 
      ]
    }
    ] 
  };

  var stateMachine = new StateMachine(sampleDescription, myDiv); 
};