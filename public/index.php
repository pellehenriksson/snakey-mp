<?php $title='Snakey MP'; include(__DIR__ . '/../base/header.php'); ?>

<header></header>
<div id="content">
	<canvas id='canvas' width='900px' height='400px'>

	  Your browser does not support the element HTML5 Canvas :(.

	</canvas>
	<div id="intro-cover">
		<div class="intro-text">
			<h1>SNAKEY MP<span class="version">v1.1</span></h1>
			<img src="img/gameplay.gif">
		</div>
		<div class="intro-button">
			<button id="start-button" class="button">
				Join <i class="fa fa-refresh fa-spin"></i>
			</button>
			<div id="connect-info">
				<p>
					Snakey MP servern går inte nå. Du kan klona och köra din egna version av Snakey MP <a href='https://github.com/rarths/snakey-mp'>här</a>.
				</p>
			</div>
		</div>
	</div>

	<div id="bottom">
		<table id="player-stats"></table>
		<output id="output"></output>	
	</div>

	<div id="presentation">
		<div id="intro">
			<h2>
				Snakey MP är en copy av det gamla klassiska spelet snake.
				Spelet är skapat med hjälp av HTML5 Canvas samt Node.js med websockets för att kunna erbjuda flerspelsläge.
			</h2>
			<figure>
				<img src="img/snake.png">
				<figcaption><p>Klassiskt gränsnitt, så som snake ska se ut.</p></figcaption>
			</figure>
			<figure>
				<img src="img/unlimited.png">
				<figcaption><p>Max antal spelare begränsas endast av webbläsaren!</p></figcaption>
			</figure>
			<figure>
				<img src="img/node.png">
				<figcaption><p>Byggt på moderna tekniker. Servern använder Node.js och socket.io för att kommunicera med dess klienter.</p></figcaption>
			</figure>
		</div>
		<div id="info">
			<figure>
				<figcaption>
					<h2>Kom Igång</h2>
					<p>Att komma igång är enkelt. Anslut till spelet genom att trycka på knappen högst upp när den ändrar om till grönt.
						Skulle knappen bli röd finns det inte någon tillgänglig servern att ansluta sig till. För tillfället kan Snake MP enbart spelas via flerspelsläget och behöver därför kunna ansluta till en server.</p>
						<p>Snake MP går ut på att plocka så många "foods" som möjligt (den röda markeringen). Skulle du gå på kanten eller din egen svans nollställs poängen och din orm placeras om.</p>
						<p>Ormen styr du med antingen piltangenterna eller med W,A,S,D tangenterna.</p>
						<p>Lycka till!</p>
				</figcaption>
			</figure>
			<figure>
				<figcaption>
					<h2>Hur Fungerar det?</h2>
					<p>Varje klient renderar sin egen version av alla anslutna klienter och servern ser till så nya spelare läggs till varje ansluten klient. När klienten ansluter till spelet, ändrar riktning, dör eller plockar "food" så berättar den detta för servern som skickar informationen vidare till de övriga klienterna.</p>
					<p>På så sätt behöver inte servern uppdatera klienterna kontinuerligt och medför mer energi för servern samt lägre användningen av bandredd.</p>
				</figcaption>
			</figure>
		</div>
		<div id="last">
			<h2>Några Konkurrenter</h2>
			<figure>
				<h2><a href="http://snake.negetics.de">snake.negetics.de</a></h2>
				<figcaption><p>Detta är Snakey MP's största konkurrent då det flyter på synkroniserat och har ett klassiskt gränsnitt. Jämt emot Snakey MP så har Snakey MP sin källkod öppen och spelets server kan köras av vem som helst.</p></figcaption>
			</figure>
			<figure>
				<h2><a href="http://curvefever.com">Curve Fever</a></h2>
				<figcaption><p>Detta är en annan variant av snake där ormens svans ritas konstant. Spelet verkar populärt då det finns en del spelare tillgängliga. Dock så tar det en stund att komma igång med ett spel samt att spelet är annonsfinansierat. </p></figcaption>
			</figure>
			<figure>
				<h2><a href="http://www.wordgames.com/tron-snake-multiplayer.html"> Tron Snake Multiplayer</a></h2>
				<figcaption><p>Ormen i detta snake är utbytt till ett fordon ur filmen Tron. Spelet kan enbart spelas som flerspelsläge lokalt och inte över internet. </p></figcaption>
			</figure>
		</div>

		<div id="snakey">
			<h2>Varför Snakey MP?</h2>
			<p>Snakey MP är simpelt och det går snabbt att komma igång. Källkoden finns tillgänglig via <a href='https://github.com/rarths/snakey-mp'>github</a> för nerladdning och fri användning.
				Hur du intallerar din egna version av Snakey MP hittar du i repositoryn.</p>
			<p>Snakey MP är fri från annonsering och det krävs ingen registrering för att kunna delta. Spelet agerar i realtid med viss avikelse från att spelare ibland positioneras osynkroniserat. Snakey MP's styrka är att du på ett enda klick får tillsammans med dina vänner njuta av nostalgin från retrospelet snake!
			</p>
		</div>
	</div>
</div>

<?php $path=__DIR__; include(__DIR__ . '/../base/footer.php'); ?>