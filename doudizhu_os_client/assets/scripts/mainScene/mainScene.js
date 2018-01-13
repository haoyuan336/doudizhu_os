import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad: function () {
        global.socket.init();
    },
    buttonClick(event , customData){
        console.log('custom data =  ' + customData);
        switch (customData){
            case 'wxlogin':
                global.socket.login(
                    global.tianba.playerData.uniqueID,
                    global.tianba.playerData.nickName,
                    global.tianba.playerData.avatarUrl, function (err,data) {
                        if (err){
                            console.log('login err' + err);
                        }else {
                            console.log('login data = ' + JSON.stringify(data));
                        }
                    });
                break;
            default:
                break;
        }
    }

});
