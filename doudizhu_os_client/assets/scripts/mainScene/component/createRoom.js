
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
                cc.director.loadScene('gameScene');
                break;
            default:
                break;
        }
    }

});
