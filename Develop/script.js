// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  var hourToText = function(hour){
    var result = "";
    result = ((hour*1) % 12);
    if((hour*1) % 12 === 0){
      result = "12"
    }
    if((hour*1) >= 12){
      result += "PM";
    }
    else{
      result += "AM";
    }
    return result;
  }

  var createBlock = function(_time){
    var holder = $('<div>');
    holder.addClass('row time-block');
    holder.attr('id', 'hour-'+_time.hour());
    var div = $('<div>');
    div.addClass('col-2 col-md-1 hour text-center py-3');
    var t = hourToText(_time.hour());
    div.text(t);
    var textArea = $('<textarea>');
    textArea.attr('rows','3');
    textArea.addClass('col-8 col-md-10 description');
    var button = $('<button>');
    button.attr('aria-label','save');
    button.addClass('btn saveBtn col-2 col-md-1');
    var i = $('<i>');
    i.attr('aria-hidden','true');
    i.addClass('fas fa-save');
    button.append(i);

    var now = dayjs();
    if(now.hour() < _time.hour()){
      holder.addClass('future');
    }
    else if (now.hour() === _time.hour()){
      holder.addClass('present');
    }
    else{
      holder.addClass('past');
    }

    holder.append(div);
    holder.append(textArea);
    holder.append(button);

    return holder;
  }


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  
  var body = $('body div');

  var now = dayjs();


  for (let index = 0; index < 24; index++) {
    body.append(createBlock(dayjs().hour(index)));
  }
  var currentDay = $('#currentDay');
  var todaysDate = now.format('dddd, MMMM D');
  currentDay.text(todaysDate);

  for (let index = 0; index < 24; index++) {
    const element = $('#hour-'+index);
    element.on('click', 'button', function(event){
      event.preventDefault();
      var textArea = $('#hour-'+index+" > button");
      console.log($(textArea.value()));
      
    });
  }
  
});
