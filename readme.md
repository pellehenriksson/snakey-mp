Snakey MP
=========

Project in the course JavaScript at BTH



License
------------------

This software is free software and carries a MIT license.



Background
----------------------------------
Made this game as an assignment in the JavaScript course at BTH. The game is an copy of the old retro-game "Snake" Project is using Node.js and websockets through Socket.io to supply multiplayer actions. You can test it  
[here](project http://www.student.bth.se/~roha15/javascript/project/public/index.php)

Requirements
----------------------------------
Node.js


Install
----------------------------------
- In directory, install dependencies with npm
```js
npm install
```

- Start the server. If event error is thrown, run with sudo or change to a higher port number.
```js
node game.server.js
```

- Open up public/index.php or go to localhost:8197 and Join game when button turns green


Extras
----------------------------------
Game is set to run localy as default.

/base/footer.php
```js
<script src="http://localhost:8197/socket.io/socket.io.js"></script>
```

/public/js/site.js
```js
var server_address = 'ws://127.0.0.1:8197';
```


License
----------------------------------

This software is free software and carries a MIT license.



Todo
----------------------------------

* Separate the client from the game.core

* Possible to play local if server is unavailable

* Move more logic to server

* Implement better synchcronisation server side

* More settings and foods!




History
----------------------------------
 - Fixed a bug that makes players respawn when localplayer dies

v1.1 Project ready for deploy
