const Room = function (roomID, resp) {
    let that = {};
    let _roomID = roomID;

    let _playerList = [];
    console.log('create room' + _roomID + 'resp = ' + JSON.stringify(resp));
    that.joinPlayer = function (player, cb) {
        console.log('room join player');
        if (cb){
            cb(null, resp);
        }
        _playerList.push(player);
    };

    Object.defineProperty(that, 'roomID', {
        get: function () {
            return _roomID
        }
    });

    return that;
};
module.exports = Room;
