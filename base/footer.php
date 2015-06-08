<?php
  $d = explode("/", trim($path, "/"));
  $srcUrl = '../../source.php?dir=' . end($d) . '&amp;file=' . basename($_SERVER["PHP_SELF"]) . '#file';
?>

<footer id='footer'>
 
<nav>
  <a href='https://github.com/rarths/snakey-mp'>gist</a>
  <a href='<?=$srcUrl?>'>source</a>
  <p>Robin Hansson</p>
</nav>
 
</footer>

<div id="report">
	<h1>Om Projektet</h1>
	<h3>k1:&nbsp;</h3>

	<p>Spelet jag skapade är en copy av det gamla retro-spelet Snake. Spelets utformning är väldigt simpelt och presentationen blev av samma slag. Syftet med spelet är att implementera stöd för att kunna spela flera spelare. Kommunicationen för skicka och ta emot data görs via websockets. Till detta använde jag ramverket socket.io för att enklare kunna kategorisera komunikationen samt ha utnyttja alla fallbacks som Socket.io erbjuder. Gränsnittet är enkelt och för att skapa en bättre känsla av presentationen används en kombination CSS3 och jQuery för att animera händelser. Anslutningen till servern sker automatiskt likt lobby. Användaren blir meddelad om anslutningen till servern gick bra och har då möjlighet att ansluta sig till spelet. Servern erbjuder endast ett rum och möjligheten att ansluta sig ett spelet är tillgängligt för alla länge servern är aktiv. Om en spelare kommer utanför ramen ompositionerar servern spelare på en ny slumpmässig position. På så sätt stannar aldrig spelet.</p>

	<p>&nbsp;</p>

	<h3 id="k2">k2:&nbsp;</h3>

	<p>Då jag gjorde analysen av tillgängliga konkurrenter så var jag förberedd på att det redan skulle finnas ett antal varianter av snakespelet.</p>

	<p>De varianter av snake som finns tillgängliga är allt från den klassiska grid-baserade till mer avanverade 3D varianter. Det finns även en hel del snake-spinoffs där man utvecklat snake-konceptet en aning. Då jag tänkt att min variant ska ha stöd för flera spelare kunde nu ett antal tillgängliga varianter sollas bort. De tillgänliga snakespelen med flerspelsstöd var inte många och de flesta av dem fungerade inte. Så syftet bakom projektet blir inte att skapa något unikt utan fokusera mer på att självt få en bättre förståelse för hur hanterar data i realtid. Men för att ändå kunna konkurrera med de varianter jag stött på sammanfattas min snakevariant som följande:</p>

	<p>&nbsp;</p>

	<p>- Stöd för obegränsat antal spelare (i teorin)</p>

	<p>- Ingen spinoff utan ren retro-grid-style</p>

	<p>- Simpelt gränsnitt</p>

	<p>- Byggt på moderna tekniker</p>

	<p>- Strukturera med baktanke inom spelteknik</p>

	<p>&nbsp;</p>

	<h3 id="k3">k3:&nbsp;</h3>

	<p>Då logiken för att kunna förflytta ormen skapades i uppg 6 hade jag något att utgå ifrån. Resterande moment blev då att integrera spelet till att agera server och klient. Då spelet kommer behöva hantera data i realtid måste server och klient implementationen struktureras på ett sätt som gör att spelet flyter så synkroniserat som möjligt mellan alla spelare. För att uppnå detta så kör varje klient en egen version av spelet och låter servern hantera data om spelares positioner, poäng, vart och vem som lyckades plocka markören. Servern gör även regulbundna kontroller av att varje spelare har rätt positioner, så kallat Position Correction.</p>

	<p>&nbsp;</p>

	<h3 id="k3">k+</h3>

	<p>Projektet var rätt tidskrävande då det tog tid att komma fram till en bra struktur mellan spelets kärna, servern och klienten. Det har varit väldigt intressant och lärningsrikt att jobba inom spel samt att ta det till en nivå med flerspelsläge över internet. Överlag så har projektet gått bra och jag är nöjd med resultatet men hade gärna utvecklat det om det funnits tid. Dock så kommer jag fortsätta utveckla spelet när jag har tid!</p>

	<p>&nbsp;</p>

	<p>&nbsp;</p>

	<p>Hade det funnits mer tid hade jag utveklat mitt spel med följande:</p>

	<p>- Bryta loss klienten från spelkärnan o låta klienten hantera spelkärnan mer som en API</p>

	<p>- Möjlighet att kunna spela utan att vara ansluten till en server</p>

	<p>- Flytta mer logik till servern istället för att köra allt hos klienten.</p>

	<p>- Införa så servern bestämmer tiden för varje FPS. På så sätt kan servern synkronisera individuellt för varje klient och hantera timingen via Delta Time.</p>

	<p>- Införa möjlighet att göra inställningar samt utöka med fler foods! &nbsp;</p>

	<p>&nbsp;</p>

	<p>&nbsp;</p>

	<p>Jag håller med om påståendet att JavaScript är världens mest missförstådda språk. Jag hade väl som så många andra tankarna att det enda man använder JS till är att manipulera DOM men så fel jag hade.&nbsp;</p>

	<p>Kursen tar upp många bra delar och informationen känns genomtänkt och färsk. De första uppgifterna som handlade om grunderna i JS kände jag var något överflödiga. Då denna kursen förutsätter att man läst ett tidigare programmeringsspråk så borde inte t ex datatyper vara något nytt? Jag hade hellre sett EN mer omfattande uppgift som innehåller lösningar där man måste hålla ha koll på datatyperna tex.</p>

	<p>Överlag så var kursen bra. Kommer inte på något ni borde förändra så fortsätt som ni gör :)</p>

	<p>&nbsp;</p>

	<p><a href="http://www.student.bth.se/~roha15/javascript/project/public/index.html" target="_blank">http://www.student.bth.se/~roha15/javascript/project/public/index.html</a></p>

</div>

</div> <!-- END #wrapper -->

<!-- INCLUDE JQUERY -->
<script src="../../bower_components/jquery/dist/jquery.js"></script>

<!-- INCLUDE CONCATENATED JS -->
<script src="js/lib/jquery.min.js"></script>
<script src="http://192.168.1.143:80/socket.io/socket.io.js"></script>
<script src="js/Snake.js"></script>
<script src="js/site.js"></script>
<script src="js/Food.js"></script>
<script src="js/game.animframe.js"></script>
<script src="js/keys.js"></script>
<script src="js/game.core.js"></script>

</body>
</html>