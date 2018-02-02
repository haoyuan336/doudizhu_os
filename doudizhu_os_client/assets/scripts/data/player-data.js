let PlayerData = function () {
    let that = {};
    that.uid = undefined;
    that.uniqueID = '100000';
    that.nickName = '小明' + Math.floor(Math.random() * 10);
    that.avatarUrl = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=373849174,2079142017&fm=27&gp=0.jpg';
    that.houseCardCount = 0;
    for (let i = 0 ; i < 7 ; i ++){
        that.uniqueID += Math.floor(Math.random() * 10);
    }
    that.wxLoingSuccess = function (data) {
        that.uniqueID = data.uniqueID;
        that.nickName = data.nickName;
        that.avatarUrl = data.avatarUrl;
    };
    that.loginSuccess = function (data) {
        console.log('data = ' + JSON.stringify(data));
        that.uid = data.uid;
        that.nickName = data.nickName;
        that.avatarUrl = data.avatarUrl;
        that.houseCardCount = data.houseCardCount
    };
    that.joinRoomSuccess = function (config,data) {
        console.log('room config = ' + JSON.stringify(config));
        console.log('data = ' + JSON.stringify(data));

        that.roomID = data.data.roomID;


        let turuCountConfig = config.turn_count[data.data.turnCount];
        that.totalTurnCount = turuCountConfig.turn_count;
        that.needHouseCardCount = turuCountConfig.need_house_card_count;
        let specialRuleConfig = config.special_rule[data.data.specialRule];
        that.normalBombRate = specialRuleConfig.normal_bomb;
        that.kingBombRate = specialRuleConfig.king_bomb;


    };
    return that;
};
export default PlayerData;