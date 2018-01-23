
import global from "../../global";

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad(){

    },
    onButtonClick(event ,customData){
        switch (customData){
            case 'close':
                this.node.destroy();
                break;
            case 'create':
                console.log('create');
                // cc.director.loadScene('gameScene');
                global.socket.createRoom('create room',function (err,data) {
                    if (err){
                        console.log('err = ' + err);
                    }else {
                        console.log('create room data  =' + JSON.stringify(data));
                        cc.director.loadScene('gameScene');

                    }
                });

                break;
            default:
                break;
        }
    }

});
