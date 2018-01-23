let PlayerData = function () {
    let that = {};
    that.uid = undefined;
    that.uniqueID = '100000';
    that.nickName = '小明' + Math.floor(Math.random() * 10);
    that.avatarUrl = 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=373849174,2079142017&fm=27&gp=0.jpg';
    that.houseCardCount = 0;
    // for (let i = 0 ; i < 7 ; i ++){
    //     that.uniqueID += Math.floor(Math.random() * 10);
    // }
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
    return that;
};
export default PlayerData;