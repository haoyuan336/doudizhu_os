import global from './../global'
cc.Class({
    extends: cc.Component,

    properties: {
        roomIDLabel: {
            default: null,
            type: cc.Label
        },
        turnCountLabel: {
            default: null,
            type: cc.Label
        },
        houseCardCountLabel: {
            default: null,
            type: cc.Label
        },
        normalBombRateLabel: {
            default: null,
            type: cc.Label
        },
        kingBombRateLabel: {
            default: null,
            type: cc.Label
        }
    },
    onLoad: function () {
        this.roomIDLabel.string = "房间ID:" + global.tianba.playerData.roomID;
        this.turnCountLabel.string = "总局数:" +global.tianba.playerData.totalTurnCount;
        this.houseCardCountLabel.string = "消耗房卡:" + global.tianba.playerData.needHouseCardCount;
        this.normalBombRateLabel.string = "炸弹:" + global.tianba.playerData.normalBombRate;
        this.kingBombRateLabel.string = "王炸:" + global.tianba.playerData.kingBombRate;

    },
    onButtonClick(event, customData){
        switch (customData){
            case 'wx-yaoqing':
                console.log('微信邀请');
                break;
            case 'jiesan':
                console.log('解散');
                break;
            case 'chat':
                console.log('聊天');
                break;
            default:
                break;
        }
    }


});
