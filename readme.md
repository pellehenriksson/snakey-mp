Snakey MP
=========

Project in the course JavaScript at BTH



License
------------------

This software is free software and carries a MIT license.



Background
----------------------------------
Made this game as an assignment in the JavaScript course at BTH. The game is an copy of the old retro-game "Snake" Project is using Node.js and websockets through Socket.io to supply multiplayer actions.


Requirements
----------------------------------
Node.js


Install
----------------------------------
- In directory, install dependencies with npm
```js
npm install
```

- Start up the server (if event error is thrown, run with sudo)
```js
node game.server.js
```

- Open up public/index.php and Join game when button turns green


Extras
----------------------------------
You can change serveraddress by changing the server_address variable in public/js/site.js
```js
var server_address = 'http://127.0.0.1/';
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

v1.1 Project ready for deploy
