const Player = function (socket, data) {
    let that = {};
    let _socket = socket;
    let _uid = data.uid;
    let _nickName = data.nickName;
    let _avatarUrl = data.avatarUrl;
    let _houseCardCount = data.houseCardCount;
    // let _callBackIndex = data.callBackIndex;
    const notify = function (msg, index, data,) {
        _socket.emit('notify', {msg: msg,callBackIndex: index, data: data});
    };
    // _socket.emit('notify', {msg: 'login', callBackIndex: _callBackIndex, data: {
    //     uid: _uid,
    //     nickName: _nickName,
    //     avatarUrl: _avatarUrl,
    //     houseCardCount : _houseCardCount
    // }});


    notify('login', data.callBackIndex,  {
            uid: _uid,
            nickName: _nickName,
            avatarUrl: _avatarUrl,
            houseCardCount : _houseCardCount
        });
    _socket.on('notify', function (res) {
       let msg = res.msg;
       let callBackIndex = res.callBackIndex;
       let data = res.data;
       console.log('data = ' + JSON.stringify(data));
       switch (msg){
           case 'create_room':
               console.log('创建房间');
               notify('create_room', callBackIndex, 'create room success');

               break;
           default:
               break;
       }
    });


    return that;
};
let _playerList = [];
exports.createPlayer = function (socket, data) {
    console.log('create player = ' + JSON.stringify(data));
    let player = Player(socket, data);
    _playerList.push(player);
};