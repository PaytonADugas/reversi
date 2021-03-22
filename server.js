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



var io = require('socket.io')(app);

io.sockets.on('connection', function (socket){
	function log(){
		var array = ['*** Server Log Message: '];
		for(let i = 0; i < arguments.length; i++){
			array.push(arguments[i]);
			console.log(arguments[i]);
		}
		socket.emit('log', array);
		socket.broadcast.emit('log',array);
	}

	log("a web site connected to the server");

	socket.on('disconnect', function(socket){
		log("a web site disconnected to the server");
	});
});
