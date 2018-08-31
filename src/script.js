$(document).ready(function() {
  var study = 25;//Default,on load page,session time
  var brk = 5; //Default,on load page, break time
  var mode = false; //App mode
  var action; //variable for the setTimeout for the minutes
  var action2; // variable for the setTimeout for the seconds
  var x=0; //variable necessary to get the min and sec to display
  var breakSound=new Audio(' ./sounds/Circles0.mp3');
  var sessionSound=new Audio(' ./sounds/Chord0.mp3');


  $("#spanMin").html(format($("#sliderWork").val()));

  //Modify the session duration and get and show values
  function getValues(){
    $("#sessionDisplay").html($("#sliderWork").val());
    study = $("#sliderWork").val();
    $("#breakDisplay").html($("#sliderBreak").val());
    brk = $("#sliderBreak").val();
  }

  $('#sliderWork').on('input',getValues);
  $('#sliderBreak').on('input',getValues);
  $('#sliderWork').on('load',getValues());
  $('#sliderBreak').on('load',getValues());
  $('#sliderWork').on('change',function() {
    var selectedMin = format($("#sliderWork").val());
    format($("#spanMin").html(selectedMin));
  });

  //Activate & stop timer:
  $("#displayBox").click(function() {
    //startAction();
    if(!mode) {
    beginCD();
    $('#sessionBox').addClass('hidden');
    $('#breakBox').addClass('hidden');
    $('h1').addClass('show_h1');
    $('h2').addClass('show_h2');
    $('.not_active').addClass('show_notActive');
    $('#blueContainer').css('animation', 'none '+ (study*60)+'s' +' linear infinite');
    $('#blueContainer2').css('animation', 'none '+ (brk*60)+'s' +' linear infinite');
    } else {
      StopCount();
      $('#sessionBox').removeClass('hidden');
      $('#breakBox').removeClass('hidden');
      $('h1').removeClass('show_h1');
      $('h2').removeClass('show_h2');
      $('.not_active').removeClass('show_notActive');
      $('#blueContainer').css('animation', 'none');
      $('#blueContainer2').css('animation', 'none');
    }
  });

  //Start counting
  function beginCD () {
    mode = true;
    var z=Math.floor((study*60-x)%3600/60); 
    var q=Math.floor((study*60-x)%3600%60);
    $('.msg1').addClass('not_active').addClass('show_notActive');
    $('.msg2').removeClass('not_active').removeClass('show_notActive');
    $('#blueContainer').css('opacity','1');
    $('#blueContainer2').css('opacity','0');
    $('#blueContainer').css('animation-name','rotatingSeconds');
    $('#blueContainer2').css('animation-name','none');
    $("#spanMin").html(format(z));
    $("#spanSec").html(format(q));
    x++;
    action = setTimeout(function() {
      beginCD()
    },1000);
    if(z===0 && q===0) {
      breakSound.play();
      clearTimeout(action);
      x=0;
      breakCD();

    }
  }

  function breakCD () {
    var z2=Math.floor((brk*60-x)%3600/60);
    var q2=Math.floor((brk*60-x)%3600%60);
    $('.msg1').removeClass('not_active').removeClass('show_notActive');
    $('.msg2').addClass('not_active').addClass('show_notActive');
    $('#blueContainer').css('opacity','0');
    $('#blueContainer2').css('opacity','1');
    $('#blueContainer').css('animation-name','none');
    $('#blueContainer2').css('animation-name','rotatingSeconds2');
    $("#spanMin").html(format(z2));
    $("#spanSec").html(format(q2));
    x++;
    action2 = setTimeout(function() {
      breakCD()
    },1000);
    if(z2===0 && q2===0) {
      sessionSound.play();
      clearTimeout(action2);
      x=0;
      beginCD();
    }
  }

  //Pause timer
  function StopCount() {
    clearTimeout(action);
    clearTimeout(action2);
    $("#spanMin").html(format($("#sliderWork").val()));
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
