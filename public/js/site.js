var socket;
var server_address = 'ws://127.0.0.1:8197';

(function() {
	'use strict';

	function connect() {
		setTimeout(function() {
			// Try to connect to server
			try {
				socket = io(server_address);
				$('#start-button').toggleClass('success');
			}
			// Animate error message
			catch (e) {
				$('#start-button').toggleClass('fail').text('error');
				$('#connect-info').animate({
					height: 80,
					opacity: 1,
				  }, 500, function() {
				    // Animation complete.
				  });
			}
			// Hide loader
			finally {
				$('#start-button i').hide();
			}
		}, 3000);
	}

	// Start game
	$('#start-button').click(function() {
		if (socket) {
			// Hide report section
			$('#presentation').hide()
			$("#intro-cover").fadeOut( "slow", function() {
				Game.init(socket);
				// Show game stats and messages
				$('#bottom').show()
			});
		}
	});
	connect();

})( jQuery );