import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad(){
        global.socket.init();
    },
    onButtonClick(event, customData){
        if (customData === 'wxlogin'){
            console.log('微信登陆');
            global.socket.login(
                global.tianba.playerData.uniqueID,
                global.tianba.playerData.nickName,
                global.tianba.playerData.avatarUrl, function (err,data) {
                    if (err){
                        console.log('login err' + err);
                    }else {
                        console.log('login data = ' + JSON.stringify(data));
                        global.tianba.playerData.loginSuccess(data);
                        cc.director.loadScene('mainScene');
                    }
                });
        }
    }


});
