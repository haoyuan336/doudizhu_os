
import global from "../../global";

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad(){
        this.turnCount = "turn_count_1";
        this.specialRule = "special_rule_1";
    },
    onButtonClick(event ,customData){
        switch (customData){
            case 'close':
                this.node.destroy();
                break;
            case 'create':
                console.log('create');
                // cc.director.loadScene('gameScene');
                global.socket.createRoom({
                    turnCount: this.turnCount,
                    specialRule: this.specialRule
                },function (err,data) {
                    if (err){
                        console.log('err = ' + err);
                    }else {
                        console.log('create room data  =' + JSON.stringify(data));
                        // cc.director.loadScene('gameScene');
                        global.socket.joinRoom(data.roomID, function (err, resp) {
                            // console.log('resp = ' + JSON.stringify(resp));
                            global.tianba.playerData.joinRoomSuccess(global.tianba.resourcesManager.resources[defines.gameConfig.createRoomConfig], resp);
                            if (err){
                                console.log('err = ' + err);
                            }else {
                                cc.director.loadScene('gameScene');
                            }
                        })
                    }
                });
                this.node.destroy();

                break;
            default:
                break;
        }


        console.log('custon data' + customData.indexOf('turn_count'));
        if (customData.indexOf('turn_count') === 0){
            this.turnCount = customData;
        }
        if (customData.indexOf('special_rule') === 0){
            this.specialRule = customData;
        }
    }

});
