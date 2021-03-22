/* Include static file wevserve library */
var static = require('node-static');

/* include http server library*/

var http = require('http');

/* Assume running on Heroku*/
var port = process.env.PORT;
var directory = __dirname + '/public';

/* If not on Heroku */
if(typeof port == 'undefined' || !port){
	directory = './public';
	port = 8080;
}

/* Deliver files form the filesystem */
var file = new static.Server(directory);

/* Construct an http server that gets files from the file */
var app = http.createServer(
	function(request, response){
		request.addListener('end',
			function(){
				file.serve(request,response);
			}
		).resume();
	}
).listen(port);
console.log('Hurray, we are running');		
