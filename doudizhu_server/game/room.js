const roomConfig = require("./../create-room-config.json");
console.log('room config = ' + JSON.stringify(roomConfig));
const Seat = function () {
    let that = {};
    that.getIndex = function (playerList) {
        let index = 0;
        for (let i = 0 ; i < playerList.length ; i ++){
            let player = playerList[i];
            if (player.seatIndex === index){
                index ++
            }else {
                return index;
            }
        }
        return index;
    };
    return that;
};


const Room = function (roomID, resp) {
    let that = {};
    let _roomID = roomID;
    let _playerList = [];
    let _seatController = Seat(that);
    console.log('create room' + _roomID + 'resp = ' + JSON.stringify(resp));
    let _turnCount = roomConfig.turn_count[resp.turnCount].turn_count;
    let _needHouseCardCount = roomConfig.turn_count[resp.turnCount].need_house_card_count;
    let _kingBombRate = roomConfig.special_rule[resp.specialRule].king_bomb;
    let _normalBombRate = roomConfig.special_rule[resp.specialRule].normal_bomb;
    let _houseManager = undefined;

    that.joinPlayer = function (player, cb) {
        console.log('room join player');
        resp.roomID = _roomID;
        if (cb) {
            cb(null, {resp: resp, room: that});
        }
        if (_playerList.length === 0) {
            _houseManager = player;
        }
        _playerList.push(player);

        let index = _seatController.getIndex(_playerList);
        console.log('get index = ' + index);
        player.seatIndex = index;
    };
    that.playerGameSceneLoadEnd = function (player,callBackIndex) {

        let playerData = [];
        for (let i = 0 ; i < _playerList.length ; i ++){
            playerData.push({
                nickName: _playerList[i].nickName,
                seatIndex: _playerList[i].seatIndex,
                avatarUrl: _playerList[i].avatarUrl
            });
        }

        player.sendSyncData({
            seatIndex: player.seatIndex,
            playerData: playerData
        }, callBackIndex);
    };

    that.playerOffLine = function (player) {
        for (let i = 0 ; i < _playerList.length ; i ++){
            if (_playerList[i].uid === player.uid){
                _playerList.splice(i, 1);
            }
        }
    };
    Object.defineProperty(that, 'roomID', {
        get: function () {
            return _roomID
        }
    });
    Object.defineProperty(that, 'players', {
        get: function () {
            return _playerList;
        }
    });

    return that;
};
module.exports = Room;
