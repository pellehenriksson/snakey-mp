<?php $title='Template for testprogram'; include(__DIR__ . '/../base/header.php'); ?>

<header></header>
<div id="content">
	<canvas id='canvas' width='900px' height='400px'>

	  Your browser does not support the element HTML5 Canvas :(.

	</canvas>
	<div id="intro-cover">
		<div class="intro-text">
			<h1>SNAKEY MP<span class="version">v1.1</span></h1>
			<p>Made this game as an assignment in the JavaScript course at BTH. 
				The game is an copy of the old retro-game "Snake". 
				Project is using Node.js and websockets through Socket.io to supply multiplayer actions.</p>
		</div>
		<div class="intro-button">
			<button id="start-button" class="button">
				Join <i class="fa fa-refresh fa-spin"></i>
			</button>
			<div id="connect-info">
				<p>
					Connection to SnakeCave failed! Snakey is at the moment multiplayer only and needs a server to be playable. Visit the github page to run your own SnakeCave.
				</p>
			</div>
		</div>
	</div>

	<table id="player-stats">
	</table>
</div>

<?php $path=__DIR__; include(__DIR__ . '/../base/footer.php'); ?>