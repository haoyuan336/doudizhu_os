import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        global.socket.notifyGameSceneLoadEnd();
        global.socket.onSycnData((data)=>{
            console.log('同步数据' + JSON.stringify(data));
            let seatIndex = data.seatIndex;
        });
    },

    start () {

    }
});
