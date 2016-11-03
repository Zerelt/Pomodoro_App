$(document).ready(function() {
  var study = 25;//Default,on load page,session time
  var brk = 5; //Default,on load page, break time
  //var seconds = 0; not needed anymore, was for old version
  var mode = false; //App mode
  var action; //variable for the setTimeout for the minutes
  var action2; // variable for the setTimeout for the seconds
  var x=0; //variable necessary to get the min and sec to display


  $("#sessionDisplay").html(study);
  $("#breakDisplay").html(brk);

  //Modify the session duration
  //if(!mode) { //this doesn't work because the if gets evaluated only once - when the page loads; that's why this condition has to be inside the click handlers, so it gets evaluated when you click;

    $("#sessionPlus").click(function() {
    if(!mode) {
      study++;
    }
    $("#sessionDisplay").html(study);
  });
  $("#sessionMinus").click(function() {
    if (study > 1 && !mode) {
      study--;
    }
    $("#sessionDisplay").html(study);
  });

  //Modify break duration
  $("#breakPlus").click(function() {
    if (!mode) {
    brk++;
    }
    $("#breakDisplay").html(brk);
  });
  $("#breakMinus").click(function() {
    if (brk > 1 && !mode) {
      brk--;
    }
    $("#breakDisplay").html(brk);
  });

  //}

  //Activate timer:
  $("#mainDisplay").click(function() {
    //startAction();
    if(!mode) {
    beginCD();
    }
  });

  //Reset everything
  $("#reset").click(function() {
    StopCount();
    study = 25;
    brk = 5;
    $("#sessionDisplay").html(study);
    $("#breakDisplay").html(brk);

  });

  //Functions:
  //Start counting
  function beginCD () {
    mode = true;
    var z=Math.floor((study*60-x)%3600/60); //praise stackoverflow !
    var q=Math.floor((study*60-x)%3600%60); //praise stackoverflow !
    $("#spanMin").html(format(z) + ":");
    $("#spanSec").html(format(q));
    x++;
    action = setTimeout(function() {
      beginCD()
    },1000);
    if(z===0 && q===0) {
      clearTimeout(action);
      x=0;
      breakCD();

    }
  }

  function breakCD () {
    var z2=Math.floor((brk*60-x)%3600/60);
    var q2=Math.floor((brk*60-x)%3600%60);
    $("#spanMin").html(format(z2) + ":");
    $("#spanSec").html(format(q2));
    x++;
    action2 = setTimeout(function() {
      breakCD()
    },1000);
    if(z2===0 && q2===0) {
      clearTimeout(action2);
      x=0;
      beginCD();
    }
  }

  //Pause timer
  function StopCount() {
    //clearTimeout(action);
    //clearTimeout(action2);
    clearTimeout(action);
    clearTimeout(action2);
    $("#spanMin").html(format(0)+ ":");
    $("#spanSec").html(format(0));
    mode = false;
    x=0;
  }

  //Format numbers display
  function format(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

});