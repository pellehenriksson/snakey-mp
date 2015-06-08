var port = 8197;
var io = require('socket.io')(port);
var food;
var time = 1000; // Time between updates in the serverLoop
var players = []; // {id: ..., p: ..., l: ..., d: ..., tail: ..., color: ...};
var playerPoints = []; // {id: ..., points: ...};
var w=900,h=400,cw=10;

/**
 * Initialise the server
 */
function init() {
	food = {p: new vector()};
	setEventHandlers();
	//serverLoop();
	console.log('\nSnakeCave is now running\nPORT: ' + port + '\nLOOP UPDATE: ' + time + 'ms\n');
};


var setEventHandlers = function() {
	io.on('connection', onSocketConnection);
};

/**
 * Functions to run on event
 */
function onSocketConnection(client) {

	client.on( 'disconnect', onClientDisconnect);
	client.on( 'new_player', onNewPlayer );
	client.on( 'update_player', onUpdatePlayer );
	client.on( 'new_food', onNewFood );
};


function onClientDisconnect() {
	var playerId = this.client.id
	this.broadcast.emit('remove_player', playerId);
	
	removePlayerById(playerId);
	console.log('Player ' + playerId + ' disconnected');
	console.log('Total Players Connected ' + players.length);
}


/**
 * New player joins or player require reposition
 */
function onNewPlayer() {
	// Random hex-color 
	// http://www.paulirish.com/2009/random-hex-color-code-snippets/
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);
	
	var player = playerById(this.client.id);
	if (player) {
		player.p = new vector();
	} else {
		player = {id: this.client.id, p: new vector(), l: null, d: null, tail: null, color: color};

		this.emit('new_food', food);
		this.emit('game_points', playerPoints);

		addPlayerToPlayers(player);

		console.log('Player ' + player.id + ' connected.');
		console.log('Total Players Connected ' + players.length);
	}
	io.sockets.emit('new_player', player);
	// Send players, if any
	if (players.length >= 1) {
		this.emit('new_players', players);
	}
	resetPlayerPointsById(player.id);
	updateGamePoints()
};


function onUpdatePlayer(player) {
	// Broadcast player changes to connected players except sender
	this.broadcast.emit('update_player', player);
	updatePlayerInPlayers(player);
};


function onNewFood(player) {
	// Add +1 to snake's tail
	this.broadcast.emit('update_player', player);
	updatePlayerInPlayers(player);
	// Add +1 points
	addPointsByPlayerId(player.id);
	updateGamePoints()

	// Repositioning the food
	food = {p: new vector()};
	// Send food position to all connected players
	io.sockets.emit('new_food', food);
	console.log('New food position (' + food.p.x + ',' + food.p.y + ')');
};


/**************************************************
** GAME CLIENT SENDERS
**************************************************/
// Update clients game points
function updateGamePoints() {
	io.sockets.emit('game_points', playerPoints);
}

function updatePlayers() {
	io.sockets.emit('new_players', players);
}


// /**
// * Server Loop, a tiny step towards interpolation.
// * Server sends data about all stored players.  
// *
// */
// function serverLoop() {
//     setTimeout(function () {
//     	// Send information about 
//     	if (players.length >= 1) {
// 	    	var i;
// 	    	for (i = 0; i < players.length; i++) {
// 	    		io.sockets.emit('update_player', players[i]);
// 	    	}
// 	    }
//         serverLoop();
//     }, time);
// }



/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Random position vector object
function vector(x, y) {
	this.x = x || Math.round(Math.random()*(w-cw)/cw);
	this.y = y || Math.round(Math.random()*(h-cw)/cw);
}


function addPointsByPlayerId(id) {
	var i;
	for (i = 0; i < playerPoints.length; i++) {
		if (playerPoints[i].id === id) {
			playerPoints[i].points += 1;
			return;
		}
	}
}


// Update player in players
function updatePlayerInPlayers(player) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i] === player.id) {
			(typeof player.p 		=== 'undefined') ? null : players[i].p 		= player.p;
			(typeof player.l 		=== 'undefined') ? null : players[i].l 		= player.l;
			(typeof player.d 		=== 'undefined') ? null : players[i].d 		= player.d;
			(typeof player.tail 	=== 'undefined') ? null : players[i].tail 	= player.tail;
			break;
		}
	};
}


// Add player to players
function addPlayerToPlayers(player) {
	if (players.length >= 1) {
		var i;
		for (i = 0; i < players.length; i++) {
			if (players[i].id === player.id) {
				players.splice(i,1);
				break;
			}
		}
	}
	players.push(player);
};


// Reset player points
function resetPlayerPointsById(id) {
	if (playerPoints.length >= 1) {
		var i;
		for (i = 0; i < playerPoints.length; i++) {
			if (playerPoints[i].id === id) {
				playerPoints.splice(i, 1);
				break;
			}
		}
	}
	playerPoints.push({id: id, points: 0});	
}


// Remove player by id
function removePlayerById(id) {
	var i;
	// Remove from players
	for (i = 0; i < players.length; i++) {
		if (players[i].id === id) {
			players.splice(i,1); 
			break;
		}
	};
	// Remove points
	for (i = 0; i < playerPoints.length; i++) {
		if (playerPoints[i].id === id) {
			playerPoints.splice(i,1);
			break;
		}
	};
	io.sockets.emit('new_players', players);
	io.sockets.emit('game_points', playerPoints);
}


// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id === id) {
			return players[i];
		}
	};
	
	return false;
}

init();