/* Author: Arnaud */

$(document).ready(function(){
  
  //Pushes initial state
  History.pushState({}, "Questionnaire", "" );
  
  // Range input support for browsers that don't support it...yet (looking at you Firefox!)
  // Adapted from a small portion of the amazing http://thepixelator.com/'s main script
  if (!Modernizr.inputtypes.range){
    $("input[type=range]").each(function() {
      var range = $(this);
      var slider_div = $("<div class=\"slider\" />");
      slider_div.width(range.width());
      range.after(slider_div.slider({
          min: parseFloat(range.attr("min")),
          max: parseFloat(range.attr("max")),
          value: parseFloat(range.val()),
          step: parseFloat(range.attr("step")),
          slide: function(evt, ui) { range.val(ui.value); displayHint(range)},
          change: function(evt, ui) { range.val(ui.value); displayHint(range)}
      }));
    }).hide();
  }
  
  //This displays the hint of a rangeInput jQuery obj based on: 
  // - the data attribute of the range
  // - its value
  // - the values set in hints.js
  var displayHint = function(rangeInput) {
    //Check that we have a data attribute and id
    if (!rangeInput.attr("data-hint") | !rangeInput.attr("id")) { return; }
    //Check that we have a corresponding hint to work with
    var rangeId = rangeInput.attr("id");
    var hintType = rangeInput.attr("data-hint");
    if (typeof hints.hintType === undefined) { return; }
    
    //Now, set the hint div and add it to DOM
    if ($("#"+rangeId+"-hint").length) {
      //If we already have a hint div, simply selects it
      var hintDiv = $("#"+rangeId+"-hint");
    } else {
      var hintDiv = $("<div />")
          .attr("id", rangeId+"-hint")
          .attr("class","hint");
      if(!Modernizr.inputtypes.range){
        //If we don't have range support, it means a fallback div (built by jQ UI) 
        //is the immediate sibling of our range input. 
        //Thus, insert the hint one step further
        hintDiv.insertAfter(rangeInput.next())
      } else {
        //Normal case.
        hintDiv.insertAfter(rangeInput);
      }
    }
    
    //Fill the hint div with new value
    var hintContent = hints[hintType][rangeInput.val()];
    hintDiv.html(hintContent); 
  }
  
  //Diplays the hints on initialization
  $("input[type=range]").each(function() {
    displayHint($(this));
  });
  
  //Trigger the hint change each time user change the slider value
  $("input[type=range]").bind("change", function() {
    displayHint($(this));
  });
  
  $("#submit").click(function(){
    displayResults();
    return false;
  });
  
  //When user hits the "back" button, it goes back to the form
  History.Adapter.bind(window,'statechange',function(){
    var State = History.getState();
    if(State.title === "Questionnaire") {
      displayForm();
    }
  });
  
  var displayForm = function() {
    $("#results").hide();
    $("form").show();
    
    History.pushState({}, "Questionnaire", "" );
  };
  
  var displayResults = function() {
    //Saves form data, hide the form
    var formData = magicAlgo.evaluate($("form"));
    $("form").hide();
    
    //What's that?!11
    magicAlgo.secretDarkSauce();
    
    //Compute advices
    //var advices = "The algorithm is not implemented yet. Try again later :)"
    var advices = magicAlgo.computeResults();
    
    //Insert and display results
    if(! $("#results").length) {
      $("<div id=\"results\" />").html(advices).appendTo("#container").show();
    } else {
      $("#results").html(advices).show();
    }
    
    //Push history state
    History.pushState(formData, "Results", "result" )
    
  };
  
  
})






















