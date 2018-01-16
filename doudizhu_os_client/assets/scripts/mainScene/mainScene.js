import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        tipsLabel: {
            default: null,
            type: cc.Node
        },
        joinRoomPrefab: {
            default: null,
            type: cc.Prefab
        }
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
            case 'joinButton':
                let node = cc.instantiate(this.joinRoomPrefab);
                node.parent = this.node;
                break;
            default:
                break;
        }
    },
    update(dt){
        this.tipsLabel.position = cc.p(this.tipsLabel.position.x - 1,this.tipsLabel.position.y);
        if (this.tipsLabel.position.x < -700){
            this.tipsLabel.position = cc.p(700, this.tipsLabel.position.y);
        }
    }
});
