const socket = require('socket.io');
const app = socket('3000');

app.on('connection', function (socket) {
   console.log('a user connected');
   socket.emit('welcome', 'hello world!');
   socket.on("login", function (data) {
       console.log(' a user login = ' + JSON.stringify(data));
   })
});
console.log('listen on 3000');