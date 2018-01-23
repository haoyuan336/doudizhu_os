import global from './../global'

cc.Class({
    extends: cc.Component,

    properties: {
        nickNameLabel: {
            default: null,
            type: cc.Label
        },
        idLabel: {
            default: null,
            type: cc.Label
        },
        headImage: {
            default: null,
            type: cc.Sprite
        },
        houseCardCountLabel:{
            default: null,
            type: cc.Label
        },
        tipsLabel: {
            default: null,
            type: cc.Node
        },
        joinRoomPrefab: {
            default: null,
            type: cc.Prefab
        },
        createRoomPrefab: {
            default: null,
            type: cc.Prefab
        }
    },
    onLoad: function () {
        this.nickNameLabel.string = global.tianba.playerData.nickName;
        this.idLabel.string = global.tianba.playerData.uid;
        this.houseCardCountLabel.string = global.tianba.playerData.houseCardCount;

        cc.loader.load(global.tianba.playerData.avatarUrl, (err, tex) => {
            if (err) {
                console.log('err = ' + err);
            }
            cc.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
            let oldWidth = this.headImage.node.width;
            let oldHeight = this.headImage.node.height;
            this.headImage.spriteFrame = new cc.SpriteFrame(tex);
            this.headImage.node.scale = {
                x: oldWidth / this.headImage.node.width,
                y: oldHeight / this.headImage.node.height
            };

        });
    },
    buttonClick(event, customData) {
        console.log('custom data =  ' + customData);
        switch (customData) {
            case 'wxlogin':

                break;
            case 'joinButton':
                this.createPrefab(this.joinRoomPrefab);
                break;
            case 'createButton':
                this.createPrefab(this.createRoomPrefab);
                break;
            default:
                break;
        }
    },
    createPrefab(prefab) {
        let node = cc.instantiate(prefab);
        node.parent = this.node;
    },
    update(dt) {
        this.tipsLabel.position = cc.p(this.tipsLabel.position.x - 1, this.tipsLabel.position.y);
        if (this.tipsLabel.position.x < -700) {
            this.tipsLabel.position = cc.p(700, this.tipsLabel.position.y);
        }
    }
});
