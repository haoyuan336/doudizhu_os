// import defines from './../defines'
import EventListener from './../utility/event-listener'
const SockerController = function () {
    let that = {};
    let _socket = undefined;
    let _callBackMap = {};
    let _callBackIndex = 1;
    let _event = EventListener({});

    that.init = function () {
        _socket = io(defines.serverUrl);
        _socket.on('notify', function (data) {
           console.log('notify = ' + JSON.stringify(data));
           let msg = data.msg;
           _event.fire(msg, data.data);
           let callBackIndex = data.callBackIndex;
           let cb = _callBackMap[callBackIndex];
           if (cb){
               console.log('回调');
               if (data.data.err){
                   cb(data.data.err);

               }else {
                   cb(null,data.data);

               }
           }
        });
    };



    const notify = function (msg,data) {
        console.log('callback index = ' + _callBackIndex);
        console.log('notify data = ' + JSON.stringify(data));
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


    that.joinRoom = function (roomID, cb) {
        request('join_room',{roomID: roomID},cb);
    };


    that.notifyGameSceneLoadEnd = function () {
        notify('gameSceneLoadEnd',{});
    };

    that.onInitPlayerInfo = function (cb) {
      //监听服务器发来的初始化用户信息 //包含 用户昵称，用户id 用户头像，房卡数量等
    };
    that.onSycnData = function (method) {
        _event.on('syncData', method);
    };

    return that;
};
export default SockerController;