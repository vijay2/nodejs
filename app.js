// This is the server-side file of our mobile remote controller app.
// It initializes socket.io and a new express instance.
// Start it by running 'node app.js' from your terminal.


// Creating an express server

var express = require('express'),
	app = express();

// This is needed if the app is run on heroku and other cloud providers:

var port = process.env.PORT || 8080;

// Initialize a new socket.io object. It is bound to 
// the express app, which allows them to coexist.

var io = require('socket.io').listen(app.listen(port));


// App Configuration

// Make the files in the public folder available to the world
app.use(express.static(__dirname + '/public'));


// This is a secret key that prevents others from opening your presentation
// and controlling it. Change it to something that only you know.

var secret = 'kittens';

// Initialize a new socket.io application

var presentation = io.on('connection', function (socket) {

	// A new client has come online. Check the secret key and 
	// emit a "granted" or "denied" message.
	var timevalue=0;
	socket.on('load', function(data){

		socket.emit('access', {
			access: (data.key === secret ? "granted" : "denied")
		});

	});

socket.on('mobilehandler', function(data){
		console.log(timevalue+' mobilehandler2 ');
		
	});

	// Clients send the 'slide-changed' message whenever they navigate to a new slide.
	socket.on('message', function(data){
		console.log(data.currenttimer+" got time value "+data.status );
		presentation.emit('moibilechange', {
			timevalue:data.currenttimer,
			statusvalue:data.states
		});
	});
	socket.on('playerchange', function(data){
		timevalue=data.currTime;
		
		//	tomoble(timevalue);
		//console.log(timevalue+' mobilehandler1 ');
			presentation.emit('syncplayer', {
				sync: data.status,
				currTime: data.currTime
			});
	});
	// Clients send the 'slide-changed' message whenever they navigate to a new slide.

	socket.on('slide-changed', function(data){

		// Check the secret key again
	
		if(data.key === secret) {

			// Tell all connected clients to navigate to the new slide
			
			presentation.emit('navigate', {
				hash: data.hash
			});
		}

	});

});

console.log('Your presentation is running on http://localhost:' + port);