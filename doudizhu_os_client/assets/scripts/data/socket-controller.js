import defines from './../defines'

const SockerController = function () {
    let that = {};
    let _socket = undefined;
    let _callBackMap = {};
    let _callBackIndex = 1;
    that.init = function () {
        _socket = io(defines.serverUrl);
        _socket.on('notify', function (data) {
           console.log('notify = ' + JSON.stringify(data));
           let callBackIndex = data.callBackIndex;
           let cb = _callBackMap[callBackIndex];
           if (cb){
               console.log('回调');
               cb(null,data.data);
           }
        });
    };



    const notify = function (msg,data) {
        console.log('callback index = ' + _callBackIndex);
        _socket.emit('notify', {msg: msg,callBackIndex: _callBackIndex, data: data});
        _callBackIndex ++;
    };
    const request = function (msg, data, cb) {
        console.log('call back inde  = ' + _callBackIndex);
        _callBackMap[_callBackIndex] = cb;
        notify(msg, data);
    };

    that.login = function (unique, nickname, avatar, cb) {
        request('login', {uniqueID: unique, nickName: nickname, avatarUrl: avatar}, cb);
    };
    that.createRoom = function (data, cb) {
        console.log('createRoom = ' + JSON.stringify(data));
        request('create_room', data, cb);
    };


    that.onInitPlayerInfo = function (cb) {
      //监听服务器发来的初始化用户信息 //包含 用户昵称，用户id 用户头像，房卡数量等

    };

    return that;
};
export default SockerController;