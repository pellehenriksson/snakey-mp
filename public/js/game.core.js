// Set position as vector-object
function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
};

/**
 * Snake, the game.
 */
window.Game = (function() {

	var localFood, localPlayer, remotePlayers = [], playerPoints = [], playerColors = [];
	var ctx, w, h, cw;
	var fps;

	var gameInit = false;

	function init(io) {
		socket 	= io;
		canvas  = document.getElementById("canvas");
		ctx     = canvas.getContext("2d");
		w       = canvas.width; // Canvas width
		h       = canvas.height; // Canvas height
		cw      = 10; // Cell width
		fps 	= 20; 
		
		setEventHandlers();
	};



	/**************************************************
	** GAME CLIENT EVENT HANDLERS
	**************************************************/
	var setEventHandlers = function() {
		onSocketConnected();
		socket.on( 'disconnect', onSocketDisconnect );
		socket.on( 'new_players', onNewPlayers );
		socket.on( 'new_player', onNewPlayer );
		socket.on( 'update_player', onUpdatePlayer );
		socket.on( 'new_food', onNewFood );
		socket.on( 'game_points', onGamePoints );
	};


	// Player connected to server
	function onSocketConnected() {
		logger('mess', 'Connected to server');
		// Get player info from server
		socket.emit('new_player');
	};


	function onSocketDisconnect() {
		logger('mess', 'Server disconnected');
	};


	// Receive list of connected players
	function onNewPlayers(players) {
		var i;
		for (i = 0; i < players.length; i++) {
			if (players[i].id === localPlayer.id) { continue; } // Ignore localPlayer
			// Add player color
			colorByPlayerId(players[i].id) ? null : playerColors.push({id: players[i].id, color: players[i].color});
			addPlayerToPlayers(players[i]);
			addPlayerToPlayerPoints(players[i]);
		}
		logger('mess', 'Updating connected player');
	};

	// New player joined
	function onNewPlayer(player) {
		// Set color to new player
		colorByPlayerId(player.id) ? null : playerColors.push({id: player.id, color: player.color});
		// If player is local
		if (player.id === socket.id) {
			localPlayer = new Snake(player.id, player.p);
			if (!gameInit) {
				logger('mess', 'Starting Game');
				gameInit = true;
				gameLoop(); // Start loop
				logger('mess', 'You got ID: ' + player.id);
			}
		} else {
			addPlayerToPlayers(player);
		}
	};


	// Update player information
	function onUpdatePlayer(player) {
		// Update player changes except local player
		if (remotePlayers.length >= 1 && player.id !== localPlayer.id) {
			updatePlayerInPlayers(player);
		}
	};


	// Food got new position
	function onNewFood(food) {
		localFood = new Food(food.p);
		logger('mess', 'Food was taken!');
	};


	// Receive gamepoints from server
	function onGamePoints(data) {
		// Updates playerPoints from server
		playerPoints = data;
		playerPoints.sort(function(obj1, obj2) {
			return  obj2.points-obj1.points;
		});

		var ul = $('#player-stats');
		ul.empty();
		var i;
		for(i = 0; i < playerPoints.length; i++) {
			ul.append('<tr><td id="color" style="background-color: ' + colorByPlayerId(playerPoints[i].id) + ';"></td><td>' + playerPoints[i].points + '</td></tr>');

		}
	};


	/**************************************************
	** GAME CLIENT SENDERS
	**************************************************/
	// Tell server food was taken
	function gotFood() {
		var _player = {id: localPlayer.id, p: {x: localPlayer.tail[0].x, y: localPlayer.tail[0].y}, d: localPlayer.d, l: localPlayer.l, tail: localPlayer.tail};
		socket.emit('new_food', _player);
		logger('mess', 'You got the food!');
	};

	// Request a new player from server
	function initLocalPlayer() {
		socket.emit('new_player');
	}



	/**************************************************
	** GAME HELPER FUNCTIONS
	**************************************************/
	// Add player to remotePlayers[]
	function addPlayerToPlayers(player) {
		if (remotePlayers.length >= 1) {
			var i;
			for (i = 0; i < remotePlayers.length; i++) {
				if (remotePlayers[i].id === player.id) {
					remotePlayers.splice(i, 1);
					break;
				}
			}
		}
		remotePlayers.push(new Snake(player.id, player.p));
	};


	// Update player in remotePlayers[]
	function updatePlayerInPlayers(player) {
		var i;
		for (i = 0; i < remotePlayers.length; i++) {
			if (remotePlayers[i].id === player.id) {
				(typeof player.p 		=== 'undefined') ? null : remotePlayers[i].p 		= player.p; // Change startposition
				(typeof player.d 		=== 'undefined') ? null : remotePlayers[i].d 		= player.d; 
				(typeof player.l 		=== 'undefined') ? null : remotePlayers[i].l 		= player.l; 
				(typeof player.tail 	=== 'undefined') ? null : remotePlayers[i].tail 	= player.tail; 
				return;
			}
		}	
	};


	// Add player to playerPoints[]
	function addPlayerToPlayerPoints(player) {
		if (playerPoints.length >= 1) {
			var i;
			for (i = 0; i < playerPoints.length; i++) {
				if (playerPoints[i].id === player.id) {
					playerPoints.splice(i, 1);
					break;
				}
			}
		}
		playerPoints.push({id: player.id, points: 0});
	};


	// Update player points
	function updatePlayerPoints(player) {
		if (playerPoints.length >= 1) {
			var i;
			for (i = 0; i < players.length; i++) {
				if (playerPoints[i].id === player.id) {
					playerPoints[i].points = player.points;
					return;
				}
			}
		}
	};

	// Get color by player id
	function colorByPlayerId(id) {
		var i;
		for (i = 0; i < playerColors.length; i++) {
			if (playerColors[i].id === id) {
				return playerColors[i].color;
			}
		};
		
		return false;
	}


	// Send messages to player
	function logger(type, message) {
		//var now = Date.now();
		var date = new Date();
		$('#output').append('<p class="' + type + '"><span class="time-stamp">[' + date.getTime() + '] : </span>' + message + '</p><br>');
	}



	/**************************************************
	** GAME UPDATE
	**************************************************/
	var update = function() {
		var pressedKey = localPlayer.update();
		if (pressedKey) {
			_player = {id: localPlayer.id, d: pressedKey};
			// Send player movement to server
			socket.emit('update_player', _player);
		}
	};


	/**************************************************
	** GAME RENDER
	**************************************************/
	var render = function() {
		// Canvas
		ctx.fillStyle = "#e6e6e6";
		ctx.fillRect(0,0, w, h);

		// Food
		localFood.draw(ctx, cw);
		
		// Draw players
		localPlayer.draw(ctx, cw, colorByPlayerId(localPlayer.id)); // Paint snake
		var i;
		for (i = 0; i < remotePlayers.length; i++) {
			remotePlayers[i].draw(ctx, cw, colorByPlayerId(remotePlayers[i].id));
		}

		// Move players
		localPlayer.move();
		for (i = 0; i < remotePlayers.length; i++) {
			remotePlayers[i].move();
		}

		// Check collision
		// Check if wall collision
		var x = localPlayer.tail[0].x, y = localPlayer.tail[0].y;
		if (x <= -1 || y <= -1 || x >= w/cw || y >= h/cw) {
			initLocalPlayer();
		}

		// Check tail collison
		for (i = 1; i < localPlayer.tail.length; i++) {
			if (localPlayer.tail[i].x === x && localPlayer.tail[i].y === y) {
				initLocalPlayer();
			}
		}
	

		// Check next cell for localPlayer
		var rump;
		if (x === localFood.p.x && y === localFood.p.y) {
			gotFood();
			rump = new Vector(x,y);
	 	} else { 
		    rump = localPlayer.tail.pop();
		    rump.x = x; rump.y = y;
		}
		// Put back rump to tail
		localPlayer.tail.unshift(rump);

		// Check next cell for remotePlayers
		for (i = 0; i < remotePlayers.length; i++) {
			var x = remotePlayers[i].tail[0].x, y = remotePlayers[i].tail[0].y;
			var rump;
			if (x === localFood.p.x && y === localFood.p.y) {
				rump = new Vector(x,y);
		 	} else {
			    rump = remotePlayers[i].tail.pop();
			    rump.x = x; rump.y = y;
			}
			// Put back rump to tail
			remotePlayers[i].tail.unshift(rump);
		}
	};


	/**************************************************
	** GAME LOOP
	**************************************************/
	var gameLoop = function() {
	    setTimeout(function() {
	        requestAnimationFrame(gameLoop);
		    update();
			render();
	    }, 1000 / fps);
	};



	return {
		'init' : init,
	};
})();
