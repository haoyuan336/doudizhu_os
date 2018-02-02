
import global from "../../global";

cc.Class({
    extends: cc.Component,

    properties: {
        labelList: {
            default: [],
            type: cc.Label
        },
        tipsLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.roomIdString = '';
    },
    onButtonClick: function (event, customData) {
        console.log('custom data = ' + customData);
        if(customData === 'close'){
            this.node.destroy();
        }else if (customData === 'clear'){
            this.roomIdString = '';
        }else if(customData === 'back'){
            // this.roomIdString.splice(this.roomIdString.length - 1, 1);
            this.roomIdString = this.roomIdString.substring(0, this.roomIdString.length - 1);
        }else {
            // this.roomIdString += customData;
            // if (){}
            let str = '';
            str = this.roomIdString;
            str += customData;
            console.log('str = ' + str);
            if (str.length > 6){
                str = str.substring(0, str.length - 1);
            }
            this.roomIdString = str;
            if (this.roomIdString.length === 6){
                console.log('加入房间的操作');
                global.socket.joinRoom(this.roomIdString,  (err, resp)=> {
                    // console.log('resp = ' + JSON.stringify(resp));



                    if (err){
                        console.log('err = ' + err);
                        this.tipsLabel.node.opacity = 255;
                        this.tipsLabel.string = err;
                        this.roomIdString = '';
                        this.tipsLabel.node.runAction(cc.fadeOut(2));

                    }else {
                        global.tianba.playerData.joinRoomSuccess(global.tianba.resourcesManager.resources[defines.gameConfig.createRoomConfig], resp);
                        cc.director.loadScene('gameScene');
                    }

                })
            }
        }

    }
    ,
    update(dt){
        for (let i = 0 ; i < this.labelList.length ; i ++){
            this.labelList[i].string = '';
        }
        for (let i = 0 ;i < this.roomIdString.length ; i ++){
            this.labelList[i].string = this.roomIdString[i];
        }
    }

});
