import defines from './../defines'
const SockerController = function () {
    let that = {};
    let _socket = undefined;
    that.init = function () {
        _socket = io(defines.serverUrl);
    };
    that.login = function (unique ,nickname, avatar, cb) {
        _socket.emit('login', {
            uniqueID: unique,
            nickName: nickname,
            avatarUrl: avatar
        });
    };

    return that;
};
export default SockerController;