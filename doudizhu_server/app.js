const socket = require('socket.io');
const config = require("./config.json");
const app = socket('3000');
const mydb = require('./utility/db');
const playerController = require('./game/player');
mydb.connect(config.mysqlConfig);
// mydb.checkPlayer("100000", function (err, cb) {
//
// });
// mydb.insertPlayerInfo({
//     unique_id: "100000",
//     uid: "1200000",
//     nick_name: "小明",
//     avatar_url: "baidu.com",
//     house_card_count: 5
// });
mydb.updatePlayerInfo('unique_id','100000',{
    nick_name: "小王",
    avatar_url: "腾讯.com"
});


app.on('connection', function (socket) {
    console.log('a user connected');
    socket.emit('welcome', 'hello world!');
    socket.on("notify", function (res) {
        console.log(' a user login = ' + JSON.stringify(res));
        let notifyData = res.data;
        let callbackIndex = res.callBackIndex;
        let msg = res.msg;
        switch (msg){
            case 'login':
                mydb.checkPlayer(notifyData.uniqueID, function (err, data) {
                    if (err) {
                        console.log('err = ' + err);
                    } else {
                        if (data.length === 0) {
                            //不存在这个玩家
                            console.log("不存在这个玩家");

                            let uid = '1';
                            for (let i = 0; i < 7; i++) {
                                uid += Math.floor(Math.random() * 10);
                            }
                            mydb.insertPlayerInfo({
                                unique_id: notifyData.uniqueID,
                                uid: uid,
                                nick_name: notifyData.nickName,
                                avatar_url: notifyData.avatarUrl,
                                house_card_count: 5
                            });
                            playerController.createPlayer(socket, {
                                uid: uid,
                                nickName: notifyData.nickName,
                                avatarUrl: notifyData.avatarUrl,
                                houseCardCount: 5,
                                callBackIndex: callbackIndex
                            });
                        } else {
                            //存在这个玩家
                            mydb.updatePlayerInfo('unique_id',notifyData.uniqueID, {
                                nick_name: notifyData.nickName,
                                avatar_url: notifyData.avatarUrl
                            });
                            playerController.createPlayer(socket, {
                                uid: data[0].uid,
                                nickName: notifyData.nickName,
                                avatarUrl: notifyData.avatarUrl,
                                houseCardCount: data[0].house_card_count,
                                callBackIndex: callbackIndex
                            })

                        }



                    }
                })

                break;
            default:
                break;
        }



    })
});
console.log('listen on 3000');