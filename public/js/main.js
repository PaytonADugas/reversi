/* functions for general use*/

function getURLParameters(whichParam){
  var pageURL = window.location.search.substring(1);
  var pageURLVariables = pageURL.split('&');
  for(let i = 0; i < pageURLVariables.length; i++){
    var parameterName = pageURLVariables[i].split('=');
    if(parameterName[0] == whichParam){
      return parameterName[1];
    }
  }
}


var username = getURLParameters('username');
if(username == null){
  username = 'Anonymous'+Math.random();
}

$('#messages').append('<h3>'+username+'<h3>');


/* connect to socket Server*/

var socket = io.connect();

socket.on('log',function(array)){
  console.log.apply(console,array);
});
