const gameController = require('./game-controller');
const defines = require('./../defines');
console.log('defines = ' + JSON.stringify(defines));
const Player = function (socket, data) {
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;
    let _room = undefined;
    let _seatIndex = 0;
    // let _callBackIndex = data.callBackIndex;
    const notify = function (msg, index, data,) {
        _socket.emit('notify', {msg: msg, callBackIndex: index, data: data});
    };

    _socket.on('disconnect', function () {
       console.log('玩家掉线');
       if (_room){
           _room.playerOffLine(that);
       }

    });

    notify('login', data.callBackIndex, {
        uid: _uid,
        nickName: _nickName,
        avatarUrl: _avatarUrl,
        houseCardCount: _houseCardCount
    });
    _socket.on('notify', function (res) {
        let msg = res.msg;
        let callBackIndex = res.callBackIndex;
        let data = res.data;
        console.log('data = ' + JSON.stringify(data));
        switch (msg) {
            case 'create_room':
                console.log('创建房间');
                // notify('create_room', callBackIndex, 'create room success');
                gameController.createRoom(data, function (err, resp) {
                    if (err) {
                        console.log('create room err = ' + err);
                    } else {
                        notify('create_room', callBackIndex, {roomID: resp});
                    }
                });

                break;
            case 'join_room':
                gameController.joinRoom(data.roomID, that, function (err, resp) {

                    console.log('join room ');

                    let roomInfo = {};
                    if (err){

                    }else {
                        roomInfo = resp.resp;
                        _room = resp.room;
                    }
                    notify('join_room', callBackIndex, {err: err, data: roomInfo});
                });
                break;
            case 'gameSceneLoadEnd':
                console.log('player gamescene load end');
                if (_room){
                    _room.playerGameSceneLoadEnd(that, callBackIndex);
                }

                break;
            default:
                break;
        }
    });

    that.sendSyncData = function (data, callBackIndex) {
        console.log('data = ' + JSON.stringify(data));
        notify('syncData',callBackIndex, data);
    };

    const setDefineProperty = function (property, type, value) {
          switch (type){
              case defines.get:
                  Object.defineProperty(that, property, {
                      get: function () {
                          return value;
                      }
                  });

                  break;
              case defines.set:
                  Object.defineProperty(that, property, {
                      set: function (val) {
                          value = val;
                      }
                  });
                  break;
              case defines.both:
                  break;

                  Object.defineProperty(that,property, {
                      get: function () {
                          return value;
                      },
                      set: function (val) {
                          value = val;
                      }
                  });

              default:
                  break;
          }
    };
    
    
    // Object.defineProperty(that,'seatIndex', {
    //     get: function () {
    //         return _seatIndex;
    //     },
    //     set: function (val) {
    //         _seatIndex = val;
    //     }
    // });
    // Object.defineProperty(that,'nickName', {
    //     get: function () {
    //         return _nickName;
    //     }
    // });
    // Object.defineProperty(that, 'avatarUrl', {
    //     get: function () {
    //         return _avatarUrl;
    //     }
    // });


    setDefineProperty('seatIndex',defines.both, _seatIndex);
    setDefineProperty('nickName', defines.get, _nickName);
    setDefineProperty('avatarUrl', defines.get, _avatarUrl);
    setDefineProperty('uid', defines.get, _uid);
    

    return that;
};
let _playerList = [];
exports.createPlayer = function (socket, data) {
    console.log('create player = ' + JSON.stringify(data));
    let player = Player(socket, data);
    _playerList.push(player);
};