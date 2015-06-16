<?php
  $d = explode("/", trim($path, "/"));
  $srcUrl = '../../source.php?dir=' . end($d) . '&amp;file=' . basename($_SERVER["PHP_SELF"]) . '#file';
?>

<footer id='footer'>
 
<nav>
  <a href='https://github.com/rarths/snakey-mp'>github</a>
  <a href='<?=$srcUrl?>'>source</a>
  <p>Robin Hansson</p>
</nav>
 
</footer>

</div> <!-- END #wrapper -->

<!-- INCLUDE JQUERY -->
<script src="js/lib/jquery.min.js"></script>

<!-- INCLUDE GAME JS -->
<script src="http://127.0.0.1:8197/socket.io/socket.io.js"></script>
<script src="js/site.js"></script>
<script src="js/Snake.js"></script>
<script src="js/Food.js"></script>
<script src="js/game.animframe.js"></script>
<script src="js/keys.js"></script>
<script src="js/game.core.js"></script>

</body>
</html>