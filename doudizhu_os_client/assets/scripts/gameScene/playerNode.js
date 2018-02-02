cc.Class({
    extends: cc.Component,

    properties: {
        headImage: {
            default: null,
            type: cc.Sprite
        },
        offLineIcon: {
            default: null,
            type: cc.Node
        },
        readyIcon: {
            default: null,
            type: cc.Node
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        },
        nickNameLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },
    initWithData(data){
        //头像， 昵称 分数 是不是地主

    }
});
