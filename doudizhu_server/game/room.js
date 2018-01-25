const roomConfig = require("./../create-room-config.json");
console.log('room config = ' + JSON.stringify(roomConfig));
const Room = function (roomID, resp) {
    let that = {};
    let _roomID = roomID;
    let _playerList = [];
    console.log('create room' + _roomID + 'resp = ' + JSON.stringify(resp));
    let _turnCount = roomConfig.turn_count[resp.turnCount].turn_count;
    let _needHouseCardCount = roomConfig.turn_count[resp.turnCount].need_house_card_count;
    let _kingBombRate = roomConfig.special_rule[resp.specialRule].king_bomb;
    let _normalBombRate = roomConfig.special_rule[resp.specialRule].normal_bomb;




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
