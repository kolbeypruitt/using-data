
$( document ).ready(function() {
  var dataSource;

  $.getJSON('data.json', function(data) {
    $('#list').append("<h1>Click a message to see full chat.</h1>");
    for (var i = 0; i < data.length; i++) {
      rowMaker(data[i]);
    }
  });

});

function rowMaker(obj) {
  var rowDiv = $("<div class='rowDiv' id='"+obj['id']+"'></div>");
  var created_at = $("<p class='date'>"+new Date(obj['created_at'])+"</p>");
  var requested_by = $("<h4>"+obj['requested_by']+"</h4>");
  var initial_message = $("<p>"+obj['initial_message']+"</p>");
  rowDiv.append(created_at);
  rowDiv.append(requested_by);
  rowDiv.append(initial_message);
  rowDiv.click(function() {
    var id = $(this).attr('id');
    openChat(id);
  });
  $('#list').append(rowDiv);
}

function openChat(id) {
  var obj;
  $.getJSON('data.json', function(data) {
    for (var i = 0; i < data.length; i++) {
      if(data[i].id === id) {
        obj = data[i];
      }
    }
    return obj;
  }).done(function () {
    $('#list').empty();
    $('#list').append("<h2 class='chatTitle'>List of messages started by "+obj['requested_by']+" on</h2><h2>"+new Date(obj['created_at'])+" <a href='/' class='backBtn'>Back to all chats</a></h2>");
    var rowDiv = $("<div class='rowDiv' id='"+obj['id']+"'></div>");
    rowDiv.append("<h5 style='font-style: italic;'>Initial Message</h5>");
    var created_at = $("<p class='date'>"+new Date(obj['created_at'])+"</p>");
    var requested_by = $("<h4>"+obj['requested_by']+"</h4>");
    var initial_message = $("<p>"+obj['initial_message']+"</p>");
    rowDiv.append(created_at);
    rowDiv.append(requested_by);
    rowDiv.append(initial_message);
  
    $('#list').append(rowDiv);
    listTranscript(obj.transcript);
  })
  
  function listTranscript(arr) {
    for (var i = 0; i < arr.length; i++) {
      var rowDiv = $("<div class='rowDiv' id='"+obj['id']+"'></div>");
      var date = $("<p class='date'>"+new Date(arr[i].date)+"</p>");
      var alias = $("<p>"+arr[i].alias+"</p>");
      var message = $("<p>"+arr[i].message+"</p>");
      rowDiv.append(date);
      rowDiv.append(alias);
      rowDiv.append(message);
      $('#list').append(rowDiv);
    }
  }
  
}