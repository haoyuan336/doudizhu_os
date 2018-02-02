const Room = require('./room');
let _roomList = [];
exports.createRoom = function (data, cb) {
    let roomID = '';
    for (let i = 0 ; i < 6 ; i ++){
        roomID += Math.floor(Math.random() * 10);
    }
    let room = Room(roomID, data);
    _roomList.push(room);
    if (cb){
        cb(null, roomID);
    }
};
exports.joinRoom = function (roomID, player, cb) {
    for (let i = 0 ; i < _roomList.length ; i ++){
        let room = _roomList[i];
        console.log('room id = ' + roomID);
        console.log('room id = ' + room.roomID);
        if (room.roomID == roomID){
            room.joinPlayer(player, cb);
            return;
        }
    }
    //
    if (cb){
        cb('no have this room');
    }
};