var socket;
var server_address = 'http://127.0.0.1/';

(function() {
	'use strict';

	function connect() {
		setTimeout(function() {
			try { 
				socket = io(server_address);
				$('#start-button').toggleClass('success');
			}
			catch (e) {
				$('#start-button').toggleClass('fail').text('error');
				$('#connect-info').animate({
					height: 80,
					opacity: 1,
				  }, 500, function() {
				    // Animation complete.
				  });
			}
			finally {
				$('#start-button i').hide();
			}
		}, 3000);
	}

	
	$('#start-button').click(function() {

		if (socket) {

			$('#report').hide()
			$("#intro-cover").fadeOut( "slow", function() {
				Game.init(socket);
				$('#player-stats').show()
			});
		}
	});
	connect();

})( jQuery );